"""wayback slice builder 1.0.0 (cedwyn-webapp/1.0.0 standard). Read by migration/tools/build_site.py.
Slice "wayback-index": every public source copy, shown like search results (image / video / book-doc / web).
- catalogued items: central-catalogue artifacts (AR-*) read from the catalogue-db mirror -> uid = the catalogue UID;
- files in the vault with no catalogue record yet: uid null, key = 'f-' + sha1(path)[:10], catalogue_status 'uncatalogued'
  (they become AR- records only through an owner-approved catalogue change; this builder never writes a record)."""
import hashlib
LIVE = 'https://cedwyn.bucklerfamily.estate'
SRC = 'https://cedwyn-274.pages.dev/wayback/'
def kind_of(t, path=''):
    t = (t or '').lower(); p = path.lower()
    if t in ('image',) or p.endswith(('.jpg', '.jpeg', '.png', '.webp', '.gif')): return 'image'
    if t in ('video',) or p.endswith(('.mp4', '.webm', '.mov')): return 'video'
    if t in ('html', 'web') or p.endswith(('.html', '/')): return 'web'
    return 'book-doc'
def build(ctx):
    items = []
    for r in ctx['catalogue']:
        if r.get('kind') != 'artifact' or not r.get('public'): continue
        tags = (r.get('scope') or {}).get('tags') or []
        mime = ''
        for d in r.get('detail') or []:
            if 'MIME' in (d.get('heading') or ''): mime = d.get('text') or ''
        k = 'image' if r['id'].startswith('AR-REC') else kind_of('pdf' if 'pdf' in mime else '', '')
        items.append({'uid': r['id'], 'key': r['id'], 'kind': k, 'record_kind': r['kind'], 'title': r['title'],
                      'date': (r.get('date') or {}).get('sort'), 'date_display': (r.get('date') or {}).get('display'),
                      'summary': (r.get('description') or '')[:280], 'holder': (r.get('provenance') or {}).get('holder'),
                      'url': (LIVE + r['page']) if r.get('page') else None,
                      'tags': tags, 'evidence': r.get('evidence') or [], 'catalogue_status': 'catalogued'})
    idx = ctx['fetch_json'](SRC + 'agent-index.json')
    for res in idx.get('resources', []):
        p = res.get('path') or ''
        if not p or res.get('type') in ('markdown', 'json') or p == '/index.html': continue
        key = 'f-' + hashlib.sha1(p.encode()).hexdigest()[:10]
        items.append({'uid': None, 'key': key, 'kind': kind_of(res.get('type'), p), 'record_kind': None,
                      'title': res.get('title') or p, 'date': (p.split('/')[-1][:10] if p.split('/')[-1][:4].isdigit() and p.split('/')[-1][:4] != '0000' else None), 'date_display': None,
                      'summary': (res.get('description') or '')[:280], 'holder': None, 'url': LIVE + '/wayback' + p,
                      'tags': [res.get('type') or ''], 'evidence': [], 'catalogue_status': 'uncatalogued'})
    try: tree = ctx['fetch_json'](SRC + 'pdf/_treeview.json')
    except Exception: tree = []
    for f in tree if isinstance(tree, list) else []:
        p = f.get('path') or ''
        key = 'f-' + hashlib.sha1(p.encode()).hexdigest()[:10]
        nm = f.get('name') or p
        items.append({'uid': None, 'key': key, 'kind': 'book-doc', 'record_kind': None, 'title': nm.replace('_', ' '),
                      'date': nm[:10] if nm[:4].isdigit() and nm[:4] != '0000' else None, 'date_display': None,
                      'summary': '', 'holder': None, 'url': LIVE + '/wayback/' + p.replace(' ', '%20'),
                      'tags': f.get('tags') or [], 'evidence': [], 'catalogue_status': 'uncatalogued'})
    seen = set(); out = []
    for it in items:
        if it['key'] in seen: continue
        seen.add(it['key']); out.append(it)
    kinds = {}
    for it in out: kinds.setdefault(it['kind'], []).append(it['key'])
    return {'items': out, 'views': {'kinds/' + k: {'kind': k, 'count': len(v), 'keys': v} for k, v in kinds.items()}}
