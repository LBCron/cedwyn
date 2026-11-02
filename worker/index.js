// cedwyn-garden-store — REALM · Garden Store (webapp 46 of 59): our own plant store mirroring Garden City's catalogue
// (gardencity.cymru). Every "Buy" opens HER product page in a new tab; she sells, takes payment and delivers. We never take payment.
// Served at https://bucklerfamily.estate/garden-store/ (apex router -> cedwyn.bucklerfamily.estate/garden-store* -> this Worker).
// Own database: SQLite-backed Durable Object GardenDB (catalogue rows + guest book), refreshed from her public /products.json
// every 6 h by a DO alarm, seeded from the branch snapshot (catalogue.js). Images are shown from her own Shopify CDN (hotlinked).
// Source: unclehowell/cedwyn branch section/garden-store. — Sion's Tab agent
import SEED from './catalogue.js';
import META from './meta.js';
const VERSION = META.version;
const SHOP = 'https://gardencity.cymru';
const UTM = 'utm_source=bucklerfamily&utm_medium=garden-store';
const BASE = '/garden-store';
const SLOT = 46, OF = 59;
const REFRESH_MS = 6 * 3600 * 1000;

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const gbp = p => '£' + Number(p || 0).toFixed(2);
const buyUrl = (h, vid) => SHOP + '/products/' + encodeURIComponent(h) + '?' + UTM + (vid ? '&variant=' + vid : '');
const img = (u, w) => u ? u + (u.includes('?') ? '&' : '?') + 'width=' + w : '';
const PLANT = /plant|shrub|grass|flower|bulb|tree|perennial|herb|fern|climber|hedg|lily|lilies|rose|fruit|seed|succulent|cact|palm|bamboo|phormium|hosta|alpine|bedding/i;
const isPlant = p => PLANT.test(p.ty + ' ' + p.tg.join(' ') + ' ' + p.t);
const slug = s => String(s || 'other').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'other';

function compact(p) {
  const vs = p.variants || [];
  const prices = vs.map(v => parseFloat(v.price)).filter(x => !isNaN(x));
  const cmp = vs.map(v => parseFloat(v.compare_at_price)).filter(x => !isNaN(x));
  const mx = prices.length ? Math.max(...prices) : 0, mn = prices.length ? Math.min(...prices) : 0;
  let d = String(p.body_html || '').replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
  if (d.length > 420) d = d.slice(0, 420).replace(/\s+\S*$/, '') + '…';
  return { h: p.handle, t: String(p.title || '').trim(), ty: String(p.product_type || '').trim(), tg: (p.tags || []).slice(0, 6),
    p: mn.toFixed(2), pm: mx.toFixed(2), c: cmp.length && Math.max(...cmp) > mx ? Math.max(...cmp).toFixed(2) : '',
    a: vs.some(v => v.available), i: (p.images || []).slice(0, 4).map(x => x.src).filter(Boolean),
    v: vs.slice(0, 30).map(v => [String(v.title || '').trim(), v.price || '', !!v.available, v.id]), d, u: String(p.updated_at || '').slice(0, 10) };
}

export class GardenDB {
  constructor(state, env) {
    this.state = state; this.sql = state.storage.sql;
    this.sql.exec('CREATE TABLE IF NOT EXISTS products (h TEXT PRIMARY KEY, seq INTEGER, data TEXT)');
    this.sql.exec('CREATE TABLE IF NOT EXISTS meta (k TEXT PRIMARY KEY, v TEXT)');
    this.sql.exec('CREATE TABLE IF NOT EXISTS guestbook (id INTEGER PRIMARY KEY AUTOINCREMENT, at TEXT, who TEXT, version TEXT, change TEXT)');
  }
  meta(k, v) {
    if (v === undefined) { const r = this.sql.exec('SELECT v FROM meta WHERE k=?', k).toArray(); return r.length ? r[0].v : null; }
    this.sql.exec('INSERT OR REPLACE INTO meta (k,v) VALUES (?,?)', k, String(v));
  }
  store(list, source, fetched) {
    this.sql.exec('DELETE FROM products');
    list.forEach((p, i) => this.sql.exec('INSERT OR REPLACE INTO products (h,seq,data) VALUES (?,?,?)', p.h, i, JSON.stringify(p)));
    this.meta('source', source); this.meta('fetched', fetched); this.meta('count', list.length);
  }
  async refresh() {
    const out = [];
    for (let page = 1; page <= 8; page++) {
      const r = await fetch(SHOP + '/products.json?limit=250&page=' + page + '&_cb=' + Date.now(), { headers: { 'user-agent': 'Mozilla/5.0 (compatible; bucklerfamily-garden-store/' + VERSION + ')' } });
      if (!r.ok) throw new Error('her catalogue answered ' + r.status);
      const ps = (await r.json()).products || [];
      out.push(...ps.map(compact));
      if (ps.length < 250) break;
    }
    if (!out.length) throw new Error('her catalogue was empty');
    out.sort((a, b) => (a.a === b.a ? a.t.toLowerCase().localeCompare(b.t.toLowerCase()) : a.a ? -1 : 1));
    this.store(out, 'live', new Date().toISOString());
    return out.length;
  }
  async alarm() {
    try { const n = await this.refresh(); this.meta('last_ok', new Date().toISOString() + ' (' + n + ')'); }
    catch (e) { this.meta('last_error', new Date().toISOString() + ' ' + String(e.message || e).slice(0, 200)); }
    await this.state.storage.setAlarm(Date.now() + REFRESH_MS);
  }
  async fetch(req) {
    const u = new URL(req.url);
    if (!this.meta('count')) this.store(SEED.products, 'snapshot', SEED.fetched);
    if (!(await this.state.storage.getAlarm())) await this.state.storage.setAlarm(Date.now() + 2000);
    if (u.pathname === '/cat') {
      const rows = this.sql.exec('SELECT data FROM products ORDER BY seq').toArray().map(r => JSON.parse(r.data));
      return Response.json({ source: this.meta('source'), fetched: this.meta('fetched'), last_ok: this.meta('last_ok'), last_error: this.meta('last_error'), products: rows });
    }
    if (u.pathname === '/refresh') {
      const last = Date.parse(this.meta('manual_at') || 0) || 0;
      if (Date.now() - last < 10 * 60 * 1000) return Response.json({ ok: false, why: 'refreshed less than 10 minutes ago', fetched: this.meta('fetched') }, { status: 429 });
      this.meta('manual_at', new Date().toISOString());
      try { const n = await this.refresh(); return Response.json({ ok: true, products: n, fetched: this.meta('fetched') }); }
      catch (e) { return Response.json({ ok: false, why: String(e.message || e) }, { status: 502 }); }
    }
    if (u.pathname === '/gb' && req.method === 'POST') {
      let b = {}; try { b = await req.json(); } catch (e) {}
      const who = String(b.who || '').trim().slice(0, 60), change = String(b.change || '').trim().slice(0, 300), version = String(b.version || VERSION).slice(0, 20);
      if (!who || !change) return Response.json({ ok: false, why: 'who and change are required' }, { status: 400 });
      const today = new Date().toISOString().slice(0, 10);
      const n = this.sql.exec("SELECT COUNT(*) AS n FROM guestbook WHERE substr(at,1,10)=?", today).toArray()[0].n;
      if (n >= 50) return Response.json({ ok: false, why: 'daily guest book limit reached' }, { status: 429 });
      this.sql.exec('INSERT INTO guestbook (at,who,version,change) VALUES (?,?,?,?)', new Date().toISOString(), who, version, change);
      return Response.json({ ok: true });
    }
    if (u.pathname === '/gb') return Response.json({ entries: this.sql.exec('SELECT at,who,version,change FROM guestbook ORDER BY id DESC LIMIT 100').toArray() });
    return new Response('not found', { status: 404 });
  }
}

let CAT = null, CAT_AT = 0;
async function catalogue(env) {
  if (CAT && Date.now() - CAT_AT < 120000) return CAT;
  try {
    const stub = env.GARDEN.get(env.GARDEN.idFromName('garden-store'));
    const r = await stub.fetch('https://do/cat');
    if (r.ok) { const j = await r.json(); if (j.products && j.products.length) { CAT = j; CAT_AT = Date.now(); return CAT; } }
  } catch (e) {}
  return CAT || { source: 'snapshot', fetched: SEED.fetched, products: SEED.products };
}
async function gbEntries(env) {
  try { const r = await env.GARDEN.get(env.GARDEN.idFromName('garden-store')).fetch('https://do/gb'); return (await r.json()).entries || []; } catch (e) { return []; }
}

const CSS = `
:root{--g:#2f5d3a;--g2:#e9f2ea;--ink:#1d2a20;--mut:#5d6b60;--line:#d8e2d9}
.gs{margin:0;font:16px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:var(--ink);background:#fbfdfb}
.gs *{box-sizing:border-box}.gs img{max-width:100%;display:block}
.gs-w{max-width:1100px;margin:0 auto;padding:12px 14px 40px;overflow-x:hidden}
.gs-bar{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:13px;color:var(--mut);border-bottom:1px solid var(--line);padding:6px 0;margin-bottom:10px;flex-wrap:wrap}
.gs-bar a{color:var(--g);text-decoration:none}.gs-bar b{color:var(--ink)}
.gs h1{font-size:1.6rem;margin:.3em 0 .1em;color:var(--g)}.gs h1 small{display:block;font-size:.8rem;color:var(--mut);font-weight:500;letter-spacing:.06em;text-transform:uppercase}
.gs-intro{color:var(--mut);margin:.2em 0 .8em;max-width:60ch}
.gs-sold{display:inline-block;background:var(--g2);border:1px solid var(--line);border-radius:999px;padding:3px 10px;font-size:12.5px;color:var(--g)}
.gs-tools{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}
.gs-tools input{flex:1 1 180px;min-width:0;padding:9px 11px;border:1px solid var(--line);border-radius:10px;font:inherit}
.gs-chips{display:flex;gap:6px;overflow-x:auto;padding-bottom:4px;-webkit-overflow-scrolling:touch;max-width:100%}
.gs-chips button{flex:0 0 auto;border:1px solid var(--line);background:#fff;border-radius:999px;padding:5px 11px;font:inherit;font-size:13px;cursor:pointer;color:var(--ink)}
.gs-chips button[aria-pressed=true]{background:var(--g);color:#fff;border-color:var(--g)}
.gs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-top:8px}
.gs-card{background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;display:flex;flex-direction:column;min-width:0}
.gs-card a.gs-ph{display:block;aspect-ratio:1/1;background:var(--g2)}
.gs-card a.gs-ph img{width:100%;height:100%;object-fit:cover}
.gs-cb{padding:8px 10px 10px;display:flex;flex-direction:column;gap:4px;flex:1}
.gs .gs-cb h2{font-size:.92rem!important;line-height:1.25!important;margin:0!important;font-weight:600;overflow-wrap:anywhere;text-transform:none!important;letter-spacing:0!important;font-family:inherit!important;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.gs .gs-cb h2 a{color:inherit;text-decoration:none}
.gs-ty{font-size:11.5px;color:var(--mut)}.gs-pr{font-weight:700;color:var(--g)}.gs-pr s{color:var(--mut);font-weight:400;margin-left:4px}
.gs-out{font-size:11.5px;color:#9a3b1f}
.gs-buy{display:block;text-align:center;background:var(--g);color:#fff!important;text-decoration:none;border-radius:10px;padding:8px 10px;font-weight:600;margin-top:auto;font-size:14px}
.gs-buy.big{font-size:16px;padding:12px 14px;margin:12px 0 4px}
.gs-note{font-size:12.5px;color:var(--mut)}
.gs-p{display:grid;grid-template-columns:1fr;gap:16px}@media(min-width:760px){.gs-p{grid-template-columns:1.1fr 1fr}}
.gs-gal img{border-radius:14px;width:100%;aspect-ratio:1/1;object-fit:cover;background:var(--g2)}
.gs-th{display:flex;gap:8px;margin-top:8px;overflow-x:auto}.gs-th img{width:72px;height:72px;object-fit:cover;border-radius:8px;flex:0 0 auto}
.gs-vt{width:100%;border-collapse:collapse;font-size:14px;margin-top:8px}.gs-vt td{border-top:1px solid var(--line);padding:6px 4px;vertical-align:middle}
.gs-vt td:last-child{text-align:right;white-space:nowrap}.gs-vt a{color:var(--g);font-weight:600}
.gs-f{margin-top:28px;border-top:1px solid var(--line);padding-top:12px;font-size:13px;color:var(--mut)}
.gs-f details{margin:8px 0}.gs-f summary{cursor:pointer;color:var(--g);font-weight:600}
.gs-f table{width:100%;border-collapse:collapse;font-size:12.5px}.gs-f td,.gs-f th{border-top:1px solid var(--line);padding:4px;text-align:left;vertical-align:top}
.gs-tw{overflow-x:auto;max-width:100%}
.gs-hide{display:none!important}
`;

function shell(title, desc, body, extraHead) {
  return `<!doctype html><html lang="en" data-cw-noclip data-cw-nolevels><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><meta name="theme-color" content="#2f5d3a">
<link rel="canonical" href="https://bucklerfamily.estate${extraHead && extraHead.canon || BASE + '/'}">
<link rel="alternate" type="text/plain" href="${BASE}/llms.txt" title="For AI agents"><link rel="alternate" type="application/json" href="${BASE}/catalogue.json" title="Catalogue (JSON)">
<meta name="ai-agents" content="Catalogue: ${BASE}/catalogue.json · search: ${BASE}/api/search?q= · product: ${BASE}/api/product/<handle> · WebMCP tools garden_store_* · guest book: POST ${BASE}/api/guestbook">
<style>${CSS}</style><script src="/_cedwyn/ghf/ghf-boot.js?v=2.1.19"></script></head><body class="gs"><main class="gs-w" data-scope="online">${body}</main></body></html>`;
}

function navBar() {
  return `<nav class="gs-bar" aria-label="Webapps"><a href="/analytics/" rel="prev">‹ Analytics</a><b>REALM · Garden Store · ${SLOT} of ${OF}</b><a href="/wiki/" rel="next">Wiki ›</a></nav>`;
}

function footer(gb) {
  const rows = META.changelog.map(r => `<tr><td>v${esc(r.v)}</td><td>${esc(r.d)}</td><td>${esc(r.c)}</td></tr>`).join('');
  const gbr = gb.map(e => `<tr><td>${esc(String(e.at).slice(0, 10))}</td><td>v${esc(e.version)}</td><td>${esc(e.change)}</td><td>${esc(e.who)}</td></tr>`).join('')
    + META.guestbook.map(e => `<tr><td>${esc(e.d)}</td><td>v${esc(e.v)}</td><td>${esc(e.c)}</td><td>${esc(e.who)}</td></tr>`).join('');
  const n = gb.length + META.guestbook.length;
  return `<footer class="gs-f">
<p><b>Sold and fulfilled by Garden City (gardencity.cymru).</b> This store mirrors Garden City's own catalogue: prices are hers, and every Buy button opens her product page, where she takes the order, the payment and the delivery. We never take payment and hold no card details.</p>
<details class="gs-ver" id="gs-ver"><summary>v${esc(VERSION)} ⓘ changelog</summary><div class="gs-tw"><table><thead><tr><th>Version</th><th>Date</th><th>Change</th></tr></thead><tbody>${rows}</tbody></table></div></details>
<details class="gs-gb" id="gs-gb"><summary>Agent guest book (${n})</summary><div class="gs-tw"><table><thead><tr><th>Date</th><th>Version</th><th>Change</th><th>Who</th></tr></thead><tbody>${gbr}</tbody></table></div></details>
<p data-for-agents hidden>Agents: read ${BASE}/llms.txt. Catalogue ${BASE}/catalogue.json; search ${BASE}/api/search?q=; one product ${BASE}/api/product/&lt;handle&gt; (its buy_url is Garden City's own product page). Log every change you make to this webapp with POST ${BASE}/api/guestbook {"who","change","version"} or the WebMCP tool garden_store_guestbook_sign.</p>
</footer>`;
}

const WEBMCP = `<script>(function(){var B='${BASE}';function j(u,o){return fetch(u,o).then(function(r){return r.json()})}
var tools=[{name:'garden_store_search',description:'Search the Garden Store (plants from Garden City, gardencity.cymru). Returns products with price, stock and buy_url (her product page).',inputSchema:{type:'object',properties:{query:{type:'string'},type:{type:'string'},in_stock_only:{type:'boolean'}}},execute:function(a){a=a||{};return j(B+'/api/search?q='+encodeURIComponent(a.query||'')+'&type='+encodeURIComponent(a.type||'')+(a.in_stock_only?'&stock=1':''))}},
{name:'garden_store_product',description:'One product by handle: variants, prices, images and buy_url (Garden City product page; she takes payment).',inputSchema:{type:'object',properties:{handle:{type:'string'}},required:['handle']},execute:function(a){return j(B+'/api/product/'+encodeURIComponent(a.handle))}},
{name:'garden_store_buy_link',description:'The exact Garden City product page to buy a product (opens her shop; we never take payment).',inputSchema:{type:'object',properties:{handle:{type:'string'},variant_id:{type:'number'}},required:['handle']},execute:function(a){return {buy_url:'${SHOP}/products/'+encodeURIComponent(a.handle)+'?${UTM}'+(a.variant_id?'&variant='+a.variant_id:'')}}},
{name:'garden_store_guestbook_sign',description:'Log a change you made to this webapp in its agent guest book.',inputSchema:{type:'object',properties:{who:{type:'string'},change:{type:'string'},version:{type:'string'}},required:['who','change']},execute:function(a){return j(B+'/api/guestbook',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(a)})}}];
var mc=navigator.modelContext;if(mc){if(typeof mc.registerTool==='function')tools.forEach(function(t){try{mc.registerTool(t)}catch(e){}});else if(typeof mc.provideContext==='function')try{mc.provideContext({tools:tools})}catch(e){}}
window.cedwynGardenStore={tools:tools};
function slot(){var s=document.querySelector('.ghf-v2-name small');if(s&&!s.textContent.trim())s.textContent='${SLOT} of ${OF}'}document.addEventListener('DOMContentLoaded',function(){slot();setTimeout(slot,1500)});})();</script>`;

function card(p) {
  const price = p.p === p.pm ? gbp(p.p) : 'from ' + gbp(p.p);
  return `<article class="gs-card" data-ty="${esc(slug(p.ty))}" data-g="${isPlant(p) ? 'plant' : 'home'}" data-q="${esc((p.t + ' ' + p.ty + ' ' + p.tg.join(' ')).toLowerCase())}">
<a class="gs-ph" href="${BASE}/p/${esc(p.h)}/">${p.i[0] ? `<img src="${esc(img(p.i[0], 400))}" alt="${esc(p.t)}" loading="lazy" width="400" height="400" referrerpolicy="no-referrer">` : ''}</a>
<div class="gs-cb"><span class="gs-ty">${esc(p.ty || 'Plant')}</span><h2><a href="${BASE}/p/${esc(p.h)}/">${esc(p.t)}</a></h2>
<span class="gs-pr">${price}${p.c ? `<s>${gbp(p.c)}</s>` : ''}</span>${p.a ? '' : '<span class="gs-out">Sold out at Garden City</span>'}
<a class="gs-buy" href="${esc(buyUrl(p.h))}" target="_blank" rel="noopener" data-buy="${esc(p.h)}">Buy on Garden City ↗</a></div></article>`;
}

async function home(env) {
  const cat = await catalogue(env);
  const ps = cat.products.filter(isPlant).concat(cat.products.filter(p => !isPlant(p)));
  const nPl = cat.products.filter(isPlant).length;
  const types = {}; ps.forEach(p => { const k = p.ty || 'Other'; types[k] = (types[k] || 0) + 1; });
  const groups = `<button type="button" data-g="plant" aria-pressed="false">Plants (${nPl})</button><button type="button" data-g="home" aria-pressed="false">Home &amp; gifts (${ps.length - nPl})</button>`;
  const chips = groups + Object.entries(types).sort((a, b) => b[1] - a[1]).map(([k, n]) => `<button type="button" data-f="${esc(slug(k))}" aria-pressed="false">${esc(k)} (${n})</button>`).join('');
  const inStock = ps.filter(p => p.a).length;
  const body = `${navBar()}
<h1><small>REALM flowers &amp; plants</small>Garden Store</h1>
<p class="gs-intro">Peat-free plants grown in Wales, plus home and gift pieces, from Garden City's own catalogue: ${nPl} plants and ${ps.length - nPl} home &amp; gift items, ${inStock} in stock. Pick one here, then buy it on Garden City's shop.</p>
<span class="gs-sold">Sold and fulfilled by Garden City (gardencity.cymru)</span>
<div class="gs-tools"><input type="search" id="gs-q" placeholder="Search plants" aria-label="Search plants"></div>
<div class="gs-chips" role="group" aria-label="Filter by type"><button type="button" data-f="" aria-pressed="true">All (${ps.length})</button>${chips}</div>
<p class="gs-note" id="gs-n" aria-live="polite"></p>
<div class="gs-grid" id="gs-grid">${ps.map(card).join('')}</div>
${footer(await gbEntries(env))}
<script>(function(){var q=document.getElementById('gs-q'),cs=[].slice.call(document.querySelectorAll('.gs-card')),f='',g='',n=document.getElementById('gs-n');
function go(){var t=(q.value||'').toLowerCase().trim(),k=0;cs.forEach(function(c){var ok=(!f||c.dataset.ty===f)&&(!g||c.dataset.g===g)&&(!t||c.dataset.q.indexOf(t)>=0);c.classList.toggle('gs-hide',!ok);if(ok)k++});n.textContent=(t||f||g)?k+' shown':''}
q.addEventListener('input',go);[].forEach.call(document.querySelectorAll('.gs-chips button'),function(b){b.addEventListener('click',function(){f=b.dataset.f||'';g=b.dataset.g||'';[].forEach.call(document.querySelectorAll('.gs-chips button'),function(x){x.setAttribute('aria-pressed',x===b)});go()})})})();</script>
${WEBMCP}`;
  return shell('Garden Store · REALM flowers & plants from Garden City, Wales', 'Peat-free plants grown in Wales from Garden City (gardencity.cymru). Prices are hers; every Buy opens her own product page. Sold and fulfilled by Garden City.', body);
}

async function product(env, h) {
  const cat = await catalogue(env), p = cat.products.find(x => x.h === h);
  if (!p) return null;
  const vrows = p.v.length > 1 ? `<table class="gs-vt"><tbody>${p.v.map(v => `<tr><td>${esc(v[0])}</td><td>${gbp(v[1])}${v[2] ? '' : ' <span class="gs-out">sold out</span>'}</td><td><a href="${esc(buyUrl(p.h, v[3]))}" target="_blank" rel="noopener">Buy ↗</a></td></tr>`).join('')}</tbody></table>` : '';
  const price = p.p === p.pm ? gbp(p.p) : gbp(p.p) + ' – ' + gbp(p.pm);
  const body = `${navBar()}
<p class="gs-note"><a href="${BASE}/" style="color:var(--g)">‹ All plants</a></p>
<div class="gs-p"><div class="gs-gal">${p.i[0] ? `<img id="gs-main" src="${esc(img(p.i[0], 800))}" alt="${esc(p.t)}" width="800" height="800" referrerpolicy="no-referrer">` : ''}
${p.i.length > 1 ? `<div class="gs-th">${p.i.map(u => `<a href="${esc(img(u, 800))}" data-big="${esc(img(u, 800))}"><img src="${esc(img(u, 160))}" alt="" loading="lazy" width="72" height="72" referrerpolicy="no-referrer"></a>`).join('')}</div>` : ''}</div>
<div><span class="gs-ty">${esc(p.ty || 'Plant')}</span><h1 style="font-size:1.35rem">${esc(p.t)}</h1>
<p class="gs-pr" style="font-size:1.25rem;margin:.2em 0">${price}${p.c ? ` <s>${gbp(p.c)}</s>` : ''}</p>
${p.a ? '' : '<p class="gs-out">Sold out at Garden City right now.</p>'}
<span class="gs-sold">Sold and fulfilled by Garden City (gardencity.cymru)</span>
<a class="gs-buy big" id="gs-buy" href="${esc(buyUrl(p.h))}" target="_blank" rel="noopener" data-buy="${esc(p.h)}">Add to cart on Garden City ↗</a>
<p class="gs-note">Opens Garden City's own page for this plant in a new tab. She takes the order, the payment and the delivery; we never take payment.</p>
${vrows}
${p.d ? `<p style="margin-top:12px">${esc(p.d)}</p>` : ''}</div></div>
${footer(await gbEntries(env))}
<script>(function(){var m=document.getElementById('gs-main');[].forEach.call(document.querySelectorAll('.gs-th a'),function(a){a.addEventListener('click',function(e){e.preventDefault();if(m)m.src=a.dataset.big})})})();</script>
${WEBMCP}`;
  return shell(p.t + ' · Garden Store', (p.d || p.t).slice(0, 160), body, { canon: BASE + '/p/' + p.h + '/' });
}

function api(p) {
  return { handle: p.h, title: p.t, type: p.ty, tags: p.tg, price_gbp: p.p, price_max_gbp: p.pm, compare_at_gbp: p.c || null, in_stock: p.a,
    images: p.i, variants: p.v.map(v => ({ title: v[0], price_gbp: v[1], in_stock: v[2], variant_id: v[3], buy_url: buyUrl(p.h, v[3]) })),
    description: p.d, page: 'https://bucklerfamily.estate' + BASE + '/p/' + p.h + '/', buy_url: buyUrl(p.h), seller: 'Garden City (gardencity.cymru)' };
}

function llms(cat) {
  return `# Garden Store (REALM flowers & plants) — webapp ${SLOT} of ${OF}
> Our own plant store mirroring Garden City's catalogue (gardencity.cymru, peat-free plants grown in Wales). Garden City sells, takes payment and delivers; every buy link is her own product page. This store never takes payment.

Version: ${VERSION}. Products: ${cat.products.length}. Catalogue last read: ${cat.fetched} (${cat.source}).

## Read
- ${BASE}/catalogue.json — every product (compact form)
- ${BASE}/api/search?q=<words>&type=<product type>&stock=1 — search
- ${BASE}/api/product/<handle> — one product with variants and buy_url
- ${BASE}/p/<handle>/ — the product page for people

## Talk
- WebMCP tools on every page: garden_store_search, garden_store_product, garden_store_buy_link, garden_store_guestbook_sign
- POST ${BASE}/api/guestbook {"who","change","version"} — log any change you make to this webapp
- POST ${BASE}/api/refresh — re-read Garden City's catalogue now (at most every 10 minutes; it also refreshes itself every 6 hours)

## Rules
- Buy links go to ${SHOP}/products/<handle>?${UTM}. Never build a checkout, cart or payment form here.
- Prices are Garden City's; show "Sold and fulfilled by Garden City (gardencity.cymru)".
- Images are shown from Garden City's own CDN; do not copy them elsewhere.
`;
}

const J = (o, s) => new Response(JSON.stringify(o), { status: s || 200, headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*', 'cache-control': 'public, max-age=120' } });
const H = (t, s) => new Response(t, { status: s || 200, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=120', 'x-garden-store': VERSION } });

export default {
  async fetch(req, env, ctx) {
    const u = new URL(req.url); let p = u.pathname;
    if (p === BASE) return new Response(null, { status: 301, headers: { location: BASE + '/' + u.search } });
    if (!p.startsWith(BASE + '/')) return new Response('not found', { status: 404 });
    p = p.slice(BASE.length);
    if (p === '/' || p === '/index.html') return H(await home(env));
    if (p === '/version.json') return J({ version: VERSION, slot: SLOT, of: OF, seller: SHOP });
    if (p === '/llms.txt') return new Response(llms(await catalogue(env)), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
    if (p === '/catalogue.json') { const c = await catalogue(env); return J({ version: VERSION, source: SHOP, catalogue: c.source, fetched: c.fetched, count: c.products.length, seller: 'Garden City (gardencity.cymru)', buy_url_pattern: SHOP + '/products/<handle>?' + UTM, products: c.products }); }
    if (p === '/api/search' || p === '/api/') {
      const c = await catalogue(env), q = (u.searchParams.get('q') || '').toLowerCase().trim(), ty = (u.searchParams.get('type') || '').toLowerCase().trim(), st = u.searchParams.get('stock') === '1';
      const r = c.products.filter(x => (!q || (x.t + ' ' + x.ty + ' ' + x.tg.join(' ') + ' ' + x.d).toLowerCase().includes(q)) && (!ty || x.ty.toLowerCase().includes(ty)) && (!st || x.a));
      return J({ query: q, count: r.length, products: r.slice(0, 50).map(api) });
    }
    let m = p.match(/^\/api\/product\/([^\/]+)\/?$/);
    if (m) { const c = await catalogue(env), x = c.products.find(y => y.h === decodeURIComponent(m[1])); return x ? J(api(x)) : J({ error: 'no such product' }, 404); }
    if (p === '/api/refresh' && req.method === 'POST') { CAT = null; const r = await env.GARDEN.get(env.GARDEN.idFromName('garden-store')).fetch('https://do/refresh'); return new Response(r.body, { status: r.status, headers: { 'content-type': 'application/json' } }); }
    if (p === '/api/guestbook') {
      const stub = env.GARDEN.get(env.GARDEN.idFromName('garden-store'));
      if (req.method === 'POST') { const r = await stub.fetch('https://do/gb', { method: 'POST', body: await req.text() }); return new Response(r.body, { status: r.status, headers: { 'content-type': 'application/json' } }); }
      return J({ entries: (await gbEntries(env)), static: META.guestbook });
    }
    m = p.match(/^\/p\/([^\/]+)\/?$/);
    if (m) {
      if (!p.endsWith('/')) return new Response(null, { status: 301, headers: { location: BASE + p + '/' } });
      const t = await product(env, decodeURIComponent(m[1]));
      if (t) return H(t);
    }
    return H(shell('Not found · Garden Store', 'Not found', `${navBar()}<h1>Not found</h1><p><a href="${BASE}/">All plants</a></p>`), 404);
  }
};
