const MAX_TTL_MS = 2 * 60 * 60 * 1000;
const DEFAULT_TTL_MS = 60 * 60 * 1000;

export function cleanAgent(value) {
  return String(value || "").replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, 60);
}

function ensureSchema(storage) {
  storage.sql.exec(`
    CREATE TABLE IF NOT EXISTS issue_leases (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      agent TEXT NOT NULL,
      claimed_at TEXT NOT NULL,
      renewed_at TEXT NOT NULL,
      expires_at TEXT NOT NULL
    )
  `);

  // Preserve a lease written by the pilot's first async-KV version when its
  // existing SQLite Durable Object namespace is upgraded in place.
  const current = storage.sql.exec("SELECT id FROM issue_leases WHERE id = 1").toArray();
  if (!current.length && storage.kv && typeof storage.kv.get === "function") {
    const legacy = storage.kv.get("lease");
    if (legacy && typeof legacy.agent === "string" &&
        typeof legacy.claimed_at === "string" &&
        typeof legacy.renewed_at === "string" &&
        typeof legacy.expires_at === "string") {
      storage.sql.exec(
        "INSERT INTO issue_leases (id, agent, claimed_at, renewed_at, expires_at) VALUES (1, ?, ?, ?, ?)",
        legacy.agent, legacy.claimed_at, legacy.renewed_at, legacy.expires_at
      );
    }
    if (legacy) storage.kv.delete("lease");
  }
}

function readLeaseRow(storage, now) {
  const rows = storage.sql.exec(
    "SELECT agent, claimed_at, renewed_at, expires_at FROM issue_leases WHERE id = 1"
  ).toArray();
  const lease = rows[0] || null;
  if (!lease || !Number.isFinite(Date.parse(lease.expires_at)) || Date.parse(lease.expires_at) <= now) {
    if (lease) storage.sql.exec("DELETE FROM issue_leases WHERE id = 1");
    return null;
  }
  return lease;
}

function boundedTtl(ttlMs) {
  return Math.max(60_000, Math.min(MAX_TTL_MS, Number(ttlMs) || DEFAULT_TTL_MS));
}

// All lease transitions run in one synchronous SQLite transaction. No await may
// occur between reading the current row and writing/deleting it.
export function readLease(storage, now = Date.now()) {
  return storage.transactionSync(() => {
    ensureSchema(storage);
    return readLeaseRow(storage, now);
  });
}

export function claimLease(storage, agentValue, now = Date.now(), ttlMs = DEFAULT_TTL_MS) {
  const agent = cleanAgent(agentValue);
  if (!agent) return { ok: false, error: "agent is required" };
  const ttl = boundedTtl(ttlMs);
  return storage.transactionSync(() => {
    ensureSchema(storage);
    const current = readLeaseRow(storage, now);
    if (current && current.agent !== agent) {
      return { ok: false, error: "already claimed by another agent", lease: current };
    }
    const lease = {
      agent,
      claimed_at: current ? current.claimed_at : new Date(now).toISOString(),
      renewed_at: new Date(now).toISOString(),
      expires_at: new Date(now + ttl).toISOString()
    };
    storage.sql.exec(
      `INSERT INTO issue_leases (id, agent, claimed_at, renewed_at, expires_at)
       VALUES (1, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         agent = excluded.agent,
         claimed_at = excluded.claimed_at,
         renewed_at = excluded.renewed_at,
         expires_at = excluded.expires_at`,
      lease.agent, lease.claimed_at, lease.renewed_at, lease.expires_at
    );
    return { ok: true, lease };
  });
}

export function renewLease(storage, agentValue, now = Date.now(), ttlMs = DEFAULT_TTL_MS) {
  const agent = cleanAgent(agentValue);
  if (!agent) return { ok: false, error: "agent is required" };
  const ttl = boundedTtl(ttlMs);
  return storage.transactionSync(() => {
    ensureSchema(storage);
    const current = readLeaseRow(storage, now);
    if (!current) return { ok: false, error: "no active lease to renew" };
    if (current.agent !== agent) {
      return { ok: false, error: "only the current lease holder can renew", lease: current };
    }
    const lease = {
      agent,
      claimed_at: current.claimed_at,
      renewed_at: new Date(now).toISOString(),
      expires_at: new Date(now + ttl).toISOString()
    };
    storage.sql.exec(
      "UPDATE issue_leases SET renewed_at = ?, expires_at = ? WHERE id = 1 AND agent = ?",
      lease.renewed_at, lease.expires_at, agent
    );
    return { ok: true, lease };
  });
}

export function releaseLease(storage, agentValue, now = Date.now()) {
  const agent = cleanAgent(agentValue);
  if (!agent) return { ok: false, error: "agent is required" };
  return storage.transactionSync(() => {
    ensureSchema(storage);
    const current = readLeaseRow(storage, now);
    if (!current) return { ok: true, released: false };
    if (current.agent !== agent) return { ok: false, error: "only the current lease holder can release", lease: current };
    storage.sql.exec("DELETE FROM issue_leases WHERE id = 1 AND agent = ?", agent);
    return { ok: true, released: true };
  });
}
