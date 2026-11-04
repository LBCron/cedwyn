/* Garden Gallery front end: layout only. Every word and every artwork comes from the Cedwyn catalogue database
   (table section_records, theme 'nft-art'), read in the browser through /_cedwyn/cat.js. */
(function () {
  if (window.self !== window.top) {
    document.documentElement.classList.add('gg-framed');
    // ghf-boot intentionally omits bars and theme in frames. Use the same theme
    // engine here, without bars, and follow the containing website's live mode.
    var themeCss = document.createElement('link'); themeCss.rel = 'stylesheet';
    themeCss.href = '/_cedwyn/ghf/ghf-theme.css?v=2.1.23'; themeCss.setAttribute('data-ghf-theme', '');
    document.head.appendChild(themeCss);
    function syncTheme() {
      if (!window.GHFTheme) return;
      var mode;
      try { mode = window.parent.document.documentElement.getAttribute('data-ghf-mode'); } catch (e) {}
      window.GHFTheme.apply(mode === 'day' || mode === 'night' ? mode : window.GHFTheme.mode());
    }
    var themeScript = document.createElement('script'); themeScript.src = '/_cedwyn/ghf/basecamp.js?v=2.1.23';
    themeScript.onload = syncTheme; document.head.appendChild(themeScript);
    try {
      window.parent.document.addEventListener('ghf-theme-change', syncTheme);
      window.addEventListener('pagehide', function () { window.parent.document.removeEventListener('ghf-theme-change', syncTheme); }, { once: true });
    } catch (e) {}
    document.addEventListener('DOMContentLoaded', syncTheme);
  }
  var galleryOnly = document.body.dataset.galleryMode === 'garden'; var T = {}, A = [], $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fill(s, o) { return String(s || '').replace(/\{(\w+)\}/g, function (_, k) { return o[k] != null ? o[k] : ''; }); }
  function words() { document.querySelectorAll('[data-t]').forEach(function (el) { el.textContent = T[el.getAttribute('data-t')] || ''; }); if (T.page_title) document.title = T.page_title; }
  function edition(a) { return a.edition === 1 ? T.one_of_one : fill(T.limited, { n: a.edition }); }
  /* Whole-release versions (Sion 05:13 GMT 27 Oct 2026): every piece starts at v0.0.1, which is free; no sales yet ("Coming soon"). - Cedwyn editors */
  function ver(a) { return a.version || 'v0.0.1'; }
  /* Version standard (docs/VERSION-STANDARD.md §1-§3, 1 Nov 2026): v0.0.1 is always free; only the latest price is stored
     (a.price_pence) and each earlier version is £4.99 less per step back, floor £0; no stored price = free. The (i) beside the
     drop-down opens a table of the versions, newest first: Version · Date · What changed · Size · Price (1.3.4). - Cedwyn editors */
  function vprice(a, list, v) {
    var i = list.indexOf(v), p = (list.length > 1 && a.price_pence) ? a.price_pence - 499 * i : 0;
    return (v === 'v0.0.1' || p <= 0) ? 0 : p;
  }
  function money(p) { return p ? '£' + (p / 100).toFixed(2) : (T.free || 'free'); }
  function vrow(a, list, v) {
    var o = (a.versions || []).filter(function (x) { return x && typeof x === 'object' && (x.v || x.version) === v; })[0] || {};
    var first = v === 'v0.0.1', latest = v === list[0];
    var date = o.date || (first ? a.issued : (latest ? (a.reworked || a.issued) : '')) || '';
    var change = o.change || (first ? (T.first_release || 'First release') + (a.v001_title && a.v001_title !== a.title ? ', \u201c' + a.v001_title + '\u201d' : '')
      : (T.reworked || 'Reworked') + (a.v001_title && a.v001_title !== a.title ? ', now \u201c' + a.title + '\u201d' : ''));
    var size = String(o.master_px || (latest ? a.master_px : '') || '\u2014').replace('x', '\u00d7');
    return '<tr><td>' + esc(v) + '</td><td>' + esc(date) + '</td><td>' + esc(change) + '</td><td>' + esc(size) + '</td><td>' + esc(money(vprice(a, list, v))) + '</td></tr>';
  }
  function vtable(a, list) {
    return '<dialog class="gg-vt" id="gg-vt" aria-labelledby="gg-vth"><button type="button" class="gg-vx" aria-label="' + esc(T.close || 'Close') + '">\u00d7</button>' +
      '<h3 id="gg-vth">' + esc(T.versions_title || 'Versions') + '</h3><table><thead><tr><th>' + esc(T.v_version || 'Version') + '</th><th>' + esc(T.v_date || 'Date') +
      '</th><th>' + esc(T.v_change || 'What changed') + '</th><th>' + esc(T.v_size || 'Size') + '</th><th>' + esc(T.v_price || 'Price') + '</th></tr></thead><tbody>' +
      list.map(function (v) { return vrow(a, list, v); }).join('') + '</tbody></table></dialog>';
  }
  /* Every download offers a "Select a version" drop-down listing the versions that exist for the piece, newest first and selected; Save as PNG saves the selected one (30 Oct 2026). - Cedwyn editors */
  function vers(a) { var v = (a.versions || []).map(function (o) { return typeof o === 'string' ? o : (o && (o.v || o.version)); }).filter(Boolean); if (v.indexOf(ver(a)) < 0) v.push(ver(a)); v = v.filter(function (x, i) { return v.indexOf(x) === i; }); return v.sort(function (x, y) { var p = x.match(/\d+/g).map(Number), q = y.match(/\d+/g).map(Number); for (var k = 0; k < 3; k++) if ((q[k] || 0) !== (p[k] || 0)) return (q[k] || 0) - (p[k] || 0); return 0; }); }
  function sub(a) { return esc(a.id) + ' · ' + esc(ver(a)); }
  function slug(a) { return (a.id + '-' + String(a.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')).slice(0, 80); }
  function savePng(a, btn) {
    var im = new Image(); im.crossOrigin = 'anonymous';
    var old = btn.textContent; btn.textContent = 'Saving…'; btn.disabled = true;
    im.onload = function () {
      var c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight; c.getContext('2d').drawImage(im, 0, 0);
      c.toBlob(function (b) {
        btn.textContent = old; btn.disabled = false; if (!b) return;
        var u = URL.createObjectURL(b), l = document.createElement('a'); l.href = u; l.download = slug(a) + '-' + ver(a) + '.png';
        document.body.appendChild(l); l.click(); l.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 60000);
      }, 'image/png');
    };
    im.onerror = function () { btn.textContent = old; btn.disabled = false; window.open(a.image, '_blank'); };
    im.src = a.image;
  }
  function card(a, i) {
    return '<a class="gg-c" style="animation-delay:' + (Math.min(i, 12) * 70) + 'ms" href="#/' + esc(a.id) + '"><img loading="lazy" src="' + esc(a.thumb) + '" alt="' + esc(a.alt) + '"><span class="gg-ct"><b>' + esc(a.title) + '</b><small>' + sub(a) + '</small></span></a>';
  }
  function grid() { $('gg-grid').innerHTML = A.map(card).join(''); }
  function detail(id) {
    var i = A.findIndex(function (a) { return a.id === id; }), a = A[i], d = $('gg-d');
    if (!a) { show(false); return; }
    var prev = A[(i + A.length - 1) % A.length], next = A[(i + 1) % A.length];
    d.innerHTML = '<a class="gg-back" href="#/">← ' + esc(T.back) + '</a>' +
      '<div class="gg-stage"><figure><img src="' + esc(a.image) + '" alt="' + esc(a.alt) + '"></figure>' +
      '<a class="gg-arr gg-prev" href="#/' + esc(prev.id) + '" aria-label="Previous: ' + esc(prev.title) + '">&#8249;</a>' +
      '<a class="gg-arr gg-next" href="#/' + esc(next.id) + '" aria-label="Next: ' + esc(next.title) + '">&#8250;</a></div>' +
      '<h2>' + esc(a.title) + '</h2><p class="gg-cap">' + esc(a.caption) + '</p>' +
      '<dl class="gg-meta"><dt>' + esc(T.catalogue_label) + '</dt><dd>' + esc(a.id) + '</dd>' +
      (a.edition ? '<dt>' + esc(T.edition_label) + '</dt><dd>' + esc(edition(a)) + '</dd>' : '') +
      '<dt>' + esc(T.medium_label) + '</dt><dd>' + esc(a.medium || T.medium) + '</dd>' +
      (a.source_id ? '<dt>' + esc(T.source_label) + '</dt><dd>' + esc(a.source_id) + '</dd>' : '') + '</dl>' +
      (false ? '<div class="gg-src"><img loading="lazy" src="' + esc(a.src) + '" alt=""><span>' + esc(T.grown_from) + ' ' + esc(a.source_title) + '</span></div>' : '') +
      '<div class="gg-buy gg-sv"><label class="gg-svl" for="gg-sv">' + esc(T.select_version || 'Select a version') + '</label>' +
      '<div class="gg-svr"><select class="gg-sel" id="gg-sv" autocomplete="off">' + vers(a).map(function (v, k, l) { return '<option value="' + esc(v) + '"' + (k ? '' : ' selected') + '>' + esc(v) + ' — ' + esc(money(vprice(a, l, v))) + '</option>'; }).join('') + '</select>' +
      '<button type="button" class="gg-vi" aria-haspopup="dialog" aria-controls="gg-vt" aria-label="' + esc(T.versions_info || 'Version table') + '">i</button></div>' + vtable(a, vers(a)) +
      '<div class="gg-acts"><button type="button" class="gg-btn gg-soon" disabled aria-disabled="true">' + esc(T.coming_soon || 'Coming soon') + '</button>' +
      '<button type="button" class="gg-btn gg-png" aria-label="' + esc((T.save_png || 'Save as PNG') + ' (selected version)') + '">' + esc(T.save_png || 'Save as PNG') + '</button></div>' +
      '<a class="gg-free" href="' + esc(a.image) + '" data-png="1">free version (' + esc(ver(a)) + ' 2026)</a></div>';
    if (galleryOnly) { var buy = d.querySelector('.gg-buy'); if (buy) buy.remove(); }
    var pb = d.querySelector('.gg-png'), fl = d.querySelector('.gg-free');
    var sel = d.querySelector('.gg-sel'), fig = d.querySelector('figure img');
    /* A reworked piece keeps its first release as a.v001_image; the drop-down shows the chosen version (flower rework 27 Oct 2026). - Cedwyn editors */
    function pick(v) { var o = (a.versions || []).filter(function (x) { return x && typeof x === 'object' && (x.v || x.version) === v && x.image; })[0]; if (o) return Object.assign({}, a, { image: o.image, version: v }); return (v === 'v0.0.1' && a.v001_image) ? Object.assign({}, a, { image: a.v001_image, version: 'v0.0.1' }) : a; }
    var vi = d.querySelector('.gg-vi'), vt = d.querySelector('.gg-vt');
    function vclose() { if (!vt) return; if (vt.close && vt.open) vt.close(); vt.removeAttribute('open'); if (vi) vi.focus(); }
    if (vi && vt) {
      vi.addEventListener('click', function () { if (vt.showModal) vt.showModal(); else vt.setAttribute('open', ''); var x = vt.querySelector('.gg-vx'); if (x) x.focus(); });
      vt.querySelector('.gg-vx').addEventListener('click', vclose);
      vt.addEventListener('cancel', function (ev) { ev.preventDefault(); vclose(); });
      vt.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') { ev.preventDefault(); vclose(); } });
      vt.addEventListener('click', function (ev) { if (ev.target === vt) vclose(); });
    }
    if (sel && fig) sel.addEventListener('change', function () { fig.src = pick(sel.value).image; });
    if (pb) pb.addEventListener('click', function () { savePng(pick(sel ? sel.value : ver(a)), pb); });
    if (fl) fl.addEventListener('click', function (ev) { if (ev.button || ev.metaKey || ev.ctrlKey) return; ev.preventDefault(); savePng(pick(ver(a)), pb || fl); });
    show(true); window.scrollTo(0, 0);
    document.title = a.title + ' · ' + (T.title || '');
  }
  function show(det) { $('gg-grid').hidden = det; $('gg-d').hidden = !det; document.querySelector('.gg-h').hidden = det; if (!det) words(); }
  function route() { var h = location.hash.replace(/^#\/?/, ''); if (h) detail(decodeURIComponent(h)); else show(false); }
  T = {title: galleryOnly ? 'The Flower Garden' : 'NFT Flower Gallery', page_title: galleryOnly ? 'The Flower Garden · Cedwyn' : 'NFT Flower Gallery · Cedwyn', kicker: galleryOnly ? 'GARDEN GALLERY' : 'ARCADE · DIGITAL EDITIONS', back:'All flowers', one_of_one:'One of one', limited:'Edition of {n}', catalogue_label:'Catalogue', edition_label:'Edition', medium_label:'Medium', medium:'AI garden artwork', source_label:'Source reference', select_version:'Select a version', free:'free', coming_soon:'Coming soon', save_png:'Save as PNG', versions_title:'Versions', v_version:'Version', v_date:'Date', v_change:'What changed', v_size:'Size', v_price:'Price', first_release:'Flower garden edition', close:'Close', versions_info:'Version table'};
  var timer = setTimeout(function(){ $('gg-wait').innerHTML = 'The gallery is taking longer than expected. <button type="button" onclick="location.reload()">Try again</button>'; }, 15000);
  fetch('/_cedwyn/flower-gallery/artworks.json').then(function(r){if(!r.ok)throw new Error('Gallery unavailable');return r.json();}).then(function(data){
    A = data.artworks; words(); grid(); route(); window.addEventListener('hashchange',route); return Promise.all([].slice.call(document.querySelectorAll('.gg-c img'),0,4).map(function(im){return im.decode ? im.decode().catch(function(){}) : Promise.resolve();})).then(function(){clearTimeout(timer);$('gg-wait').hidden=true;$('gg').setAttribute('aria-busy','false');});
  }).catch(function(){clearTimeout(timer);$('gg-wait').innerHTML='The gallery could not load. <button type="button" onclick="location.reload()">Try again</button>';});
})();
