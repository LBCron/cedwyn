/* cw-header.js 1.0.0 — Cedwyn webapp standard header (contract cedwyn-header/1).
   Same header on every webapp: site name, the app's title, "N of 59", Back / Next in the one tour order (/areas.json "nav").
   <header data-cw-app="wayback"></header> ; nav comes from /areas.json (static), links point at the live addresses. */
(function(){
  var W = window.CW = window.CW || {};
  var LIVE = 'https://cedwyn.bucklerfamily.estate';
  var L = {en:{of:'of', back:'Back', next:'Next', home:'Cedwyn'}, cy:{of:'o', back:'Yn ôl', next:'Nesaf', home:'Cedwyn'}, es:{of:'de', back:'Atrás', next:'Siguiente', home:'Cedwyn'}};
  function lang(){ var q = (location.search.match(/[?&]lang=(en|cy|es)/)||[])[1]; if(q) return q; var n = (navigator.language||'en').slice(0,2); return L[n] ? n : 'en'; }
  function el(t, a, kids){ var e = document.createElement(t); for(var k in (a||{})) e.setAttribute(k, a[k]); (kids||[]).forEach(function(c){ e.appendChild(typeof c==='string'?document.createTextNode(c):c); }); return e; }
  W.header = function(host){
    host = host || document.querySelector('header[data-cw-app]'); if(!host) return;
    var app = host.getAttribute('data-cw-app'), lg = lang(), t = L[lg] || L.en;
    var navUrl = host.getAttribute('data-cw-nav') || '/areas.json';
    return fetch(navUrl).then(function(r){ return r.json(); }).then(function(a){
      var nav = (a.nav || []).slice().sort(function(x,y){ return x.slot - y.slot; });
      var i = -1; nav.forEach(function(n, j){ if(n.id === app) i = j; });
      var me = nav[i] || {title: app, slot: '?'}, prev = nav[(i - 1 + nav.length) % nav.length], next = nav[(i + 1) % nav.length];
      var title = (lg !== 'en' && me[lg]) || me.title;
      host.className = 'cw-header'; host.innerHTML = '';
      host.appendChild(el('a', {href: LIVE + '/', 'class':'cw-home'}, [t.home]));
      host.appendChild(el('span', {'class':'cw-title'}, [title]));
      host.appendChild(el('span', {'class':'cw-count'}, [me.slot + ' ' + t.of + ' ' + (me.of || 59)]));
      var nv = el('nav', {'class':'cw-prevnext','aria-label':'tour'});
      if(prev) nv.appendChild(el('a', {href: LIVE + prev.path, rel:'prev', title: prev.title}, ['‹ ' + t.back]));
      if(next) nv.appendChild(el('a', {href: LIVE + next.path, rel:'next', title: next.title}, [t.next + ' ›']));
      host.appendChild(nv);
      document.documentElement.lang = lg;
      return me;
    }).catch(function(){ host.className = 'cw-header'; host.textContent = 'Cedwyn'; });
  };
  document.addEventListener('DOMContentLoaded', function(){ W.header(); });
})();
