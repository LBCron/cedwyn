/* Landing place modals: one map block (2D / 3D toggle) drawn inside the modal, above the place's own webapp tiles.
   2.0.0 (3 Nov 2026, owner WhatsApp 18:52 GMT): the Wales and Patagonia modals show only their own webapps plus a 2D/3D map inside the
   modal; Online shows webapps only. 2D: Wales = Tithe H3 (/tithe-h3/), Patagonia = Chubut H3 (/chubut-h3/). 3D: the estate scene with
   voice (/terrain/, "Start call" then speak) in both. Each map is framed bare: runtime.js 17 hides every piece of site chrome in a frame,
   so the map shows once, with no second header. A tapped webapp tile leaves the modal and opens at its own address in the top window.
   Replaces 1.0.0 (Tiles / 2D Map / 3D Map tabs that repeated every tile, a parcel-shape sketch and a framed full page). - Sion's Tab agent */
(function () {
  "use strict";
  var MAPS = {
    wales: { map2d: "/tithe-h3/", map3d: "/terrain/" },
    argentina: { map2d: "/chubut-h3/", map3d: "/terrain/" }
  };
  var COPY = {
    en: { map2d: "2D map", map3d: "3D map", open: "Open full screen", group: "Map view",
          t2wales: "Tithe H3 map of the estate fields", t2argentina: "Chubut H3 map: the estate outline at the same distance from the sea",
          t3: "The estate in 3D with voice", hint3: "Tap “Start call”, then speak." },
    cy: { map2d: "Map 2D", map3d: "Map 3D", open: "Agor ar y sgrin lawn", group: "Golwg map",
          t2wales: "Map H3 y degwm o gaeau’r ystâd", t2argentina: "Map H3 Chubut: amlinell yr ystâd yr un pellter o’r môr",
          t3: "Yr ystâd mewn 3D gyda llais", hint3: "Tapiwch “Start call”, yna siaradwch." },
    es: { map2d: "Mapa 2D", map3d: "Mapa 3D", open: "Abrir en pantalla completa", group: "Vista del mapa",
          t2wales: "Mapa H3 del diezmo de los campos de la finca", t2argentina: "Mapa H3 de Chubut: el contorno de la finca a la misma distancia del mar",
          t3: "La finca en 3D con voz", hint3: "Toque “Start call” y hable." }
  };
  var initialized = false;
  function lang() {
    var value = document.documentElement.getAttribute("lang") || window.__cedwynLang || "en";
    value = String(value).slice(0, 2).toLowerCase();
    return COPY[value] ? value : "en";
  }
  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }
  function addStyle() {
    if (document.getElementById("cedwyn-landing-map-views-style")) return;
    var style = el("style"); style.id = "cedwyn-landing-map-views-style";
    style.textContent =
      ".cwv-map{margin:0 0 16px}.cwv-toggle{display:flex;gap:6px;margin:0 0 8px}" +
      ".cwv-toggle button{flex:1;min-height:42px;padding:8px 10px;border:1px solid rgba(255,255,255,.24);border-radius:999px;background:#121a23;color:#f3f5f7;font:600 13px/1.2 Barlow,system-ui,sans-serif;cursor:pointer}" +
      ".cwv-toggle button[aria-pressed=true]{background:#f3f5f7;color:#101820;border-color:#f3f5f7}" +
      ".cwv-pane[hidden]{display:none!important}.cwv-frame{display:block;width:100%;height:min(60vh,620px);min-height:320px;border:1px solid rgba(255,255,255,.18);border-radius:11px;background:#0b1114}" +
      ".cwv-bar{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px 10px;margin:6px 2px 0;color:#c3cec7;font:500 12px/1.4 system-ui,sans-serif}" +
      ".cwv-open{display:inline-flex;padding:8px 12px;border:1px solid rgba(255,255,255,.3);border-radius:999px;color:#fff;text-decoration:none;font:600 12px/1.2 system-ui,sans-serif}" +
      "@media(max-width:680px){.cwv-frame{height:52vh;min-height:300px}}";
    document.head.appendChild(style);
  }
  function words() { return COPY[lang()]; }
  function relabel(block, region) {
    var w = words();
    Array.prototype.forEach.call(block.querySelectorAll("[data-cwv]"), function (node) {
      var key = node.getAttribute("data-cwv");
      if (key === "t2") key = "t2" + region;
      if (w[key]) node.textContent = w[key];
    });
    Array.prototype.forEach.call(block.querySelectorAll("iframe[data-cwv-title]"), function (frame) {
      var key = frame.getAttribute("data-cwv-title"); if (key === "t2") key = "t2" + region;
      frame.setAttribute("title", w[key] || "");
    });
    block.setAttribute("aria-label", w.group);
  }
  function pane(mode, region) {
    var path = MAPS[region][mode], box = el("div", "cwv-pane"); box.setAttribute("data-mode", mode);
    var frame = el("iframe", "cwv-frame");
    frame.setAttribute("data-src", path); frame.setAttribute("data-cwv-title", mode === "map2d" ? "t2" : "t3");
    frame.setAttribute("loading", "lazy"); frame.setAttribute("referrerpolicy", "same-origin");
    frame.setAttribute("allow", "microphone; autoplay; fullscreen; xr-spatial-tracking");
    frame.setAttribute("allowfullscreen", "");
    box.appendChild(frame);
    var bar = el("div", "cwv-bar");
    var caption = el("span", "cwv-cap"); caption.setAttribute("data-cwv", mode === "map2d" ? "t2" : "hint3"); bar.appendChild(caption);
    var open = el("a", "cwv-open"); open.href = path; open.target = "_top"; open.setAttribute("data-cwv", "open"); bar.appendChild(open);
    box.appendChild(bar);
    return box;
  }
  function load(box) {
    var frame = box.querySelector("iframe[data-src]");
    if (frame && !frame.getAttribute("src")) frame.setAttribute("src", frame.getAttribute("data-src"));
  }
  function show(block, mode) {
    Array.prototype.forEach.call(block.querySelectorAll(".cwv-toggle button"), function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-mode") === mode ? "true" : "false");
    });
    Array.prototype.forEach.call(block.querySelectorAll(".cwv-pane"), function (p) {
      var on = p.getAttribute("data-mode") === mode; p.hidden = !on; if (on) load(p);
    });
  }
  function mapBlock(region) {
    var block = el("section", "cwv-map"); block.setAttribute("role", "group");
    var toggle = el("div", "cwv-toggle");
    ["map2d", "map3d"].forEach(function (mode, i) {
      var b = el("button"); b.type = "button"; b.setAttribute("data-mode", mode); b.setAttribute("data-cwv", mode);
      b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      b.addEventListener("click", function () { show(block, mode); });
      toggle.appendChild(b);
    });
    block.appendChild(toggle);
    var p2 = pane("map2d", region), p3 = pane("map3d", region); p3.hidden = true;
    block.appendChild(p2); block.appendChild(p3);
    relabel(block, region);
    return block;
  }
  function breakOut(dialog) {
    // A webapp tile leaves the modal: top-level navigation to the tile's own address, never inside the modal or a frame.
    Array.prototype.forEach.call(dialog.querySelectorAll("a.land-app[href]"), function (a) {
      a.setAttribute("target", "_top");
      a.addEventListener("click", function (event) {
        if (event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        try { if (typeof dialog.close === "function") dialog.close(); } catch (e) {}
        try { window.top.location.assign(a.href); } catch (e) { location.assign(a.href); }
      });
    });
  }
  function enhance(dialog) {
    if (dialog.getAttribute("data-cwv-ready") === "true") return;
    var content = dialog.querySelector(".land-modal-content");
    if (!content) return;
    dialog.setAttribute("data-cwv-ready", "true");
    breakOut(dialog);
    var region = dialog.id === "modal-wales" ? "wales" : dialog.id === "modal-argentina" ? "argentina" : "";
    if (!region) return;   // Online: webapps only
    var block = mapBlock(region);
    content.insertBefore(block, content.firstChild);
    function opened() { if (dialog.hasAttribute("open")) { var p = block.querySelector(".cwv-pane:not([hidden])"); if (p) load(p); } }
    if (window.MutationObserver) new MutationObserver(opened).observe(dialog, { attributes: true, attributeFilter: ["open"] });
    opened();
    document.addEventListener("ghf-lang-change", function () { relabel(block, region); });
  }
  function init() {
    if (initialized || !document.body || document.body.getAttribute("data-cedwyn-page") !== "landing") return;
    initialized = true; addStyle();
    Array.prototype.forEach.call(document.querySelectorAll(".land-modal"), enhance);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
