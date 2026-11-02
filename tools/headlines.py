#!/usr/bin/env python3
"""headlines.py - shared animated reader loader across human-facing Cedwyn pages and webapps.

The build uses one common reader (/_cedwyn/clamp.js -> cw-graph.js) on every human-facing
first-party page, including app, chat, chess, ebooks, shop, academy, email and exploration
routes. The reader turns structured text into nested previews with animated expand/back
transitions. It does not rewrite the source text. Machine/data endpoints and mirrored copies
of outside websites remain untouched; app controls are protected by the runtime's container
safety checks and explicit data-cw-nolevels opt-outs.

Before injecting the loader, unwrap only the old Cedwyn-specific cw-more/ghf-rm wrappers so
pages do not present two competing disclosure systems. Native details used as menus, keys or
timeline records are otherwise left for the shared reader. Report: dist/_cedwyn/reports/headlines.json.
"""
import json, pathlib, re, sys

SKIP_DIRS = ('_blob/', '_ext/', 'db/', '_cedwyn/', 'wayback/websites/', 'graphql/', 'catalogue/', 'agents/')
SKIP_FILES = {'index.html', '404.html'}          # index.html = the landing page: two tiles, stays as it is
JS = '<script src="/_cedwyn/clamp.js?v=4" defer></script>'   # v4 (2 Nov 2026): site-wide animated nested reading levels; cw-graph 1.3.1
CSS = '<style id="cw-clamp-css">.cw-c{display:-webkit-box!important;-webkit-box-orient:vertical!important;-webkit-line-clamp:3!important;line-clamp:3;overflow:hidden!important;position:relative}.cw-h{display:none!important}@media print{.cw-c{display:block!important;-webkit-line-clamp:unset!important;overflow:visible!important}.cw-h{display:revert!important}}</style>'   # the rest of the styling ships inside clamp.js v2

OPEN = re.compile(r'<details class="cw-more(?: cw-more-3)?"><summary data-cw-more><span class="cw-more-l">[^<]*</span></summary><div class="cw-more-b">')
CLOSE = re.compile(r'<button type="button" class="cw-less" data-cw-less(?: hidden)?>[^<]*</button></div></details>')
OLDCSS = re.compile(r'<style id="cw-more-css">.*?</style>(?:<noscript><style>details\.cw-more::details-content.*?</style></noscript>)?', re.S)

def unwrap(t):
    a = len(OPEN.findall(t)); b = len(CLOSE.findall(t))
    if not a and 'id="cw-more-css"' not in t: return t, 0
    if a != b: return t, -1                              # unbalanced: leave the page as it is (reported)
    t = OPEN.sub('', t); t = CLOSE.sub('', t); t = OLDCSS.sub('', t); t = t.replace(' data-cw-lead', '')
    return t, a

def inject(t):
    # Existing pages may already carry an older loader URL. Upgrade it in place, and make sure
    # the stylesheet is present, rather than duplicating scripts or leaving stale browser caches.
    if re.search(r'<script\b[^>]*\bsrc\s*=\s*["\']/_cedwyn/clamp\.js(?:\?[^"\']*)?["\']', t, re.I):
        t = re.sub(r'(/_cedwyn/clamp\.js)(?:\?[^"\'>\s]*)?', r'\1?v=4', t)
        if 'id="cw-clamp-css"' in t:
            t = re.sub(r'<style id="cw-clamp-css">.*?</style>', lambda m: CSS, t, count=1, flags=re.S)
        else:
            i = t.lower().find('</head>')
            t = (t[:i] + CSS + t[i:]) if i >= 0 else CSS + t
        return t
    i = t.lower().find('</head>')
    add = CSS + JS
    return (t[:i] + add + t[i:]) if i >= 0 else add + t


# The research pages' own older "read more" (section snapshots): <details class="ghf-rm">, a cut-off lead line, then
# "… read more". Unwrapped the same way, so a page has one kind of read more: the lead line is a cut-off copy of the text
# below it and goes. Native <details> that are menus, map keys or timeline entries stay as they are. - Sion's Tab agent
FOLD = re.compile(r'<details\b[^>]*\bclass="(?:[^"]*\s)?(ghf-rm)(?:\s[^"]*)?"[^>]*>', re.I)
TAG = re.compile(r'<(/?)details\b[^>]*>', re.I)
SUM = re.compile(r'\s*<summary\b[^>]*>(.*?)</summary>', re.I | re.S)

def unfold(t):
    n = 0; pos = 0
    while True:
        m = FOLD.search(t, pos)
        if not m: return t, n
        depth, end = 0, None
        for k in TAG.finditer(t, m.start()):
            depth += -1 if k.group(1) else 1
            if depth == 0: end = k; break
        s = SUM.match(t, m.end())
        if end is None or not s or s.end() > end.start(): pos = m.end(); continue
        lab = s.group(1); im = re.search(r'\bid="([^"]+)"', m.group(0)); ida = (' id="%s"' % im.group(1)) if im else ''
        if m.group(1).lower() == 'ghf-rm': head = ('<span%s></span>' % ida) if ida else ''
        else: head = '<p class="cw-unfold"%s><strong>%s</strong></p>' % (ida, lab.strip())
        t = t[:m.start()] + head + t[s.end():end.start()] + t[end.end():]
        n += 1; pos = m.start()

def apply(t):
    t, u = unwrap(t)
    if u >= 0:
        t, f = unfold(t); u += f
    return inject(t), u

def run(dist):
    dist = pathlib.Path(dist); rep = {'pages': 0, 'unwrapped_pages': 0, 'unwrapped_folds': 0, 'unbalanced': [], 'themes': {}}
    for f in sorted(dist.rglob('*.html')):
        rel = f.relative_to(dist).as_posix()
        if rel in SKIP_FILES or rel.startswith(SKIP_DIRS): continue
        try: t = f.read_text(encoding='utf-8', errors='surrogateescape')
        except Exception: continue
        if len(t) > 30_000_000 or 'data-cw-headlines-off' in t: continue
        out, u = apply(t)
        if u < 0: rep['unbalanced'].append(rel)
        elif u: rep['unwrapped_pages'] += 1; rep['unwrapped_folds'] += u
        if out != t:
            f.write_text(out, encoding='utf-8', errors='surrogateescape'); rep['pages'] += 1
            th = rel.split('/')[0] if '/' in rel else '(root)'; rep['themes'][th] = rep['themes'].get(th, 0) + 1
    rep['unbalanced'] = rep['unbalanced'][:50]
    out = dist / '_cedwyn' / 'reports'; out.mkdir(parents=True, exist_ok=True)
    json.dump(rep, open(out / 'headlines.json', 'w'), indent=1)
    print('headlines: clamp on', rep['pages'], 'pages; old folds unwrapped on', rep['unwrapped_pages'], 'pages;', len(rep['unbalanced']), 'unbalanced')
    return rep

if __name__ == '__main__': run(sys.argv[1] if len(sys.argv) > 1 else 'dist')
