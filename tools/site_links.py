#!/usr/bin/env python3
"""site_links.py 1.0.0 - one plain "E-books" link in the footer of every built page (3 Nov 2026). - Sion's Tab agent
Owner purge rule, 00:48 GMT 2 Nov 2026: the cross-promo chrome (e-book strip, home e-book button, graph promo, section ribbon chips,
"Outside records" popup) stays purged; routes to /ebooks/ belong in the menu, the footer and the /ebooks/ page itself. The menu
link is drawn by basecamp.js (side menu, beside Values and Standards); this pass adds the footer link at build so it also shows
without JavaScript. Owner, 04:14 GMT 3 Nov 2026: "Do whatever you think will drive website traffic and sales."
What it adds: <p class="cw-foot-links" data-cw-foot="1.0.0"><a href="/ebooks/">E-books</a></p> (cy "E-lyfrau", es "E-libros";
pages under /wales/ or /argentina/ link to that scope's /ebooks/). Plain text link: no strip, chip, ribbon, button or image, and none
of the classes purge_promo.py removes (ebook-strip, hv-eb, outside-records, cedwyn-rib).
Where: inside the page's own last <footer> (not the agent footer), else just before the agent footer (#ghf-agent-footer). Pages with
no footer at all (apps, fragments) are left alone. Skipped: archived copies (same list as purge_promo.py), /_cedwyn/, /db/, /_blob/,
the /ebooks/ pages themselves. Idempotent (data-cw-foot). Report: dist/_cedwyn/reports/site_links.json. Never stops a build.
Usage: python3 tools/site_links.py dist   (site.py calls it right after purge_promo.py)"""
import json, pathlib, re, sys
VERSION = '1.0.0'
SKIP = ('wayback/websites/', 'wayback/mail/', 'wayback/html/', 'wayback/snapshot/', '_cedwyn/', 'db/', '_blob/')
LABEL = {'en': 'E-books', 'cy': 'E-lyfrau', 'es': 'E-libros'}
STYLE = 'margin:10px 0 6px;padding:0 8px;font-size:14px;line-height:1.4;text-align:center'
FOOT_OPEN = re.compile(r'<footer\b([^>]*)>', re.I)
AGENT = re.compile(r'<footer\b[^>]*\bid="ghf-agent-footer"', re.I)
NESTED = re.compile(r'</(?:blockquote|article|figure|section|aside|main|details|li|td)>')
EBOOKS = re.compile(r'^(?:(?:wales|argentina)/)?ebooks(?:/|\.html$|$)')


def lang_of(s):
    m = re.search(r'<html[^>]*\blang="([a-zA-Z]{2})', s[:4000])
    l = m.group(1).lower() if m else 'en'
    return l if l in LABEL else 'en'


def link(rel, s):
    pre = rel.split('/', 1)[0] if rel.split('/', 1)[0] in ('wales', 'argentina') and '/' in rel else ''
    href = ('/' + pre if pre else '') + '/ebooks/'
    return ('<p class="cw-foot-links" data-cw-foot="%s" style="%s"><a href="%s">%s</a></p>'
            % (VERSION, STYLE, href, LABEL[lang_of(s)]))


def place(rel, s):
    """Return the page with the footer link added, or None when the page has no footer to carry it."""
    if 'data-cw-foot=' in s or '</body>' not in s.lower(): return None
    p = link(rel, s)
    low = s.lower(); m = AGENT.search(s)
    stop = m.start() if m else low.rfind('</body>')
    own = [x for x in FOOT_OPEN.finditer(s, 0, stop) if 'ghf-agent-footer' not in x.group(1)]
    if own:
        end = low.find('</footer>', own[-1].end())
        # only a page-level footer: nothing that closes a quote, article, figure, section, aside or main after it
        if 0 < end < stop and not NESTED.search(low, end, stop): return s[:end] + p + s[end:]
    m = AGENT.search(s)
    if m: return s[:m.start()] + p + s[m.start():]
    return None


def run(dist):
    dist = pathlib.Path(dist)
    rep = {'version': VERSION, 'added_in_own_footer_or_before_agent_footer': 0, 'no_footer_left_alone': 0, 'already': 0, 'sample': []}
    for f in dist.rglob('*.htm*'):
        if not f.is_file(): continue
        rel = f.relative_to(dist).as_posix()
        if rel.startswith(SKIP) or EBOOKS.match(rel): continue
        try: s = f.read_text(encoding='utf-8')
        except Exception: continue
        if 'data-cw-foot=' in s: rep['already'] += 1; continue
        t = place(rel, s)
        if t is None: rep['no_footer_left_alone'] += 1; continue
        f.write_text(t, encoding='utf-8'); rep['added_in_own_footer_or_before_agent_footer'] += 1
        if len(rep['sample']) < 20: rep['sample'].append(rel)
    out = dist / '_cedwyn' / 'reports'; out.mkdir(parents=True, exist_ok=True)
    json.dump(rep, open(out / 'site_links.json', 'w'), indent=1)
    print('footer e-books link:', rep['added_in_own_footer_or_before_agent_footer'], 'pages;', rep['no_footer_left_alone'], 'without a footer left alone')
    return rep


if __name__ == '__main__': run(sys.argv[1] if len(sys.argv) > 1 else 'dist')
