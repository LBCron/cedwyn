/* v0.1.1 (2 Nov 2026): the header carries "42 of 59" in its own numbering slot (.ghf-v2-name small), and the header's
   third row (the e-book "Read free" strip, or any other cross-promo put there) stays hidden on this webapp. The shared
   Garden banner (.ghf-v2-up.cw-gdn-on) is the one thing allowed in that row. When the area registry gives this webapp its
   own slot, the header's own number is used and nothing is added here. v0.1.2: on /wales/tithe-h3/ the header took the Wales
   hub's name and number (this webapp is not in the area registry yet); the page now writes its own name and number there too.
   - Cedwyn editors */
(function(){
var d=document,NAME="Tithe H3",SLOT="42",OF="59",WORD={en:"of",cy:"o",es:"de"};
function lg(){var l=(d.documentElement.getAttribute("lang")||"en").slice(0,2).toLowerCase();return WORD[l]?l:"en";}
function num(){var n=d.querySelector(".ghf-v2-chain .ghf-v2-name");if(!n)return false;
 var b=n.querySelector("b"),s=n.querySelector("small");
 if(s&&!s.hasAttribute("data-th3-slot")&&b&&b.textContent.trim()===NAME)return true;
 if(b&&b.textContent!==NAME)b.textContent=NAME;
 var t=SLOT+" "+WORD[lg()]+" "+OF;
 if(!s){s=d.createElement("small");n.appendChild(s);}
 s.setAttribute("data-th3-slot","");
 if(s.textContent!==t||!s.querySelector("a")){s.textContent="";var a=d.createElement("a");a.className="cw-parcel-link";a.href="/parcels/";a.setAttribute("data-parcel-slot",SLOT);a.setAttribute("data-parcel-of",OF);a.style.color="inherit";a.style.textDecoration="none";a.textContent=t;s.appendChild(a);}
 return true;}
function strip(){var up=d.querySelector(".ghf-v2-up");if(!up)return false;
 var want=up.classList.contains("cw-gdn-on")?"":"none";
 if((up.style.getPropertyValue("display")||"")!==want){
  if(want){up.style.setProperty("display","none","important");up.setAttribute("aria-hidden","true");}
  else{up.style.removeProperty("display");up.removeAttribute("aria-hidden");}
  try{window.dispatchEvent(new Event("resize"));}catch(e){}}
 return true;}
function both(){var a=num(),b=strip();return a&&b;}
var n=0,iv=setInterval(function(){if(both()||++n>150){clearInterval(iv);var h=d.querySelector(".ghf-v2");
 if(h)new MutationObserver(both).observe(h,{childList:true,subtree:true,attributes:true,attributeFilter:["class","style"]});}},100);
d.addEventListener("ghf-lang-change",function(){setTimeout(both,0);});
})();
(function(){
var COLORS={"Williams John":"#1b7a3a","Evans Revd James":"#7b3fa0","Evans the Revd James (Glebe)":"#7b3fa0","Rees Thomas":"#d9741c","Evans Evans":"#2f6db5","Sprackett John":"#b5306b","Williams James":"#3aa6a0","Jenkins William":"#8a6d1f","Jenkins Lewis":"#5d7f8c"};
function first(s){return (s||"").split(";")[0].trim();}
function occCol(p){if(p.read==="not read")return "#888";return COLORS[first(p.occ)]||"#555";}
/* v0.3.0 traffic light: a working classification of family-associated land, not a legal finding. Green = Parcel A (house and yard,
   orchard, the wood strip and the field beside them: 1841 tithe 209, 211, 219, 220, a working match). Amber = a possible link not
   established: Parcel B (plan 5 and 6, 1841 tithe 193; the match is not checked), Leckwith Common and the playing fields (a pin on
   today's Leckwith Moors park; the 1957-58 order land is not yet located on a plan), Parcel C (boundary not held, so not drawn).
   Red = every other parcel on the c.1824 estate plan. - Cedwyn editors */
var TLC={red:"#c62828",amber:"#f0a500",green:"#2e8b3e"},TLW={red:"Red",amber:"Amber",green:"Green"},tlOn=true;
var TLWHY={red:"The estate: a parcel on the c.1824 estate plan of Cedfin alias Ty Mawr.",
 amber:"Parcel B (plan 5 and 6, 1841 tithe 193): a possible link, not established. The plan-to-tithe match is not checked, and the 1841 occupier of 193 is another holding.",
 green:"Parcel A: house and yard, orchard, wood strip and field (1841 tithe 209, 211, 219, 220). A working match, not checked against a dated plan of Parcel A."};
function tl(p){var n=String(p.no);
 if(n==="7"||n==="28"||n.indexOf("not read A")===0||n.indexOf("homestead group")===0)return "green";
 if(n==="5"||n==="6")return "amber";
 return "red";}
function col(p){return tlOn?TLC[tl(p)]:occCol(p);}
var LECK={lat:51.45887,lon:-3.20240};
var map=L.map("map",{zoomControl:true,attributionControl:true,maxZoom:21}).setView([51.4545,-3.2015],15);
var osm=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{subdomains:"abc",maxNativeZoom:19,maxZoom:21,attribution:"© OpenStreetMap contributors"}).addTo(map);
var os6=L.tileLayer("https://mapseries-tilesets.s3.amazonaws.com/os/6inchsecond/{z}/{x}/{y}.png",{maxNativeZoom:18,maxZoom:21,attribution:"OS six-inch c.1900, National Library of Scotland"});
var D,tithe,stew,outl=L.layerGroup().addTo(map),hexL=L.layerGroup().addTo(map),hexR=L.canvas({padding:0.2}),res=12,sel=null;
fetch("data/parcels.json?v=0.4.0").then(function(r){return r.json();}).then(function(d){D=d;init();});
function hexPoly(c,r){var ce=D.c[c],t=D.tmpl[String(r)];return t.map(function(o){return [ce[0]+o[0],ce[1]+o[1]];});}
function init(){
 tlOn=document.getElementById("l-tl").checked;
 var op=document.getElementById("l-op").value/100;
 tithe=L.imageOverlay("img/tithe-1841-overlay.webp?v=0.4.0",D.bounds,{opacity:op,attribution:"Tithe map 1841, National Library of Wales"}).addTo(map);
 stew=L.imageOverlay("img/stewart-plan-overlay.webp?v=0.4.0",D.bounds,{opacity:op});
 var all=drawOutl();
 map.fitBounds(L.featureGroup(all).getBounds(),{padding:[10,10]});
 prep();drawHex();legend();table();
 map.on("moveend",function(){if(res>8){clearTimeout(mvT);mvT=setTimeout(drawHex,120);}});
}
function drawOutl(){outl.clearLayers();sel=null;var all=[];
 D.parcels.forEach(function(p,i){
  var pg=L.polygon(p.poly,{color:"#111",weight:1.4,fill:true,fillOpacity:tlOn?0.38:0.04,fillColor:col(p),dashArray:p.read==="not read"?"4 3":null});
  pg.on("click",function(e){show(i,cellAt(e.latlng));});pg.addTo(outl);all.push(pg);
  L.tooltip({permanent:true,direction:"center",className:"th3-lbl"}).setLatLng([p.lat,p.lon]).setContent(p.read==="not read"?"?":p.no).addTo(outl);
 });
 if(tlOn){var pin=L.circleMarker([LECK.lat,LECK.lon],{radius:11,color:"#7a5200",weight:2,dashArray:"3 3",fillColor:TLC.amber,fillOpacity:0.75});
  pin.on("click",showLeck);pin.addTo(outl);
  L.tooltip({permanent:true,direction:"right",offset:[12,0],className:"th3-lbl"}).setLatLng([LECK.lat,LECK.lon]).setContent("Leckwith Common?").addTo(outl);}
 return all;}
function showLeck(){document.getElementById("panel").innerHTML="<h3>Leckwith Common and the playing fields</h3><dl>"+
 "<dt>Traffic light</dt><dd>Amber: a possible link, not established</dd>"+
 "<dt>What the pin marks</dt><dd>Today’s Leckwith Moors park (OpenStreetMap place point), as a guide only</dd>"+
 "<dt>Order</dt><dd>City of Cardiff (Leckwith Common) Compulsory Purchase Order 1957, confirmed 8 September 1958</dd>"+
 "<dt>1841 tithe plot</dt><dd>none identified</dd><dt>Title number</dt><dd>none held</dd></dl>"+
 "<p class=\"hint\">Whether the pin sits on the land in the 1957–58 order, and where the playing fields lay, is not checked: the order’s map has not been read.</p>";
 if(sel){outl.removeLayer(sel);sel=null;}}
/* v0.4.0: H3 resolution picker (8, 10, 11, 12, 13, 14, 15; 15 is the finest the H3 grid has). Resolution 8 keeps the cell
   holding each parcel's centre. Resolutions 10 to 15 are made in the browser (h3-js polygonToCells) for the part of the map in
   view only, never stored: each cell whose centre falls inside a parcel outline is drawn in that parcel's colour (centroid-in-
   polygon; where outlines overlap, the first parcel in the list). Work is capped at about 20,000 cells; past the cap, or below
   zoom 17 for res 14 and zoom 19 for res 15, the map shows "Zoom in to see res N". - Cedwyn editors */
var CAP=20000,MINZ={14:17,15:19},mvT=null,UB=null,lastN=0;
var AREA={8:"about 0.74 km²",10:"about 1.5 ha",11:"about 2,150 m²",12:"about 307 m²",13:"about 44 m²",14:"about 6.3 m²",15:"about 0.9 m²"};
var hintC=L.control({position:"topright"});hintC.onAdd=function(){var e=L.DomUtil.create("div","th3-zhint");e.hidden=true;L.DomEvent.disableClickPropagation(e);return e;};hintC.addTo(map);
function prep(){D.parcels.forEach(function(p){var a=90,b=180,c=-90,e=-180;p.poly.forEach(function(r){r.forEach(function(q){if(q[0]<a)a=q[0];if(q[0]>c)c=q[0];if(q[1]<b)b=q[1];if(q[1]>e)e=q[1];});});p._bb=[a,b,c,e];
 if(!UB)UB=[a,b,c,e];else{UB=[Math.min(UB[0],a),Math.min(UB[1],b),Math.max(UB[2],c),Math.max(UB[3],e)];}});}
function inPoly(lat,lon,p){var bb=p._bb;if(lat<bb[0]||lat>bb[2]||lon<bb[1]||lon>bb[3])return false;var ins=false;
 p.poly.forEach(function(r){for(var i=0,j=r.length-1;i<r.length;j=i++){var yi=r[i][0],xi=r[i][1],yj=r[j][0],xj=r[j][1];
  if(((yi>lat)!==(yj>lat))&&(lon<(xj-xi)*(lat-yi)/(yj-yi)+xi))ins=!ins;}});return ins;}
function whichParcel(lat,lon){for(var i=0;i<D.parcels.length;i++)if(inPoly(lat,lon,D.parcels[i]))return i;return -1;}
function cellAt(ll){if(!ll||!window.h3||res<10)return null;try{return h3.latLngToCell(ll.lat,ll.lng,res);}catch(e){return null;}}
function stat(t){var s=document.getElementById("h3stat");if(s)s.textContent=t;}
function zhint(z){var e=hintC.getContainer();if(!e)return;if(!z){e.hidden=true;e.innerHTML="";return;}
 e.innerHTML="<span>Zoom in to see res "+res+"</span> <button type=\"button\">Zoom in</button>";e.hidden=false;
 e.querySelector("button").onclick=function(){map.setZoom(Math.min(z,map.getMaxZoom()));};}
function m2(s,w,n,e){var k=111320,la=(s+n)/2*Math.PI/180;return Math.max(0,(n-s)*k)*Math.max(0,(e-w)*k*Math.cos(la));}
function drawHex(){hexL.clearLayers();zhint(0);lastN=0;if(!res){stat("");return;}
 if(res===8){var seen={};D.parcels.forEach(function(p,i){var c=p.h8;if(seen[c])return;seen[c]=1;
   var h=L.polygon(hexPoly(c,8),{color:"#1e4d45",weight:2,fillColor:col(p),fillOpacity:0.06});
   h.on("click",function(){show(i,c);});h.addTo(hexL);});stat("res 8 · "+AREA[8]+" a cell");return;}
 if(!window.h3||!UB){stat("Hexagons are still loading.");return;}
 var z=map.getZoom(),need=MINZ[res]||0;
 if(z<need){zhint(need);stat("res "+res+" · "+AREA[res]+" a cell · zoom in to draw");return;}
 var area=h3.getHexagonAreaAvg(res,"m2"),edge=h3.getHexagonEdgeLengthAvg(res,"m"),B=map.getBounds();
 var pl=edge/111320,pw=pl/Math.cos(B.getCenter().lat*Math.PI/180);
 var s=B.getSouth()-pl,w=B.getWest()-pw,n=B.getNorth()+pl,e=B.getEast()+pw,boxes=[],est=0;
 D.parcels.forEach(function(p){var bb=p._bb,a=Math.max(s,bb[0]),b=Math.max(w,bb[1]),c=Math.min(n,bb[2]),f=Math.min(e,bb[3]);
  if(a<c&&b<f){boxes.push([a,b,c,f]);est+=m2(a,b,c,f)/area;}});
 if(!boxes.length){stat("res "+res+" · no parcels in view");return;}
 if(est>CAP){var zz=z+Math.ceil(Math.log(est/CAP)/Math.log(4));zhint(Math.max(zz,need,z+1));stat("res "+res+" · "+AREA[res]+" a cell · about "+Math.round(est).toLocaleString("en-GB")+" in view, over the "+CAP.toLocaleString("en-GB")+" cap");return;}
 var seen={},cand=0,out=[];
 boxes.forEach(function(q){var cs;try{cs=h3.polygonToCells([[q[0],q[1]],[q[0],q[3]],[q[2],q[3]],[q[2],q[1]]],res);}catch(x){cs=[];}
  for(var k=0;k<cs.length;k++){var c=cs[k];if(seen[c])continue;seen[c]=1;cand++;if(cand>CAP*2)break;
   var ce=h3.cellToLatLng(c),i=whichParcel(ce[0],ce[1]);if(i>=0)out.push([c,i]);}});
 if(out.length>CAP){zhint(z+1);stat("res "+res+" · over the "+CAP.toLocaleString("en-GB")+" cap");return;}
 var fine=res>=13;
 out.forEach(function(o){var p=D.parcels[o[1]],cl=col(p);
  L.polygon(h3.cellToBoundary(o[0]),{renderer:hexR,interactive:false,color:fine?"#ffffff":cl,opacity:fine?0.55:1,weight:fine?0.4:0.6,fillColor:cl,fillOpacity:0.55}).addTo(hexL);});
 lastN=out.length;stat("res "+res+" · "+AREA[res]+" a cell · "+out.length.toLocaleString("en-GB")+" in view");}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(m){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[m];});}
function show(i,cell){var p=D.parcels[i];
 var h="<h3>Plan parcel "+esc(p.no)+"</h3><dl>"+
 "<dt>Traffic light</dt><dd><i class=\"th3-sw\" style=\"background:"+TLC[tl(p)]+"\"></i>"+TLW[tl(p)]+": "+esc(TLWHY[tl(p)])+"</dd>"+
 "<dt>Number on the plan</dt><dd>"+esc(p.reading)+(p.read!=="yes"?" ("+esc(p.read)+")":"")+"</dd>"+
 "<dt>1841 tithe plot</dt><dd>"+esc(p.tithe||"none matched")+"</dd>"+
 "<dt>Field name</dt><dd>"+esc(p.fname||"—")+"</dd><dt>Land use</dt><dd>"+esc(p.use||"—")+"</dd><dt>Area as entered</dt><dd>"+esc(p.area||"—")+"</dd>"+
 "<dt>Landowner as entered</dt><dd>"+esc(p.owner||"—")+"</dd><dt>Occupier as entered</dt><dd>"+esc(p.occ||"—")+"</dd>"+
 "<dt>Outline from</dt><dd>"+esc(p.src)+"</dd><dt>Traced area</dt><dd>"+esc(p.traced)+" acres (rough)</dd>"+
 "<dt>Centre</dt><dd>"+p.lat.toFixed(5)+", "+p.lon.toFixed(5)+"</dd><dt>OS grid ref</dt><dd>"+esc(p.gr)+"</dd>"+
 "<dt>H3 res 8</dt><dd><code>"+esc(p.h8)+"</code></dd><dt>H3 res 11</dt><dd>"+p.n11+" cells</dd><dt>H3 res 12</dt><dd>"+p.n12+" cells</dd>"+
 (cell?"<dt>This hexagon (res "+(res||"")+")</dt><dd><code>"+esc(cell)+"</code></dd>":"")+"</dl><p class=\"hint\">The plan-to-tithe match is our reading.</p>";
 document.getElementById("panel").innerHTML=h;
 if(sel)outl.removeLayer(sel);sel=L.polygon(p.poly,{color:"#e00",weight:3,fill:false}).addTo(outl);}
function legend(){if(tlOn){document.getElementById("legend").innerHTML="<span class=\"tl-head\"><b>Traffic light</b> · Family-associated land: a working classification, not a legal finding.</span>"+
 "<span><i style=\"background:"+TLC.red+"\"></i>Red: the estate (parcels on the c.1824 estate plan)</span>"+
 "<span><i style=\"background:"+TLC.amber+"\"></i>Amber: a possible link, not established (Parcel B; Leckwith Common and the playing fields, pin; Parcel C, boundary not held, not drawn)</span>"+
 "<span><i style=\"background:"+TLC.green+"\"></i>Green: Parcel A (1841 tithe 209, 211, 219, 220; working match)</span>";return;}
 var seen={},h="";D.parcels.forEach(function(p){var k=p.read==="not read"?"Plan number not read":first(p.occ)||"No 1841 match";if(!seen[k]){seen[k]=1;h+="<span><i style=\"background:"+(p.read==="not read"?"#888":(COLORS[first(p.occ)]||"#555"))+"\"></i>"+esc(k)+"</span>";}});
 document.getElementById("legend").innerHTML="<span><b>1841 occupier as entered:</b></span>"+h;}
function table(){var tb=document.querySelector("#tbl tbody"),h="";D.parcels.forEach(function(p,i){h+="<tr data-i=\""+i+"\"><td><i class=\"th3-sw\" style=\"background:"+TLC[tl(p)]+"\"></i>"+TLW[tl(p)]+"</td><td>"+esc(p.no)+"</td><td>"+esc(p.tithe)+"</td><td>"+esc(p.occ)+"</td><td>"+esc(p.gr)+"</td><td><code>"+esc(p.h8)+"</code></td></tr>";});tb.innerHTML=h;
 tb.addEventListener("click",function(e){var tr=e.target.closest("tr");if(!tr)return;var i=+tr.getAttribute("data-i"),p=D.parcels[i];show(i);map.setView([p.lat,p.lon],17);document.getElementById("map").scrollIntoView({behavior:"smooth"});});}
document.getElementById("l-tl").addEventListener("change",function(e){tlOn=e.target.checked;if(!D)return;drawOutl();drawHex();legend();document.getElementById("panel").innerHTML="<p class=\"hint\">Tap a parcel for its details.</p>";});
document.getElementById("l-tithe").addEventListener("change",function(e){e.target.checked?tithe.addTo(map):map.removeLayer(tithe);});
document.getElementById("l-stew").addEventListener("change",function(e){e.target.checked?stew.addTo(map):map.removeLayer(stew);});
document.getElementById("l-os").addEventListener("change",function(e){e.target.checked?os6.addTo(map):map.removeLayer(os6);});
document.getElementById("l-op").addEventListener("input",function(e){var v=e.target.value/100;tithe&&tithe.setOpacity(v);stew&&stew.setOpacity(v);});
(function(){var r=document.getElementById("l-res");if(!r)return;res=+r.value;r.addEventListener("change",function(){res=+r.value;if(D)drawHex();});})();
})();
/* v0.2.0: the (i) button and the Changelog link open the changelog table; Esc, the close button or a tap outside close it. - Cedwyn editors */
(function(){var d=document,m=d.getElementById("changelog");if(!m)return;
function op(e){if(e)e.preventDefault();if(m.showModal){if(!m.open)m.showModal();}else m.setAttribute("open","");}
function cl(){if(m.close)m.close();else m.removeAttribute("open");}
Array.prototype.forEach.call(d.querySelectorAll("[data-th3-info]"),function(b){b.addEventListener("click",op);});
Array.prototype.forEach.call(d.querySelectorAll("[data-th3-close]"),function(b){b.addEventListener("click",cl);});
m.addEventListener("click",function(e){if(e.target===m)cl();});
if(location.hash==="#changelog")op();})();
