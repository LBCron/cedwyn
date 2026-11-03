"""dartboard front end 1.1.0 — DESIGN RESTORE (migration/MIGRATION.md, Design preservation rule).
Visitors keep the ORIGINAL Disclosure Rings / Dartboard GUI: the page and its built assets are the app's own front end
exactly as the Cedwyn build serves it (read from the static Pages project at build time). The original app already draws
everything from JSON (data/roadmap.json, ladders, forecast, snakes-and-ladders files); slice.py publishes those files from
the app's own branch (unclehowell/datro@dartboard, public/data/) into api/v1/data/, and this step serves the same bytes at
/dartboard/data/ where the original bundle reads them. Nothing in the bundle is edited."""
import re
SEED = ['/dartboard/', '/dartboard/favicon.svg', '/dartboard/__grok/manifest.webmanifest', '/dartboard/__grok/icon-180.png',
        '/dartboard/ebook/cta.js', '/dartboard/_db/config.json', '/_cedwyn/ghf/sites/estate.json']
def build_front(ctx):
    page = ctx['fetch'](ctx['origin'] + '/dartboard/').decode('utf-8')
    files = {'/dartboard/index.html': page}; log = []
    todo = sorted(set(re.findall(r'/dartboard/assets/[A-Za-z0-9_.-]+\.(?:js|css)', page))); done = set()
    while todo:
        p = todo.pop()
        if p in done: continue
        done.add(p); data = ctx['mirror'](p)
        if data is None: log.append('miss ' + p); continue
        for q in re.findall(r'(?:\./|assets/)([A-Za-z0-9_.-]+-[A-Za-z0-9_]{6,10}\.(?:js|css))', data.decode('utf-8', 'ignore')):
            if '/dartboard/assets/' + q not in done: todo.append('/dartboard/assets/' + q)
    for p in SEED[1:]: ctx['mirror'](p)
    cfg = ctx['mirror']('/dartboard/_db/config.json')
    if cfg:
        import json, math
        c = json.loads(cfg); n = math.ceil(c['databaseLengthBytes'] / c['serverChunkSize'])
        for i in range(n): ctx['mirror']('%s%0*d' % (c['urlPrefix'], c['suffixLength'], i))
    for name, raw in (ctx['res'].get('raw_files') or {}).items():
        files[ctx['base'] + 'data/' + name] = raw; files['/dartboard/data/' + name] = raw
    log.append('assets %d, data files %d' % (len(done), len(ctx['res'].get('raw_files') or {})))
    return {'files': files, 'redirects': ['/dartboard/docs/* %s/dartboard/docs/:splat 302' % ctx['live']], 'log': log}
