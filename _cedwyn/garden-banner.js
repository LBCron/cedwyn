/*! garden-banner.js — the one shared Garden banner in the header strip of every Cedwyn webapp · v2.3.0 (2 Nov 2026) · Cedwyn editors
 * 00:48 GMT 2 Nov 2026: the cross-promo chrome (graph promo strip, section ribbon chips, coming-soon teasers, e-book strips,
 * the "Outside records" popup) is gone. 03:25 GMT 2 Nov 2026: in its place this one banner promotes the flowers and plants
 * of Garden City Cymru (gardencity.cymru) on every webapp. It takes over the header's slim strip (.ghf-v2-up, basecamp.js), so it
 * never covers content and the header with its burger menu and "N of 59" number stays exactly as it is. Webapps that hid that
 * strip to drop the old promo get it back for the banner only. A × closes it for 30 days (this browser only).
 * 2.1.0 (owner, 03:45 GMT 2 Nov 2026): one consistent banner on every webapp, the Argentina scope included (/argentina/, /patagonia/,
 * html[data-cedwyn-scope=argentina]); there it carries no prices or money words and only Garden City's own product photos, never farm
 * flower or NFT images. Off on machine-facing pages (/academy/, /agents/, /hive/), /garden/, /garden-store/ and framed pages. Spec: docs/GARDEN-BANNER.md
 * 2.2.0 (owner, 06:13 GMT 2 Nov 2026): the banner opens our own Garden Store webapp (https://bucklerfamily.estate/garden-store/), which
 * mirrors the Garden City catalogue and sends each purchase to gardencity.cymru. Also hides and removes any section ribbon (.cedwyn-rib)
 * drawn by a section.js a browser still holds from before 2 Nov.
 * 2.3.0 (owner, 10:06 GMT 2 Nov 2026): titled "Order the Garden's surviving flowers", with one provenance line (the only place it appears
 * on the banner); the old all-caps store label is no longer used as a store name or label; no scrolling or moving text (the product strip and its drift are
 * gone); twice the height (68 px instead of 34 px) on phone and desktop; the whole background is a Garden Gallery (NFT) painting,
 * NFA-0054 "Behind the Dry-Stone Wall" (a field of foxgloves), cover-fit under a dark overlay. Argentina scope keeps its 2.1.0 rule:
 * there the background is a Garden City product photo (a hydrangea), never farm or NFT art. */
(function () {
  'use strict';
  if (window.CedwynGardenBanner) return;
  var d = document, de = d.documentElement, VER = '2.3.0', STORE = 'https://bucklerfamily.estate/garden-store/', XK = 'cw_gdn_x', XDAYS = 30;
  window.CedwynGardenBanner = { v: VER };
  var BG = '/_cedwyn/garden-banner/bg-nfa-0054.webp?v=' + VER, BGA = '/_cedwyn/garden-banner/bg-gc-hydrangea.webp?v=' + VER;
  var T = {
    en: { t: 'Order the Garden\u2019s surviving flowers', s: 'These flowers are grown by Mary Buckler II, granddaughter of Mary Williams of Great House Farm, Llandough \u2014 the Williams matriarchy estate and realm.', cta: 'Visit', x: 'Close the Garden banner' },
    cy: { t: 'Archebwch flodau\u2019r Ardd a oroesodd', s: 'Mae\u2019r blodau hyn yn cael eu tyfu gan Mary Buckler II, wyres Mary Williams o Fferm T\u0177 Mawr (Great House Farm), Llandochau \u2014 yst\u00e2d a theyrnas matriarchaeth y Williams.', cta: 'Ymweld', x: 'Cau baner yr Ardd' },
    es: { t: 'Encargue las flores supervivientes del Jard\u00edn', s: 'Estas flores las cultiva Mary Buckler II, nieta de Mary Williams de Great House Farm, Llandough: la finca y el reino del matriarcado Williams.', cta: 'Visitar', x: 'Cerrar el banner del Jard\u00edn' }
  };
  function lg() { var l = ''; try { l = window.__cedwynLang || localStorage.getItem('ghf_lang') || ''; } catch (e) {} l = (l || de.getAttribute('lang') || 'en').slice(0, 2).toLowerCase(); return T[l] ? l : 'en'; }
  function path() { return (window.__cedwynLP || location.pathname || '/').toLowerCase(); }
  function off() {
    var p = path();
    if (/^\/((wales|argentina)\/)?(garden|garden-store|academy|agents|hive)(\/|$)/.test(p)) return true;
    if (window.self !== window.top) return true;
    try { var x = +localStorage.getItem(XK) || 0; if (x && Date.now() - x < XDAYS * 864e5) return true; } catch (e) {}
    return false;
  }
  function arg() {   // Argentina scope (2.1.0): no money words, no farm or NFT art
    var p = path(), sc = de.getAttribute('data-cedwyn-scope') || '', sec = de.getAttribute('data-cedwyn-sec') || '';
    return sc === 'argentina' || sec === 'argentina' || /^\/(argentina|patagonia)(\/|$)/.test(p) || /^\/(wales|argentina)\/patagonia(\/|$)/.test(p);
  }
  function mk(tag, cls, txt) { var e = d.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  var H = 68;   // 2.3.0: twice the old 34 px strip
  var CSS =
    '.ghf-v2-up.cw-gdn-on{padding:0!important;height:' + H + 'px!important;min-height:' + H + 'px!important;max-height:' + H + 'px!important;background:#10180f!important;overflow:hidden!important}' +
    '.cw-gdn{position:relative;display:flex;align-items:center;width:100%;min-width:0;height:' + H + 'px;font:13px/1.2 Barlow,system-ui,-apple-system,Segoe UI,sans-serif;color:#fff;' +
      'background-color:#10180f;background-repeat:no-repeat;background-size:cover;background-position:center 45%}' +
    '.cw-gdn::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.74) 0%,rgba(0,0,0,.55) 55%,rgba(0,0,0,.38) 100%);pointer-events:none}' +
    '.cw-gdn>*{position:relative}' +
    '.cw-gdn a{color:#fff!important;text-decoration:none!important}' +
    '.cw-gdn-l{flex:1 1 auto;min-width:0;height:100%;display:flex;flex-direction:column;justify-content:center;gap:3px;padding:0 6px 0 12px;overflow:hidden}' +
    '.cw-gdn-t{display:block;font-weight:700;font-size:16px;line-height:1.15;letter-spacing:.01em;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:0 1px 2px rgba(0,0,0,.6)}' +
    '.cw-gdn-s{display:block;font-size:12px;line-height:1.25;color:rgba(255,255,255,.92);overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;text-shadow:0 1px 2px rgba(0,0,0,.6)}' +
    '.cw-gdn-c{flex:0 0 auto;align-self:center;display:flex;align-items:center;height:32px;margin:0 2px 0 6px;padding:0 12px;border:1px solid rgba(255,255,255,.75);border-radius:999px;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;background:rgba(0,0,0,.25)}' +
    '.cw-gdn-x{flex:0 0 auto;width:36px;height:' + H + 'px;display:flex;align-items:center;justify-content:center;border:0;background:none;color:#fff;font:20px/1 system-ui,sans-serif;opacity:.8;cursor:pointer;padding:0}' +
    '.cw-gdn-x:hover,.cw-gdn-x:focus-visible{opacity:1}' +
    '.cw-gdn a:focus-visible,.cw-gdn-x:focus-visible{outline:2px solid #fff;outline-offset:-3px}' +
    '@media (max-width:560px){.cw-gdn-l{padding-left:10px;gap:2px}.cw-gdn-t{font-size:14px}.cw-gdn-s{font-size:10.5px;line-height:1.2;-webkit-line-clamp:3}.cw-gdn-c{padding:0;width:28px;justify-content:center;border:0;background:none;font-size:22px;letter-spacing:0}.cw-gdn-c span{display:none}.cw-gdn-x{width:30px}}';
  var slot = null;
  function css() { if (d.getElementById('cw-gdn-css')) return; var s = mk('style'); s.id = 'cw-gdn-css'; s.textContent = CSS; (d.head || de).appendChild(s); }
  function ext(a, href) { a.setAttributeNS(null, 'href', href); }   // our own Garden Store, same tab. setAttributeNS keeps the address as
  // written: runtime.js's theme-link fixer (setAttribute/href hooks) would map the apex address onto an old apex theme folder
  function hide(up) { up.style.setProperty('display', 'none', 'important'); up.setAttribute('aria-hidden', 'true'); try { window.dispatchEvent(new Event('resize')); } catch (e) {} }
  function fill(up) {
    if (!up || up.querySelector('.cw-gdn')) return;
    if (off()) { up.textContent = ''; hide(up); return; }
    css();
    var tt = T[lg()], w = mk('div', 'cw-gdn'), l = mk('a', 'cw-gdn-l'), c = mk('a', 'cw-gdn-c'), x = mk('button', 'cw-gdn-x', '\u00d7');
    w.style.backgroundImage = 'url(' + (arg() ? BGA : BG) + ')';
    ext(l, STORE); l.appendChild(mk('span', 'cw-gdn-t', tt.t)); l.appendChild(mk('span', 'cw-gdn-s', tt.s)); l.setAttribute('aria-label', tt.t + '. ' + tt.s);
    ext(c, STORE); c.appendChild(mk('span', null, tt.cta)); c.appendChild(d.createTextNode(' \u203a')); c.setAttribute('aria-label', tt.cta + ': ' + tt.t);
    x.type = 'button'; x.setAttribute('aria-label', tt.x); x.title = tt.x;
    x.addEventListener('click', function (e) { e.preventDefault(); try { localStorage.setItem(XK, String(Date.now())); } catch (er) {} up.textContent = ''; up.classList.remove('cw-gdn-on'); hide(up); });
    w.appendChild(l); w.appendChild(c); w.appendChild(x);
    up.textContent = ''; up.appendChild(w); up.classList.add('cw-gdn-on'); up.setAttribute('aria-label', tt.t); up.removeAttribute('aria-hidden');
    up.style.setProperty('display', 'flex', 'important');   // also on webapps whose own CSS hid this strip to drop the old promo
    try { window.dispatchEvent(new Event('resize')); } catch (e) {}
  }
  function watch() {
    var n = 0, iv = setInterval(function () {
      var up = d.querySelector('.ghf-v2-up');
      if (up) { clearInterval(iv); slot = up; fill(up); new MutationObserver(function () { if (!up.querySelector('.cw-gdn') && !off()) fill(up); }).observe(up, { childList: true }); }
      else if (++n > 100) clearInterval(iv);
    }, 100);
  }
  // Banner links open the Garden Store as written: a page's capture-phase link guard (runtime.js) is not reached for them.
  window.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('.cw-gdn a[href]') : null;
    if (!a || a.href.indexOf(STORE) !== 0) return;
    e.stopPropagation();
  }, true);
  d.addEventListener('ghf-lang-change', function () { if (slot) { var w = slot.querySelector('.cw-gdn'); if (w) { slot.removeChild(w); } fill(slot); } });
  // 2.2.0: the section ribbon is retired (section.js 1.3.0 draws none); a section.js a browser still holds from before 2 Nov could
  // draw it again, so it is hidden by CSS at once and removed from the page.
  (function rib() {
    if (!d.getElementById('cw-gdn-rib')) { var s = mk('style'); s.id = 'cw-gdn-rib'; s.textContent = '.cedwyn-rib{display:none!important}'; (d.head || de).appendChild(s); }
    var n = 0, iv = setInterval(function () { var r = d.querySelectorAll('.cedwyn-rib'); for (var i = 0; i < r.length; i++) r[i].parentNode && r[i].parentNode.removeChild(r[i]); if (++n > 40) clearInterval(iv); }, 250);
  })();
  watch();
})();
