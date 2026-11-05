
import sys, math, json, os
sys.path.insert(0, os.path.dirname(__file__))
from glb import Model
OUT=sys.argv[1]; os.makedirs(OUT, exist_ok=True)
S=json.load(open(os.path.join(os.path.dirname(__file__),'..','SITES.json')))
site={s['id']:s for s in S['sites']}
def meta(sid, extra=None):
    s=site[sid]; d={"site_id":sid,"name":s['name'],"lat":s['lat'],"lon":s['lon'],"axes":"metres; +x east, +y up, +z south; origin = the pin (lat,lon) at ground level",
       "period":s['period'],"confidence":s['confidence'],"label":"reconstruction — estimated where marked; see SITES.json known/estimated","estimated":s['estimated'],
       "evidence":[e['label']+(' '+e['url'] if e['url'] else '') for e in s['evidence']],"version":"0.1.0","by":"Sion's Tab agent"}
    if extra: d.update(extra)
    return d
sizes={}
# ---------------- ROUNDHOUSE ----------------
m=Model('roundhouse')
m.mat('daub',(0.66,0.56,0.42),0.95); m.mat('thatch',(0.52,0.42,0.25),1.0); m.mat('timber',(0.34,0.24,0.15),0.9); m.mat('door',(0.18,0.13,0.09),0.9)
R=5.0; m.ringwall('daub',0,0,R,1.6,0.35,seg=40,gap=(0,1.6*180/math.pi/R*1.0))   # doorway facing east (estimated)
m.cyl('thatch',0,0,R+1.0,5.4,y0=1.6,seg=40,top=False,r_top=0.0)
m.cyl('timber',0,0,0.18,7.0,seg=10)
for a in (-12,12): m.box('timber',R+0.7,math.tan(math.radians(a))*R*0.9,1.6,0.25,2.0,yaw=0)  # porch posts
m.box('door',R-0.05,0,0.1,1.3,1.5)
for i in range(64):  # palisade (estimated)
    a=2*math.pi*i/64
    if abs(((math.degrees(a)+180)%360)-180)<6: continue
    m.cyl('timber',22*math.cos(a),22*math.sin(a),0.14,2.2,seg=6)
sizes['roundhouse']=m.save(os.path.join(OUT,'roundhouse.glb'),meta('roundhouse',{"dims":"hut d 10 m, wall 1.6 m, apex 7 m, palisade r 22 m — all estimated"}))
# ---------------- VILLA ----------------
m=Model('villa')
m.mat('plaster',(0.90,0.86,0.76),0.8); m.mat('stone',(0.58,0.55,0.48),0.9); m.mat('tile',(0.68,0.33,0.2),0.7); m.mat('col',(0.86,0.83,0.76),0.6)
m.mat('court',(0.62,0.58,0.5),1.0); m.mat('water',(0.25,0.4,0.5),0.2)
TH=47.0; c,s=math.cos(math.radians(TH)),math.sin(math.radians(TH))
def UV(u,v): return (u*c-v*s, u*s+v*c)
def blk(u,v,w,d,eave,pitch,ridge='x'):
    x,z=UV(u,v)
    m.box('stone',x,z,w+0.2,d+0.2,0.5,yaw=TH)
    m.box('plaster',x,z,w,d,eave,y0=0.5,yaw=TH,top=False)
    m.gable('tile','plaster',x,z,w,d,eave+0.5,pitch,yaw=TH,ridge_along=ridge)
blk(0,0,45,7,3.0,28)                 # main range, traced length (Fig. 2)
blk(-19,-1.5,13,14,3.4,28,'z')       # NW room group (Fig. 2)
blk(19.5,1.5,14,15,3.4,28,'z')       # SE group incl. hypocaust room / bath suite (HER)
# portico on the courtyard (SW) side — estimated
for i in range(15):
    x,z=UV(-21+i*3.0,5.2); m.cyl('col',x,z,0.18,2.6,y0=0.3,seg=10)
x,z=UV(0,5.0); m.box('stone',x,z,45,3.2,0.3,yaw=TH); m.box('tile',x,z,45,3.4,0.15,y0=2.9,yaw=TH)
# courtyard + precinct wall (named in HER, plan estimated)
x,z=UV(0,18); m.box('court',x,z,44,24,0.05,yaw=TH)
for a,b in [((-22,6.6),(-22,30)),((22,6.6),(22,30)),((-22,30),(-2.2,30)),((2.2,30),(22,30))]:
    m.wall('stone',UV(*a),UV(*b),1.8,0.6)
x,z=UV(10,18); m.box('water',x,z,3,6,0.12,yaw=TH)  # pipe-fed tank (pipe trench in HER; tank estimated)
sizes['villa']=m.save(os.path.join(OUT,'villa.glb'),meta('villa',{"dims":"main range 45 m on bearing 137 deg (Fig. 2 traced); heights, roofs, portico, courtyard and wall line estimated"}))
# ---------------- MONASTERY ----------------
m=Model('monastery')
m.mat('timber',(0.36,0.25,0.15),0.9); m.mat('thatch',(0.52,0.42,0.25),1.0); m.mat('bank',(0.42,0.46,0.28),1.0); m.mat('stone',(0.6,0.58,0.53),0.85); m.mat('mark',(0.55,0.53,0.48),0.9)
cx,cz=13,31          # St Dochdwy's site relative to cemetery centre (OSM)
m.box('timber',cx,cz,12,6,3.2,top=False); m.gable('thatch','timber',cx,cz,12,6,3.2,50)
m.box('timber',cx+7.5,cz,3,4,2.6,top=False); m.gable('thatch','timber',cx+7.5,cz,3,4,2.6,50)   # chancel, estimated
# pillar cross (Coflein 301373: 2.97 m composite pillar, no head; ST1679073250)
px,pz=-7.8,42.4
m.box('stone',px,pz,0.9,0.9,0.5); m.box('stone',px,pz,0.45,0.4,1.25,y0=0.5); m.box('stone',px,pz,0.6,0.55,0.22,y0=1.75); m.box('stone',px,pz,0.4,0.35,1.0,y0=1.97)
# curvilinear enclosure (estimated)
m.ringwall('bank',6,16,45,1.4,2.2,seg=72,gap=(0,10))
# graves: Area II rows SW/NE west of centre; Area I curve (sample, not the excavated plan)
import random; random.seed(7)
for row in range(8):
    for k in range(9):
        u=-26+row*2.2; v=-14+k*2.0
        x=u*0.707-v*0.707; z=u*0.707+v*0.707
        m.box('mark',x-6,z+4,0.5,1.8,0.12,yaw=45)
for i in range(30):
    a=math.radians(200+i*4.5); r=18+random.uniform(-1,1)
    m.box('mark',6+r*math.cos(a),8+r*math.sin(a),0.5,1.8,0.12,yaw=math.degrees(a))
sizes['monastery']=m.save(os.path.join(OUT,'monastery.glb'),meta('monastery',{"dims":"church/oratory 12x6 m estimated at St Dochdwy's; pillar cross 2.97 m (Coflein 301373); enclosure r 45 m estimated; grave markers a sample"}))
# ---------------- TY MAWR ----------------
G=json.load(open('/home/user/tab/work/wales-3d/tymawr-geometry.json'))
m=Model('tymawr')
m.mat('limewash',(0.93,0.92,0.87),0.85); m.mat('slate',(0.23,0.25,0.28),0.55); m.mat('pantile',(0.62,0.27,0.17),0.75)
m.mat('rubble',(0.55,0.52,0.46),0.95); m.mat('dressed',(0.64,0.6,0.52),0.85); m.mat('brick',(0.55,0.24,0.18),0.85); m.mat('green',(0.16,0.33,0.2),0.6); m.mat('gravel',(0.6,0.57,0.5),1.0); m.mat('glass',(0.15,0.18,0.2),0.15,0.0)
WM={'limewash':'limewash','rubble stone':'rubble','dressed stone':'dressed'}; RM={'slate':'slate','red pantile':'pantile'}
for b in G['buildings']:
    if b['id']=='church': continue
    wm=WM.get(b.get('walls'),'limewash'); rm=RM.get(b.get('roof'),'slate')
    if 'len_ew' in b: w,d,ridge=b['len_ew'],b['dep_ns'],'x'
    else: w,d,ridge=b['dep_ew'],b['len_ns'],'z'
    m.box(wm,b['x'],b['z'],w,d,b['eave'],top=False)
    ry=m.gable(rm,wm,b['x'],b['z'],w,d,b['eave'],b['pitch'],ridge_along=ridge)
    for ch in b.get('chimneys',[]):
        cxx=b['x']-w/2+0.5 if ch['x']<1 else b['x']+w/2-0.5
        m.box('brick' if 'brick' in ch['mat'] else 'rubble',cxx,b['z'],0.9,1.0,ry-b['eave']+1.0,y0=b['eave'])
    if 'chimney' in b: m.box('rubble',b['x'],b['z']-d/2+0.6,1.0,0.9,ry-b['eave']+1.0,y0=b['eave'])
    if 'porch' in b:
        p=b['porch']; pz=b['z']+d/2+p['d']/2
        m.box(wm,b['x']+p['x'],pz,p['w'],p['d'],2.4,top=False); m.gable(rm,wm,b['x']+p['x'],pz,p['w'],p['d'],2.4,40,ridge_along='z')
    if b['id']=='house':
        for wx in (-3.6,-1.2,3.4):
            for wy in (1.2,3.4): m.box('glass',b['x']+wx,b['z']+d/2+0.01,1.0,0.04,1.2,y0=wy)
    if b['id']=='stable_range':
        for i in range(5): m.box('green',b['x']-5.6+i*2.8,b['z']+d/2+0.01,1.1,0.05,2.0)
    if 'cart_porch' in b:
        p=b['cart_porch']; pz=b['z']+d/2+p['d']/2
        m.box(wm,p['x'],pz,p['w'],p['d'],4.0,top=False); m.gable(rm,wm,p['x'],pz,p['w'],p['d'],4.0,40,ridge_along='z')
        m.box('green',p['x'],pz+p['d']/2+0.02,3.3,0.05,3.5)
for wl in G['walls']:
    (ax,az),(bx,bz)=wl['from'],wl['to']
    if 'gate_x' in wl:
        g0,g1=wl['gate_x']; segs=[((ax,az),(g0,bz)),((g1,az),(bx,bz))]
    else: segs=[((ax,az),(bx,bz))]
    for a,b2 in segs: m.wall('rubble',a,b2,1.5,0.5)
for y in G['yards']:
    x0,x1,z0,z1=y['gravel']; m.box('gravel',(x0+x1)/2,(z0+z1)/2,x1-x0,z1-z0,0.04)
sizes['tymawr']=m.save(os.path.join(OUT,'tymawr.glb'),meta('tymawr',{"geometry_source":"work/wales-3d/tymawr-geometry.json (farm reference photographs, best guess)","note":"pin = 1824 homestead-group centroid; model origin = house centre; church omitted (position conflict, see SITES.json)"}))
print(json.dumps(sizes))
