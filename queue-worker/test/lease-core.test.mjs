import test from "node:test";
import assert from "node:assert/strict";
import { claimLease, readLease, releaseLease, renewLease } from "../src/lease-core.js";

function storage(legacyLease = null) {
  const rows = new Map();
  const legacy = new Map(legacyLease ? [["lease", legacyLease]] : []);
  const db = {
    kv: {
      get(key) { return legacy.get(key) ?? null; },
      delete(key) { return legacy.delete(key); }
    },
    transactionSync(callback) { return callback(); },
    sql: {
      exec(statement, ...args) {
        const sql = statement.replace(/\s+/g, " ").trim().toUpperCase();
        if (sql.startsWith("CREATE TABLE")) return { toArray: () => [] };
        if (sql.startsWith("SELECT")) {
          return { toArray: () => rows.has(1) ? [{ ...rows.get(1) }] : [] };
        }
        if (sql.startsWith("INSERT INTO ISSUE_LEASES")) {
          const [agent, claimed_at, renewed_at, expires_at] = args;
          rows.set(1, { agent, claimed_at, renewed_at, expires_at });
          return { toArray: () => [] };
        }
        if (sql.startsWith("UPDATE ISSUE_LEASES")) {
          const [renewed_at, expires_at, agent] = args;
          const current = rows.get(1);
          if (current && current.agent === agent) {
            rows.set(1, { ...current, renewed_at, expires_at });
          }
          return { toArray: () => [] };
        }
        if (sql.startsWith("DELETE FROM ISSUE_LEASES")) {
          if (args.length === 0 || rows.get(1)?.agent === args[0]) rows.delete(1);
          return { toArray: () => [] };
        }
        throw new Error("Unexpected SQL: " + statement);
      }
    }
  };
  return db;
}

test("two simultaneous competing claims produce exactly one winner", async () => {
  const db = storage();
  const results = await Promise.all([
    Promise.resolve().then(() => claimLease(db, "Tab", 1_000, 60_000)),
    Promise.resolve().then(() => claimLease(db, "Pally", 1_000, 60_000))
  ]);
  assert.equal(results.filter(x => x.ok).length, 1);
  assert.equal(results.filter(x => !x.ok).length, 1);
  const held = await readLease(db, 2_000);
  assert.ok(["Tab", "Pally"].includes(held.agent));
});

test("a different agent cannot take a live lease", async () => {
  const db = storage();
  const first = await claimLease(db, "Tab", 1_000, 60_000);
  const second = await claimLease(db, "Pally", 2_000, 60_000);
  assert.equal(first.ok, true);
  assert.equal(second.ok, false);
  assert.equal(second.lease.agent, "Tab");
});

test("same agent can claim idempotently without changing original claim time", async () => {
  const db = storage();
  await claimLease(db, "Tab", 1_000, 60_000);
  const renewed = await claimLease(db, "Tab", 10_000, 120_000);
  assert.equal(renewed.ok, true);
  assert.equal(renewed.lease.claimed_at, new Date(1_000).toISOString());
  assert.equal(renewed.lease.expires_at, new Date(130_000).toISOString());
});

test("expired lease can be claimed by another agent", async () => {
  const db = storage();
  await claimLease(db, "Tab", 1_000, 60_000);
  const next = await claimLease(db, "Pally", 61_001, 60_000);
  assert.equal(next.ok, true);
  assert.equal(next.lease.agent, "Pally");
});

test("only the current holder can release a live lease", async () => {
  const db = storage();
  await claimLease(db, "Tab", 1_000, 60_000);
  assert.equal((await releaseLease(db, "Pally", 2_000)).ok, false);
  assert.equal((await releaseLease(db, "Tab", 2_000)).released, true);
  assert.equal(await readLease(db, 3_000), null);
});

test("lease expiry is bounded and agent text is sanitised", async () => {
  const db = storage();
  const result = await claimLease(db, " <Tab>" + String.fromCharCode(10), 1_000, 99 * 60 * 60 * 1000);
  assert.equal(result.lease.agent, "Tab");
  assert.equal(Date.parse(result.lease.expires_at) - 1_000, 2 * 60 * 60 * 1000);
});

test("renew requires a current unexpired lease", async () => {
  const db = storage();
  const missing = await renewLease(db, "Tab", 1_000, 60_000);
  assert.equal(missing.ok, false);
  assert.equal(missing.error, "no active lease to renew");

  await claimLease(db, "Tab", 2_000, 60_000);
  const wrongAgent = await renewLease(db, "Pally", 3_000, 60_000);
  assert.equal(wrongAgent.ok, false);
  assert.equal(wrongAgent.error, "only the current lease holder can renew");

  const renewed = await renewLease(db, "Tab", 30_000, 120_000);
  assert.equal(renewed.ok, true);
  assert.equal(renewed.lease.claimed_at, new Date(2_000).toISOString());
  assert.equal(renewed.lease.renewed_at, new Date(30_000).toISOString());
  assert.equal(renewed.lease.expires_at, new Date(150_000).toISOString());
});

test("an expired lease cannot be renewed, but can be claimed afresh", async () => {
  const db = storage();
  await claimLease(db, "Tab", 1_000, 60_000);
  const expired = await renewLease(db, "Tab", 61_001, 60_000);
  assert.equal(expired.ok, false);
  assert.equal(expired.error, "no active lease to renew");
  const next = await claimLease(db, "Pally", 61_002, 60_000);
  assert.equal(next.ok, true);
  assert.equal(next.lease.agent, "Pally");
});

test("two simultaneous renewals retain the current holder and original claim", async () => {
  const db = storage();
  claimLease(db, "Tab", 1_000, 60_000);
  const results = await Promise.all([
    Promise.resolve().then(() => renewLease(db, "Tab", 20_000, 60_000)),
    Promise.resolve().then(() => renewLease(db, "Pally", 20_000, 60_000))
  ]);
  assert.equal(results.filter(x => x.ok).length, 1);
  assert.equal(results.filter(x => !x.ok).length, 1);
  const held = readLease(db, 21_000);
  assert.equal(held.agent, "Tab");
  assert.equal(held.claimed_at, new Date(1_000).toISOString());
});

test("upgrades a legacy preview KV lease without losing ownership", async () => {
  const legacyLease = {
    agent: "Tab",
    claimed_at: new Date(1_000).toISOString(),
    renewed_at: new Date(2_000).toISOString(),
    expires_at: new Date(60_000).toISOString()
  };
  const db = storage(legacyLease);
  const migrated = readLease(db, 3_000);
  assert.deepEqual(migrated, legacyLease);
  assert.equal(db.kv.get("lease"), null);
  const competing = claimLease(db, "Pally", 4_000, 60_000);
  assert.equal(competing.ok, false);
  assert.equal(competing.lease.agent, "Tab");
});
