#!/usr/bin/env python3
"""Fill the Public Authorities webapp's own data store, data/central.json, with only the central-catalogue fields it needs.
Read-only against the central catalogue (https://cedwyn.bucklerfamily.estate/api/catalogue, read as paged list requests).
data/central.json is a derived cache: never edit it by hand; the central catalogue stays the single source of truth.
The register lists public authorities and custodians, not catalogue IDs, so its field set is per authority: for every
authority named in the first column of the register table in index.html, the store holds the catalogue records whose
title or holder names that authority (id, kind, title, date_display, date_sort, status, holder, page; newest first),
plus a count. The authority list is read from index.html on every run, so an authority the register adds is picked up
with no hand-kept list. The file is rewritten only when a record it holds changed, and a run that cannot read the whole
catalogue listing leaves it as it was. Run by .github/workflows/sync-central.yml every 6 hours. — Sion's Tab agent"""
import json, re, sys, time, datetime, pathlib, urllib.request
ROOT = pathlib.Path(__file__).resolve().parent.parent
API = 'https://cedwyn.bucklerfamily.estate/api/catalogue/'
FIELDS = ('id', 'kind', 'title', 'date_display', 'date_sort', 'status', 'holder', 'page')
KINDS = {'evidence', 'artifact', 'missing_record'}
OUT = ROOT / 'data' / 'central.json'   # served at /authorities/data/central.json
html = (ROOT / 'index.html').read_text(encoding='utf-8')
auths = []
for row in re.findall(r'(?s)<tr[^>]*>(.*?)</tr>', html):
    cells = re.findall(r'(?s)<td[^>]*>(.*?)</td>', row)
    if cells:
        n = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', cells[0])).strip()
        n = n.replace('&amp;', '&')
        if n: auths.append(n.split(' — ')[0].strip())   # "National Library of Wales — new FOI" -> the authority itself
auths = list(dict.fromkeys(auths))
if not auths:
    sys.exit('no authorities found in index.html; data/central.json left as it was')
def names(n):
    out = [n]
    if '(' in n: out.append(n.split('(')[0].strip())   # "Archaeology Data Service (ADS)" -> also the name before the bracket
    for x in list(out):
        if ' / ' in x: out += [p.strip() for p in x.split(' / ')]   # "Welsh Government / Cadw" -> also each part
    return [x for x in dict.fromkeys(out) if len(x) >= 4]
def slug(n): return re.sub(r'[^a-z0-9]+', '-', n.lower()).strip('-')
all_rows, total, off = [], None, 0
try:   # one paged listing (/api/catalogue?limit=500&offset=N, edge-cached), matched here
    while True:
        req = urllib.request.Request(f"{API.rstrip('/')}?limit=500&offset={off}", headers={'User-Agent': 'cedwyn-webapp-sync/1.1'})
        page = json.load(urllib.request.urlopen(req, timeout=60))
        rows = page.get('items') or []
        total = page.get('total', total)
        all_rows += rows
        off += len(rows)
        if not rows or (total is not None and off >= total): break
        time.sleep(1)
except Exception as e:
    sys.exit(f'catalogue listing could not be read ({e}); data/central.json left as it was')
if total is None or len({it.get('id') for it in all_rows if it.get('id')}) < total:
    sys.exit(f'catalogue listing incomplete ({len(all_rows)} of {total}); data/central.json left as it was')
by = {}
for name in auths:
    recs = {}
    for nm in names(name):
        for it in all_rows:
            hay = ((it.get('title') or '') + ' ' + (it.get('holder') or '')).lower()
            if it.get('id') and it.get('kind') in KINDS and nm.lower() in hay:
                recs[it['id']] = {k: it.get(k) for k in FIELDS}
    rows = sorted(recs.values(), key=lambda r: (r.get('date_sort') or '', r['id']), reverse=True)
    by[slug(name)] = {'name': name, 'count': len(rows), 'records': rows}
prev = {}
try: prev = json.loads(OUT.read_text(encoding='utf-8'))
except Exception: pass
if prev.get('authorities') == by:
    print('no change', sum(v['count'] for v in by.values())); sys.exit(0)
doc = {
    'source': API.rstrip('/'),
    'note': "The Public Authorities webapp's own data store: for each authority in the register table of index.html, the "
            'central-catalogue records whose title or holder names it. Derived and read-only; never edit by hand '
            '(tools/sync_central.py rewrites it).',
    'fields': list(FIELDS),
    'match': 'authority name (also the name before any bracket, and each part either side of a slash) found in the record title or holder',
    'synced_utc': datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
    'count': sum(v['count'] for v in by.values()), 'authorities': by}
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(doc, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('written', len(by), 'authorities', doc['count'], 'records')
