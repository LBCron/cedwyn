/* clamp.js v4 - shared loader for the animated nested reading-level interface. It is injected on human-facing pages
   across all Cedwyn themes and webapps. The reader is in cw-graph.js; interactive control surfaces and explicit
   data-cw-nolevels opt-outs are preserved. - Cedwyn editors */
(function () {
  if (window.__cwClamp >= 4) return; window.__cwClamp = 4;
  if (window.__cwGraph || document.querySelector('script[src*="/_cedwyn/cw-graph.js"]')) return;
  var s = document.createElement('script'); s.src = '/_cedwyn/cw-graph.js?v=1.3.2'; s.defer = true;
  (document.head || document.documentElement).appendChild(s);
})();
