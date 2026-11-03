/* cw-cache.js 1.0.0 — Cedwyn webapp standard: client-side cache (stale-while-revalidate over IndexedDB).
   Every read is a static file; no Worker runs. Usage: CW.cache.get(url, {maxAge:3600}).then(render)
   render() is called once with the cached copy (if any) and again when a fresher copy arrives. */
(function(){
  var W = window.CW = window.CW || {};
  var DB = 'cedwyn-cache-v1', STORE = 'json';
  function open(){ return new Promise(function(res, rej){
    if(!window.indexedDB) return rej('no idb');
    var r = indexedDB.open(DB, 1);
    r.onupgradeneeded = function(){ r.result.createObjectStore(STORE); };
    r.onsuccess = function(){ res(r.result); }; r.onerror = function(){ rej(r.error); };
  });}
  function idb(mode, fn){ return open().then(function(db){ return new Promise(function(res, rej){
    var tx = db.transaction(STORE, mode), st = tx.objectStore(STORE), q = fn(st);
    tx.oncomplete = function(){ res(q && q.result); }; tx.onerror = function(){ rej(tx.error); };
  });}); }
  function read(k){ return idb('readonly', function(s){ return s.get(k); }).catch(function(){ return null; }); }
  function write(k, v){ return idb('readwrite', function(s){ return s.put(v, k); }).catch(function(){}); }
  W.cache = {
    get: function(url, opt, onData){
      if(typeof opt === 'function'){ onData = opt; opt = {}; }
      opt = opt || {}; var maxAge = (opt.maxAge == null ? 3600 : opt.maxAge) * 1000;
      return read(url).then(function(hit){
        var fresh = hit && (Date.now() - hit.at) < maxAge;
        if(hit && onData) onData(hit.data, {from:'cache', at:hit.at, rev:hit.rev});
        if(fresh) return hit.data;
        return fetch(url, {cache:'no-cache'}).then(function(r){ if(!r.ok) throw new Error(r.status); return r.json(); })
          .then(function(data){
            var rev = data && (data.rev || (data.meta && data.meta.rev)) || null;
            if(!hit || hit.rev !== rev || !rev){ write(url, {at:Date.now(), rev:rev, data:data}); if(onData) onData(data, {from:'network', rev:rev}); }
            else write(url, {at:Date.now(), rev:rev, data:hit.data});
            return data;
          }).catch(function(e){ if(hit) return hit.data; throw e; });
      });
    },
    clear: function(){ return idb('readwrite', function(s){ return s.clear(); }); }
  };
})();
