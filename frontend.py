"""wayback front end 1.1.0 — DESIGN RESTORE (migration/MIGRATION.md, Design preservation rule).
Visitors keep the ORIGINAL Wayback Vault GUI: the page is the app's own front end exactly as the Cedwyn build serves it
(read from the static Pages project at build time: same HTML, CSS, layout, fonts, colours, navigation, interactions and
shared site chrome, including the "N of 59" back/next header that chrome already carries). Only its data reads change:
- the gallery categories read api/v1/category/<cat>.json (built by slice.py) instead of <cat>/_treeview.json;
- the Websites tab reads api/v1/websites.json instead of /websites/index.json.
Media files (images, PDFs, video, archived copies) stay where they are; on the pilot host they redirect to the live vault.
Each patch is an exact text replacement; if an anchor is missing the build logs it and keeps the original line."""
PATCHES = [
    ("const url = cat === 'email' ? 'email/mail-index.json' : `${cat}/_treeview.json`;",
     "const url = 'api/v1/category/' + cat + '.json'; /* cedwyn-webapp/1.1: data from this app's API v1 */"),
    ("const payload = JSON.parse(text);",
     "let payload = JSON.parse(text); if (payload && !Array.isArray(payload) && Array.isArray(payload.data)) payload = payload.data;"),
    ("xhrGet('/websites/index.json')", "xhrGet('api/v1/websites.json')"),
]
MEDIA_DIRS = ['images', 'pdf', 'text', 'video', 'email', 'mail', 'websites', 'viewer', 'artifacts', 'chronology',
              'recreations', 'media-register', 'people', 'ebooks', 'watchtower', 'releases', 'go']
COPY = ['/wayback/version.txt', '/wayback/agent-tools.js', '/wayback/agent-index.json', '/wayback/llms.txt',
        '/wayback/_db/config.json', '/dartboard/ebook/cta.js', '/_cedwyn/ghf/sites/wayback.json']
def build_front(ctx):
    page = ctx['fetch'](ctx['origin'] + '/wayback/').decode('utf-8')
    log = []
    for a, b in PATCHES:
        if a in page: page = page.replace(a, b, 1); log.append('ok: ' + a[:40])
        else: log.append('MISSING anchor: ' + a[:60])
    files = {'/wayback/index.html': page}
    for p in COPY: ctx['mirror'](p)
    cfg = ctx['mirror']('/wayback/_db/config.json')
    if cfg:
        import json, math
        c = json.loads(cfg); n = math.ceil(c['databaseLengthBytes'] / c['serverChunkSize'])
        for i in range(n): ctx['mirror']('%s%0*d' % (c['urlPrefix'], c['suffixLength'], i))
    redirects = ['/wayback/%s/* %s/wayback/%s/:splat 302' % (d, ctx['live'], d) for d in MEDIA_DIRS]
    return {'files': files, 'redirects': redirects, 'log': log}
