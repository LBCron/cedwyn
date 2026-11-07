/* Header: the page writes its own name and provisional number (46 of 59) in the header slot until the area registry lists it; the header's third row shows only the shared Garden banner. - Cedwyn editors */
(function(){
var d=document,NAME="Chubut H3",SLOT="46",OF="59",WORD={en:"of",cy:"o",es:"de"};
function lg(){var l=(d.documentElement.getAttribute("lang")||"en").slice(0,2).toLowerCase();return WORD[l]?l:"en";}
function num(){var n=d.querySelector(".ghf-v2-chain .ghf-v2-name");if(!n)return false;
 var b=n.querySelector("b"),s=n.querySelector("small");
 if(s&&!s.hasAttribute("data-ch3-slot")&&b&&b.textContent.trim()===NAME)return true;
 if(b&&b.textContent!==NAME)b.textContent=NAME;
 var t=SLOT+" "+WORD[lg()]+" "+OF;
 if(!s){s=d.createElement("small");n.appendChild(s);}
 s.setAttribute("data-ch3-slot","");
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
var d=document,BLUE="#1f4f7a",HEX="#4E8CC8",GOLD="#C8900E",RES=12,DATA=null,M={};
function fmt(n){return n.toLocaleString("en-GB");}
function tiles(m){L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxNativeZoom:19,maxZoom:19,referrerPolicy:"strict-origin-when-cross-origin",attribution:"© OpenStreetMap contributors"}).addTo(m);}
function mk(id,side){var m=L.map(id,{preferCanvas:true,zoomControl:true,scrollWheelZoom:false});tiles(m);
 var S=DATA[side],r=L.canvas({padding:.3}),out=L.layerGroup().addTo(m),hex=L.layerGroup().addTo(m),all=[];
 S.parcels.forEach(function(p){p.parts.forEach(function(rg){var pl=L.polygon(rg,{renderer:r,color:GOLD,weight:1.6,fill:true,fillOpacity:.04,fillColor:GOLD});
  pl.on("click",function(e){show(side,p,e.latlng);});pl.addTo(out);all.push(pl);});});
 L.polyline([S.centre,S.coast],{color:BLUE,weight:2.5,dashArray:"6 6"}).addTo(m);
 L.circleMarker(S.centre,{radius:5,color:"#fff",weight:2,fillColor:BLUE,fillOpacity:1}).addTo(m);
 L.circleMarker(S.coast,{radius:4,color:"#fff",weight:2,fillColor:BLUE,fillOpacity:1}).addTo(m);
 var mid=[(S.centre[0]+S.coast[0])/2,(S.centre[1]+S.coast[1])/2];
 L.tooltip({permanent:true,direction:"center",className:"ch3-lbl",interactive:false}).setLatLng(mid).setContent((S.d_centre_m/1000).toFixed(2)+" km to the sea").addTo(m);
 var b=L.latLngBounds([S.coast]);all.forEach(function(x){b.extend(x.getBounds());});m.fitBounds(b,{padding:[18,18]});
 M[side]={m:m,r:r,out:out,hex:hex,S:S};return M[side];}
function cellsFor(S,res){var set={},n=0;
 if(res===8){S.parcels.forEach(function(p){set[h3.latLngToCell(p.c[0],p.c[1],8)]=1;});}
 else S.parcels.forEach(function(p){p.parts.forEach(function(rg){h3.polygonToCells(rg,res).forEach(function(c){set[c]=1;});});});
 return Object.keys(set);}
function draw(side){var o=M[side];if(!o)return 0;o.hex.clearLayers();if(!RES||!window.h3)return 0;
 var cs=cellsFor(o.S,RES);cs.forEach(function(c){L.polygon(h3.cellToBoundary(c),{renderer:o.r,color:HEX,weight:RES>=13?.4:.8,fillColor:HEX,fillOpacity:.45,interactive:false}).addTo(o.hex);});
 return cs.length;}
function redraw(){var a=draw("chubut"),b=draw("wales"),st=d.getElementById("h3stat");
 if(st)st.textContent=RES?("res "+RES+": "+fmt(a)+" cells here · "+fmt(b)+" at Llandough"):"";}
function show(side,p,ll){var pn=d.getElementById("panel");if(!pn)return;var c=window.h3&&RES?h3.latLngToCell(ll.lat,ll.lng,RES):"";
 pn.innerHTML="<h3>Plan parcel "+p.no+"</h3><dl><dt>Shown at</dt><dd>"+(side==="chubut"?"Chubut coast (transposed)":"Llandough (Tithe H3 map)")+"</dd>"+(c?"<dt>H3 res "+RES+"</dt><dd><code>"+c+"</code></dd>":"")+"</dl>";}
function start(){if(!window.L||!window.h3){return setTimeout(start,60);}
 fetch("data/outline.json?v=0.1.0").then(function(r){return r.json();}).then(function(j){DATA=j;mk("map","chubut");mk("mapw","wales");redraw();});
 var sel=d.getElementById("l-res");if(sel)sel.addEventListener("change",function(){RES=+sel.value;redraw();});
 var ob=d.getElementById("l-out");if(ob)ob.addEventListener("change",function(){["chubut","wales"].forEach(function(s){var o=M[s];if(!o)return;if(ob.checked)o.m.addLayer(o.out);else o.m.removeLayer(o.out);});});}
start();
})();
(function(){var d=document,m=d.getElementById("changelog");if(!m)return;
function op(e){if(e)e.preventDefault();if(m.showModal){if(!m.open)m.showModal();}else m.setAttribute("open","");}
function cl(){if(m.close)m.close();else m.removeAttribute("open");}
Array.prototype.forEach.call(d.querySelectorAll("[data-ch3-info]"),function(b){b.addEventListener("click",op);});
Array.prototype.forEach.call(d.querySelectorAll("[data-ch3-close]"),function(b){b.addEventListener("click",cl);});
m.addEventListener("click",function(e){if(e.target===m)cl();});
if(location.hash==="#changelog")op();})();
