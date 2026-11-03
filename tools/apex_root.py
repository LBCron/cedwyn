#!/usr/bin/env python3
"""apex_root.py <bff public dir> <dist> - static-first hosting (3 Nov 2026): the files the apex used to get from its old Pages
project (unclehowell/BucklerFamilyFarm, folder public/, read-only) at its ROOT, copied VERBATIM into the build output, so the
apex bucklerfamily.estate can be served straight from this static Pages project with no Worker in the path:
  /ghf-lang/  shared language switcher + base-camp scripts that the other GHF sites load from the apex (cross-origin)
  /brand/     flags and icons;  /fonts/  web fonts;  /ebook/api/return(.html)  the after-payment thank-you page
  favicons, the web manifest and basecamp.json.
Runs late in the build (after rewrite/selfcontain/checks) so the files stay byte-for-byte what the other sites expect.
A file the build already has is never overwritten. The old project's CORS / cache headers for these paths are appended to
_headers. Undo: remove this step from build.yml. - Sion's Tab agent"""
import sys, shutil, pathlib, json
src, dist = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
DIRS = ['ghf-lang', 'brand', 'fonts']
FILES = ['ebook/api/return.html', 'favicon.ico', 'favicon-32.png', 'apple-touch-icon.png', 'site.webmanifest', 'basecamp.json']
copied, kept = [], []
def put(p):
    rel = p.relative_to(src); dst = dist / rel
    if dst.exists(): kept.append(str(rel)); return
    dst.parent.mkdir(parents=True, exist_ok=True); shutil.copyfile(p, dst); copied.append(str(rel))
if not src.is_dir():
    # the 'Apex site source' step removes its bff/ clone when it finishes (disk), so fetch public/ again here (sparse, blobs
    # on demand: a few MB). Fix 3 Nov 2026: the first run found no folder and copied nothing.
    import subprocess, tempfile
    tmp = pathlib.Path(tempfile.mkdtemp(prefix='bff-root-'))
    try:
        subprocess.run(['git', 'clone', '-q', '--depth', '1', '--filter=blob:none', '--sparse',
                        'https://github.com/unclehowell/BucklerFamilyFarm.git', str(tmp / 'bff')], check=True, timeout=600)
        subprocess.run(['git', '-C', str(tmp / 'bff'), 'sparse-checkout', 'set'] + ['public/' + d for d in DIRS] + ['public/ebook/api'],
                       check=True, timeout=600)
        subprocess.run(['git', '-C', str(tmp / 'bff'), 'checkout', '-q', '--', '.'], timeout=600)
        root = tmp / 'bff' / 'public'
        for f in FILES + ['_headers']:   # single root files: read straight from the tree (no checkout of all of public/)
            b = subprocess.run(['git', '-C', str(tmp / 'bff'), 'show', 'HEAD:public/' + f], capture_output=True, timeout=120)
            if b.returncode == 0: (root / f).parent.mkdir(parents=True, exist_ok=True); (root / f).write_bytes(b.stdout)
        src = root
    except Exception as e:
        print('apex root: could not fetch the old apex project (%s), nothing copied' % str(e)[:200]); sys.exit(0)
for d in DIRS:
    for p in sorted((src / d).rglob('*')) if (src / d).is_dir() else []:
        if p.is_file() and p.stat().st_size < 24 * 1024 * 1024: put(p)
for f in FILES:
    if (src / f).is_file(): put(src / f)
# the old project's headers for these paths (CORS for the cross-site scripts, dictionaries and fonts)
hdr = src / '_headers'
if hdr.is_file():
    blocks, cur = [], []
    for line in hdr.read_text('utf-8').splitlines():
        if line and not line[0].isspace():
            if cur: blocks.append(cur)
            cur = [line]
        elif line.strip() and cur: cur.append(line)
    if cur: blocks.append(cur)
    want = [b for b in blocks if b[0].strip().split('/')[1:2] and b[0].strip().split('/')[1] in ('ghf-lang', 'fonts', 'basecamp.json')]
    if want:
        out = dist / '_headers'
        old = out.read_text('utf-8') if out.exists() else ''
        add = '\n'.join('\n'.join(b) for b in want if b[0] not in old.splitlines())
        if add: out.write_text(old.rstrip('\n') + '\n# apex root files (tools/apex_root.py)\n' + add + '\n', 'utf-8')
rep = {'copied': len(copied), 'kept': kept[:40], 'dirs': DIRS, 'files': FILES}
(dist / '_cedwyn' / 'reports').mkdir(parents=True, exist_ok=True)
json.dump(rep, open(dist / '_cedwyn' / 'reports' / 'apex_root.json', 'w'), indent=1)
print('apex root: copied', len(copied), 'kept', len(kept))
