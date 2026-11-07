import test from "node:test";
import assert from "node:assert/strict";
import { fetchAllSearchPages } from "../src/github-pagination.js";

test("fetches every page when results exceed one GitHub page", async () => {
  const calls = [];
  const results = await fetchAllSearchPages(async page => {
    calls.push(page);
    if (page === 1) return { total_count: 125, items: Array.from({length:100},(_,i)=>({id:i+1})) };
    return { total_count: 125, items: Array.from({length:25},(_,i)=>({id:i+101})) };
  });
  assert.deepEqual(calls,[1,2]);
  assert.equal(results.length,125);
  assert.equal(results[124].id,125);
});

test("stops after the terminal short page when total is zero", async () => {
  const calls=[];
  const results=await fetchAllSearchPages(async page=>{calls.push(page);return {total_count:0,items:[]};});
  assert.deepEqual(calls,[1]);
  assert.deepEqual(results,[]);
});

test("refuses a changing search total instead of returning an inconsistent list", async () => {
  await assert.rejects(()=>fetchAllSearchPages(async page=>({
    total_count:page===1?150:151,
    items:Array.from({length:100},(_,i)=>({id:(page-1)*100+i}))
  })),/total changed/);
});

test("fails closed if GitHub's 1,000-result search cap would truncate the queue", async () => {
  await assert.rejects(()=>fetchAllSearchPages(async page=>({
    total_count:1001,
    items:Array.from({length:100},(_,i)=>({id:(page-1)*100+i}))
  })),/1,000-result paging cap/);
});

test("refuses page overlaps that would leave the unique issue count short", async () => {
  await assert.rejects(()=>fetchAllSearchPages(async page=>({
    total_count:150,
    items:page===1
      ? Array.from({length:100},(_,i)=>({id:i+1}))
      : Array.from({length:50},(_,i)=>({id:i+76}))
  })),/overlapped or skipped records/);
});
test("refuses a short page before the reported total", async () => {
  await assert.rejects(()=>fetchAllSearchPages(async()=>({
    total_count:150,
    items:Array.from({length:50},(_,i)=>({id:i+1}))
  })),/stopped before total_count/);
});
