#!/usr/bin/env python3
"""build_site.py 1.0.0 — Cedwyn webapp migration programme: builds the static status site, /api/index.json, the
catalogue-db static export and every pilot webapp that follows the standard (schema cedwyn-webapp/1.0.0).
Runs as the Pages build of project cedwyn-migration (branch `migration`, output dist/), stdlib only.
Reads (all static, no Worker): this branch's manifests; the central catalogue mirror (branch catalogue-db, raw GitHub);
each pilot's source from its own branch webapp/<id> (slice.py + index.html); the tour order /areas.json from the static
cedwyn Pages project. It never writes a catalogue record.
Local test: LOCAL_APPS=<dir with <id>/slice.py> LOCAL_CATALOGUE=<dir with index.json> python3 migration/tools/build_site.py"""
import json, os, sys, glob, hashlib, shutil, time, datetime, urllib.request, html
from xml.sax.saxutils import escape as xesc
HERE = os.path.dirname(os.path.abspath(__file__)); MIG = os.path.dirname(HERE)
OUT = os.environ.get('OUT', os.path.join(os.path.dirname(MIG), 'dist'))
RAW = 'https://raw.githubusercontent.com/unclehowell/cedwyn/'
CAT_REF = os.environ.get('CATALOGUE_REF', 'catalogue-db')
NAV_URL = os.environ.get('NAV_URL', 'https://cedwyn-274.pages.dev/areas.json')
SITE = os.environ.get('SITE_URL', 'https://cedwyn-migration.pages.dev')
NOW = datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0)
ISO = NOW.isoformat().replace('+00:00', 'Z')
def fetch(url, tries=4):
    for a in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'cedwyn-migration-build'}), timeout=60) as r:
                return r.read()
        except Exception as e:
            if a == tries - 1: raise
            time.sleep(2 * (a + 1))
def fetch_json(url): return json.loads(fetch(url).decode('utf-8'))
def w(path, data):
    p = os.path.join(OUT, path.lstrip('/')); os.makedirs(os.path.dirname(p), exist_ok=True)
    if isinstance(data, (dict, list)): data = json.dumps(data, ensure_ascii=False, indent=None, separators=(',', ':'))
    open(p, 'wb').write(data.encode('utf-8') if isinstance(data, str) else data)
def rev_of(obj): return hashlib.sha256(json.dumps(obj, sort_keys=True, ensure_ascii=False).encode()).hexdigest()[:12]
# ---------- public-text scrub (editorial rules): applied to every string this site publishes
import re as _re
_REPL = [(r'\s*\bSion\b\s*', ' '), (r'\baccording to\b', 'as given in'), (r'\bsays\b', 'states'), (r'\bclaims\b', 'states'),
         (r'\bhearsay\b', 'second-hand account'), (r'\bunverified\b', 'not checked'), (r'\balleged\b', 'stated'),
         (r'\bfraud\b', 'wrongdoing'), (r'\bstolen\b', 'taken')]
def public_text(s):
    for a, b in _REPL: s = _re.sub(a, b, s, flags=_re.I)
    return _re.sub(r'  +', ' ', s).strip() if s.strip() != s or '  ' in s else s
def scrub(o):
    if isinstance(o, str): return public_text(o)
    if isinstance(o, list): return [scrub(x) for x in o]
    if isinstance(o, dict): return {k: scrub(v) for k, v in o.items()}
    return o
# ---------- inputs
manifests = [json.load(open(f)) for f in sorted(glob.glob(os.path.join(MIG, 'manifests', '*.json')))]
schema = json.load(open(os.path.join(MIG, 'schema', 'webapp.schema.json')))
tracker = json.load(open(os.path.join(MIG, 'migration.json')))
def load_catalogue():
    loc = os.environ.get('LOCAL_CATALOGUE')
    if loc:
        idx = json.load(open(os.path.join(loc, 'index.json'))); get = lambda f: json.load(open(os.path.join(loc, f)))
    else:
        idx = fetch_json(RAW + CAT_REF + '/index.json'); get = lambda f: fetch_json(RAW + CAT_REF + '/' + f)
    files = {}; recs = []
    for f in idx['files']:
        d = get(f['path']); files[f['path']] = d; recs += d.get('records', [])
    return idx, files, recs
cat_idx, cat_files, catalogue = load_catalogue()
cat_files = {p: scrub(d) for p, d in cat_files.items()}; catalogue = scrub(catalogue)
# ---------- catalogue-db static export (the client caches pull from here, never from a Worker)
for p, d in cat_files.items(): w('/catalogue-db/' + p, d)
w('/catalogue-db/index.json', dict(cat_idx, served_from=SITE + '/catalogue-db/', built_at=ISO))
uid_index = {r['id']: {'kind': r.get('kind'), 'title': r.get('title'), 'public': bool(r.get('public'))} for r in catalogue}
w('/catalogue-db/uids.json', {'schema': 'cedwyn-uid-index/1', 'count': len(uid_index), 'rev': rev_of(uid_index), 'generated_at': ISO, 'uids': uid_index})
# ---------- standard kit, nav, schema, manifests
for f in glob.glob(os.path.join(MIG, 'std', '*')): w('/_std/' + os.path.basename(f), open(f).read())
try: w('/areas.json', fetch(NAV_URL))
except Exception as e: print('nav fetch failed', e)
w('/schema/webapp.schema.json', schema)
for m in manifests: w('/manifests/%02d-%s.json' % (m['slot']['n'], m['id']), m)
w('/migration.json', tracker)
# ---------- feeds
def atom(app, title, items, base):
    e = []
    for it in items[:100]:
        link = it.get('url') or (SITE + base + 'items/' + it['key'] + '.json')
        e.append('<entry><id>tag:cedwyn.bucklerfamily.estate,2026:%s/%s</id><title>%s</title><link href="%s"/><updated>%s</updated><summary>%s</summary>%s</entry>' % (
            app, xesc(it['key']), xesc(it.get('title') or it['key']), xesc(link), xesc(norm_date(it.get('date'))),
            xesc(it.get('summary') or ''), ('<category term="%s"/>' % xesc(it['uid'])) if it.get('uid') else ''))
    return ('<?xml version="1.0" encoding="utf-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom"><id>tag:cedwyn.bucklerfamily.estate,2026:%s</id><title>%s</title>'
            '<link rel="self" href="%s"/><updated>%s</updated><author><name>Cedwyn editors</name></author>%s</feed>\n') % (app, xesc(title), xesc(SITE + base + 'feed.xml'), ISO, ''.join(e))
def rss(app, title, items, base):
    e = []
    for it in items[:100]:
        link = it.get('url') or (SITE + base + 'items/' + it['key'] + '.json')
        e.append('<item><guid isPermaLink="false">%s/%s</guid><title>%s</title><link>%s</link><description>%s</description>%s</item>' % (
            app, xesc(it['key']), xesc(it.get('title') or it['key']), xesc(link), xesc(it.get('summary') or ''),
            ('<category>%s</category>' % xesc(it['uid'])) if it.get('uid') else ''))
    return ('<?xml version="1.0" encoding="utf-8"?>\n<rss version="2.0"><channel><title>%s</title><link>%s</link><description>%s API feed</description><lastBuildDate>%s</lastBuildDate>%s</channel></rss>\n') % (
        xesc(title), xesc(SITE + base.replace('api/v1/', '')), xesc(title), NOW.strftime('%a, %d %b %Y %H:%M:%S +0000'), ''.join(e))
def jfeed(app, title, items, base):
    return {'version': 'https://jsonfeed.org/version/1.1', 'title': title, 'home_page_url': SITE + base.replace('api/v1/', ''), 'feed_url': SITE + base + 'feed.json',
            'items': [{'id': '%s/%s' % (app, it['key']), 'url': it.get('url') or (SITE + base + 'items/' + it['key'] + '.json'), 'title': it.get('title'),
                       'summary': it.get('summary') or '', 'date_published': norm_date(it.get('date')), 'tags': [it['uid']] if it.get('uid') else []} for it in items[:100]]}
def xml_slice(app, rev, items):
    out = ['<?xml version="1.0" encoding="utf-8"?>\n<slice app="%s" rev="%s" generated="%s" count="%d">' % (app, rev, ISO, len(items))]
    for it in items:
        attrs = ' '.join('%s="%s"' % (k, xesc(str(it[k]), {'"': '&quot;'})) for k in ('uid', 'key', 'kind') if it.get(k))
        out.append('<item %s><title>%s</title>%s%s</item>' % (attrs, xesc(it.get('title') or ''), ('<date>%s</date>' % xesc(str(it['date']))) if it.get('date') else '',
                   ('<url>%s</url>' % xesc(it['url'])) if it.get('url') else ''))
    out.append('</slice>\n'); return '\n'.join(out)
def norm_date(d):
    s = str(d or '')
    if len(s) >= 10 and s[4] == '-': return s[:10] + 'T00:00:00Z'
    if len(s) == 8 and s.isdigit(): return '%s-%s-%sT00:00:00Z' % (s[:4], s[4:6], s[6:])
    if len(s) == 4 and s.isdigit(): return s + '-01-01T00:00:00Z'
    return ISO
# ---------- pilot webapps
def app_src(m, name):
    loc = os.environ.get('LOCAL_APPS')
    if loc: return open(os.path.join(loc, m['id'], name)).read()
    return fetch(RAW + m['branch']['standard_name'] + '/' + name).decode('utf-8')
built = {}
for m in manifests:
    if not (m.get('migration') or {}).get('pilot'): continue
    app = m['id']; base = m['api']['base']
    ns = {'__name__': 'slice_' + app.replace('-', '_')}
    exec(compile(app_src(m, 'slice.py'), app + '/slice.py', 'exec'), ns)
    res = ns['build']({'catalogue': catalogue, 'fetch_json': fetch_json, 'manifest': m})
    items = scrub(res['items']); res['views'] = scrub(res.get('views', {})); rev = rev_of(items)
    items.sort(key=lambda it: str(it.get('date') or ''), reverse=True) if app != 'dartboard' else None
    lite = [{k: it.get(k) for k in ('key', 'uid', 'kind', 'title', 'date', 'holder', 'institution', 'class', 'summary', 'url') if it.get(k) is not None} for it in items]
    idx = {'schema': 'cedwyn-webapp-api/1', 'app': app, 'uid': m['uid'], 'slot': m['slot']['n'], 'version': m['version'], 'rev': rev, 'generated_at': ISO,
           'count': len(items), 'uids': sum(1 for it in items if it.get('uid')), 'slice': m['data']['slice'],
           'query': m['data']['query'], 'views': sorted(res.get('views', {}).keys()), 'items': lite}
    w(base + 'index.json', idx)
    for it in items: w(base + 'items/' + it['key'] + '.json', dict(it, app=app, rev=rev, catalogue=(uid_index.get(it['uid']) if it.get('uid') else None)))
    for name, v in res.get('views', {}).items(): w(base + name + '.json', {'app': app, 'rev': rev, 'generated_at': ISO, 'view': name, 'data': v} if not isinstance(v, dict) else dict(v, app=app, rev=rev, generated_at=ISO))
    title = m['title']['en']
    w(base + 'feed.xml', atom(app, title, items, base)); w(base + 'rss.xml', rss(app, title, items, base))
    w(base + 'feed.json', jfeed(app, title, items, base)); w(base + 'data.xml', xml_slice(app, rev, items))
    w('/%s/_data/%s.json' % (app, m['data']['slice']), {'app': app, 'slice': m['data']['slice'], 'rev': rev, 'generated_at': ISO, 'items': items})
    w('/%s/index.html' % app, app_src(m, 'index.html')); w('/%s/manifest.json' % app, m)
    built[app] = {'rev': rev, 'count': len(items)}
    print('built', app, len(items), rev)
# ---------- /api/index.json : every webapp API (live when built here, planned otherwise)
apis = []
for m in manifests:
    a = {'app': m['id'], 'uid': m['uid'], 'slot': m['slot']['n'], 'title': m['title']['en'], 'status': m['status'], 'section': m['section'],
         'base': m['api']['base'], 'formats': sorted({o['format'] for o in m['api']['outputs']}),
         'kinds': m['data']['query']['kinds'], 'uid_prefixes': m['data']['query']['uid_prefixes'],
         'consumers': m.get('consumed_by', []), 'reads': [c['app'] for c in m.get('consumes', [])]}
    if m['id'] in built: a.update(live=True, endpoints=[o['path'] for o in m['api']['outputs']], rev=built[m['id']]['rev'], count=built[m['id']]['count'])
    else: a['live'] = False
    apis.append(a)
w('/api/index.json', {'schema': 'cedwyn-api-index/1', 'generated_at': ISO, 'site': SITE, 'count': len(apis), 'live': sum(1 for a in apis if a['live']),
                      'catalogue': {'index': '/catalogue-db/index.json', 'uids': '/catalogue-db/uids.json', 'ref': CAT_REF}, 'apis': apis})
# ---------- headers, robots
w('/_headers', """/*
  X-Robots-Tag: noindex
  X-Content-Type-Options: nosniff
/api/*
  Access-Control-Allow-Origin: *
  Cache-Control: public, max-age=300
/catalogue-db/*
  Access-Control-Allow-Origin: *
  Cache-Control: public, max-age=300
/:app/api/*
  Access-Control-Allow-Origin: *
  Cache-Control: public, max-age=300
/:app/_data/*
  Access-Control-Allow-Origin: *
  Cache-Control: public, max-age=300
/areas.json
  Access-Control-Allow-Origin: *
/manifests/*
  Access-Control-Allow-Origin: *
""")
w('/robots.txt', 'User-agent: *\nDisallow: /\n')
# ---------- status page
rows = tracker['rows']; ph = tracker['phases']
cnt = {p: sum(1 for r in rows if r['phase'] == p) for p in ph}; rag = {k: sum(1 for r in rows if r['rag'] == k) for k in ('green', 'amber', 'red', 'grey')}
def e(s): return html.escape(str(s if s is not None else ''))
trs = []
for r in rows:
    link = ('<a href="/%s/">%s</a>' % (e(r['id']), e(r['title']))) if r['id'] in built else e(r['title'])
    trs.append('<tr><td>%d</td><td>%s<div class="meta">%s · %s</div></td><td><span class="rag rag-%s" title="%s"></span> %s</td><td>%s</td></tr>' % (
        r['slot'], link, e(r['section']), e(r['status']), e(r['rag']), e(r['rag']), e(r['phase'].replace('_', ' ')), e(r['next_action'])))
page = """<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Webapp migration status · Cedwyn</title><link rel="stylesheet" href="/_std/cw-std.css"></head><body>
<div class="cw-header"><a class="cw-home" href="https://cedwyn.bucklerfamily.estate/">Cedwyn</a><span class="cw-title">Webapp migration</span><span class="cw-count">59 webapps</span></div>
<main><h1>Webapp migration: status</h1>
<p class="lede">Every webapp moves to one standard: a static front end with the common header, its own slice of the central catalogue
(by catalogue UID), a local store with a client-side cache, and its own API in JSON, RSS/Atom and XML for other webapps to read.
Read-only status, rebuilt with every change. Updated %s.</p>
<div class="card"><strong>Phases</strong> (last completed): %s<br><strong>Status</strong>: %s</div>
<div class="card"><strong>Pilots</strong>: %s · <a href="/api/index.json">API index</a> · <a href="/catalogue-db/index.json">central catalogue export</a> ·
<a href="/schema/webapp.schema.json">manifest schema</a> · <a href="/migration.json">tracker JSON</a></div>
<div class="tw"><table><thead><tr><th>#</th><th>Webapp</th><th>Phase</th><th>Next action</th></tr></thead><tbody>%s</tbody></table></div></main>
<footer>Phases: %s. Catalogue changes need the owner's approval; this site only reads.</footer></body></html>""" % (
    e(ISO[:16].replace('T', ' ') + ' UTC'), e(', '.join('%s %d' % (p.replace('_', ' '), cnt[p]) for p in ph if cnt[p])),
    e(', '.join('%s %d' % (k, v) for k, v in rag.items() if v)),
    ' · '.join('<a href="/%s/">%s</a> (%d items)' % (a, a, b['count']) for a, b in built.items()) or 'none yet',
    ''.join(trs), e(' → '.join(p.replace('_', ' ') for p in ph)))
w('/index.html', page)
print('done', len(manifests), 'manifests', len(built), 'pilots', OUT)
