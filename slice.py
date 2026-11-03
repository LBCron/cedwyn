"""wayback slice builder 1.1.0 (cedwyn-webapp/1.1.0 standard). Read by migration/tools/build_site.py.
1.1.0 (3 Nov 2026, design restore): the API now carries exactly the data the ORIGINAL Wayback Vault front end shows,
read from the app's own branch (unclehowell/cedwyn@wayback, wayback/<category>/_treeview.json, email/mail-index.json,
websites/index.json) instead of a reduced list, so the restored original page renders from api/v1 with nothing lost.
Slice "wayback-index": every public source copy (images / pdf / text / email / video / websites) plus the central-catalogue
artifacts (AR-*) read from the catalogue-db mirror. A file with no catalogue record: uid null, key 'f-' + sha1(path)[:10],
catalogue_status 'uncatalogued' (it becomes an AR- record only through an owner-approved catalogue change; this builder
never writes a record).
Views (api/v1/<view>.json): category/<images|pdf|text|video> = the original tree entries (+ key, uid);
category/email = the original mail index (+ key, uid per record); websites = the original websites index; kinds/<kind>."""
import hashlib
LIVE = 'https://cedwyn.bucklerfamily.estate'
SRC = 'https://raw.githubusercontent.com/unclehowell/cedwyn/wayback/wayback/'
CATS = ['images', 'pdf', 'text', 'video']
def kind_of(t, path=''):
    t = (t or '').lower(); p = path.lower()
    if t in ('image', 'images') or p.endswith(('.jpg', '.jpeg', '.png', '.webp', '.gif')): return 'image'
    if t in ('video',) or p.endswith(('.mp4', '.webm', '.mov')): return 'video'
    if t in ('html', 'web', 'websites') or p.endswith(('.html', '/')): return 'web'
    return 'book-doc'
def fkey(p): return 'f-' + hashlib.sha1((p or '').encode()).hexdigest()[:10]
def dt(name):
    n = (name or '').split('/')[-1]
    return n[:10] if n[:4].isdigit() and n[:4] != '0000' else None
def build(ctx):
    items = []; views = {}
    for r in ctx['catalogue']:
        if r.get('kind') != 'artifact' or not r.get('public'): continue
        mime = ''
        for d in r.get('detail') or []:
            if 'MIME' in (d.get('heading') or ''): mime = d.get('text') or ''
        k = 'image' if r['id'].startswith('AR-REC') else kind_of('pdf' if 'pdf' in mime else '', '')
        items.append({'uid': r['id'], 'key': r['id'], 'kind': k, 'category': 'catalogue', 'record_kind': r['kind'], 'title': r['title'],
                      'date': (r.get('date') or {}).get('sort'), 'date_display': (r.get('date') or {}).get('display'),
                      'summary': (r.get('description') or '')[:280], 'holder': (r.get('provenance') or {}).get('holder'),
                      'url': (LIVE + r['page']) if r.get('page') else None, 'tags': (r.get('scope') or {}).get('tags') or [],
                      'evidence': r.get('evidence') or [], 'catalogue_status': 'catalogued'})
    for cat in CATS:
        try: tree = ctx['fetch_json'](SRC + cat + '/_treeview.json')
        except Exception: tree = []
        out = []
        for f in tree if isinstance(tree, list) else []:
            p = f.get('path') or ''; key = fkey(p)
            out.append(dict(f, key=key, uid=f.get('uid')))
            items.append({'uid': f.get('uid'), 'key': key, 'kind': kind_of(cat, p), 'category': cat, 'record_kind': None,
                          'title': f.get('title') or (f.get('name') or p).replace('_', ' '), 'date': dt(p), 'summary': '',
                          'holder': None, 'url': LIVE + '/wayback/' + p.replace(' ', '%20'), 'tags': f.get('tags') or [],
                          'path': p, 'evidence': [], 'catalogue_status': 'catalogued' if f.get('uid') else 'uncatalogued'})
        views['category/' + cat] = out
    try: mail = ctx['fetch_json'](SRC + 'email/mail-index.json')
    except Exception: mail = {'records': []}
    recs = []
    for rec in mail.get('records') or []:
        p = rec.get('sourcePath') or rec.get('path') or rec.get('id') or ''; key = fkey('email:' + p)
        recs.append(dict(rec, key=key, uid=rec.get('uid')))
        if rec.get('recordType') == 'correspondence':
            items.append({'uid': rec.get('uid'), 'key': key, 'kind': 'book-doc', 'category': 'email', 'record_kind': None,
                          'title': rec.get('subject') or rec.get('name') or p, 'date': (rec.get('date') or '')[:10] or None,
                          'summary': '', 'holder': None, 'url': None, 'tags': ['email'] + list(rec.get('tags') or []),
                          'path': p, 'evidence': [], 'catalogue_status': 'catalogued' if rec.get('uid') else 'uncatalogued'})
    views['category/email'] = dict(mail, records=recs)
    try: ws = ctx['fetch_json'](SRC + 'websites/index.json')
    except Exception: ws = {'items': []}
    wsi = []
    for it in ws.get('items') or []:
        key = fkey('web:' + (it.get('key') or it.get('url') or ''))
        wsi.append(dict(it, uid=it.get('uid'), api_key=key))
        items.append({'uid': it.get('uid'), 'key': key, 'kind': 'web', 'category': 'websites', 'record_kind': None,
                      'title': it.get('short_title') or it.get('title') or it.get('url'), 'date': (it.get('captured') or '')[:10] or None,
                      'summary': '', 'holder': it.get('host'), 'url': LIVE + '/wayback' + (it.get('latest') or ''),
                      'tags': ['web'], 'evidence': [], 'catalogue_status': 'catalogued' if it.get('uid') else 'uncatalogued'})
    views['websites'] = dict(ws, items=wsi)
    seen = set(); out = []
    for it in items:
        if it['key'] in seen: continue
        seen.add(it['key']); out.append(it)
    kinds = {}
    for it in out: kinds.setdefault(it['kind'], []).append(it['key'])
    for k, v in kinds.items(): views['kinds/' + k] = {'kind': k, 'count': len(v), 'keys': v}
    return {'items': out, 'views': views}
