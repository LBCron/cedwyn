#!/usr/bin/env python3
"""Regression checks for the Arcade / standalone flower gallery split."""
import json,pathlib,sys,tempfile
sys.path.insert(0,str(pathlib.Path(__file__).resolve().parent))
import site_consolidations
R=pathlib.Path(__file__).resolve().parent.parent
with tempfile.TemporaryDirectory() as td:
 site_consolidations.run(td)
 s=(pathlib.Path(td)/'arcade/index.html').read_text()
 assert 'Three interactive experiences' not in s
 assert '3D estate' not in s and '/terrain/' not in s
 assert '/garden/' in s and '/nft-art/' in s and '/cyberspace/' in s
 assert 'arcade-loading' in s and 'MutationObserver' in s
 assert s.count('data-src=')==2
manifest=json.loads((R/'web/_cedwyn/flower-gallery/artworks.json').read_text())
assert len(manifest['artworks'])==134
for a in manifest['artworks']:
 assert a['version']=='v0.0.1' and a['versions']==['v0.0.1']
 assert a['image'].startswith('/nft-art/art/') and a['thumb'].startswith('/nft-art/art/')
 assert '-v0.0.2' not in a['image']
 assert not any(k in a for k in ['src','buy','v001_image'])
for name in ['garden','nft-art']:
 s=(R/'web'/name/'index.html').read_text()
 assert 'target="_top"' in s and 'role="status"' in s and 'data-cw-nolevels' in s
registry=json.loads((R/'data/site-areas.json').read_text());assert len(registry['areas'])==registry['area_count']
assert len({x['serendipity_slot'] for x in registry['areas']})==len(registry['areas'])
print('Arcade flower split regression checks PASS')

with tempfile.TemporaryDirectory() as td:
 d=pathlib.Path(td);m=d/'_cedwyn/flower-gallery/artworks.json';m.parent.mkdir(parents=True)
 m.write_text(json.dumps({'artworks':[{'image':'/nft-art/art/a.webp','thumb':'/nft-art/art/a-t.webp'}]}))
 (d/'_blob').mkdir();(d/'_blob/a.webp').write_bytes(b'test');(d/'_blob/a-t.webp').write_bytes(b'test')
 (d/'_blob_map.json').write_text(json.dumps({'/nft-art/art/a.webp':'/_blob/a.webp','/nft-art/art/a-t.webp':'/_blob/a-t.webp'}))
 site_consolidations.resolve_flower_artwork(d)
 assert json.loads(m.read_text())['artworks'][0]['image']=='/_blob/a.webp'
 (d/'_blob/a.webp').unlink()
 try:site_consolidations.resolve_flower_artwork(d)
 except FileNotFoundError:pass
 else:raise AssertionError('Missing flower image must fail build')
 print('Post-dedupe asset rewrite and missing-asset guard PASS')

# Real final serving pass: catalogue images must remain files on a first visit.
import dbserve, hashlib
for prefix in ('/nft-art/art/', '/_blob/'):
 with tempfile.TemporaryDirectory() as td:
  d=pathlib.Path(td);m=d/'_cedwyn/flower-gallery/artworks.json';m.parent.mkdir(parents=True)
  paths=[prefix+'a.webp',prefix+'a-t.webp']
  m.write_text(json.dumps({'artworks':[dict(zip(('image','thumb'),paths))]}))
  (d/'db').mkdir();b=[];indexes={}
  for path in paths:
   f=d/path.lstrip('/');f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(b'test')
   indexes[path]=len(b);b.append([4,0,0,[],'image/webp',hashlib.sha256(b'test').hexdigest()[:16]])
  (d/'db/blobmap.json').write_text(json.dumps({'paths':indexes,'blobs':b,'v':'test'}))
  dbserve.DIST=d;dbserve.main()
  assert all((d/p.lstrip('/')).is_file() for p in paths)
 print('Real dbserve keeps first-visit '+prefix+' artwork PASS')
