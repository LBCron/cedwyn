import test from "node:test";
import assert from "node:assert/strict";
import { corsHeaders } from "../src/cors.js";

test("CORS allows the estate apex and HTTPS subdomains", () => {
  const apex = corsHeaders(new Request("https://queue.example/health", { headers: { origin: "https://bucklerfamily.estate" } }));
  const sub = corsHeaders(new Request("https://queue.example/health", { headers: { origin: "https://cedwyn.bucklerfamily.estate" } }));
  assert.equal(apex["access-control-allow-origin"], "https://bucklerfamily.estate");
  assert.equal(sub["access-control-allow-origin"], "https://cedwyn.bucklerfamily.estate");
  assert.equal(sub["access-control-allow-headers"], "Authorization, Content-Type");
});

test("CORS rejects insecure and unrelated origins", () => {
  assert.equal(corsHeaders(new Request("https://queue.example", { headers: { origin: "http://bucklerfamily.estate" } })), null);
  assert.equal(corsHeaders(new Request("https://queue.example", { headers: { origin: "https://bucklerfamily.estate.evil.example" } })), null);
  assert.equal(corsHeaders(new Request("https://queue.example", { headers: { origin: "https://evil.example" } })), null);
});

test("server-to-server requests need no CORS headers", () => {
  assert.equal(corsHeaders(new Request("https://queue.example/health")), null);
});
