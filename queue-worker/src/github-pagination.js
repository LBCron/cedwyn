export async function fetchAllSearchPages(fetchPage, options = {}) {
  const pageSize = Math.max(1, Math.min(100, Number(options.pageSize) || 100));
  const maxPages = Math.max(1, Math.min(10, Number(options.maxPages) || 10));
  const uniqueItems = new Map();
  let received = 0;
  let expectedTotal = null;

  for (let page = 1; page <= maxPages; page += 1) {
    const payload = await fetchPage(page);
    if (!payload || !Array.isArray(payload.items) || !Number.isSafeInteger(payload.total_count) || payload.total_count < 0) {
      throw new Error("GitHub search returned an invalid pagination payload");
    }
    if (expectedTotal === null) expectedTotal = payload.total_count;
    else if (payload.total_count !== expectedTotal) {
      throw new Error("GitHub issue search total changed during pagination");
    }

    received += payload.items.length;
    for (const item of payload.items) {
      if (!item || !Number.isSafeInteger(item.id)) {
        throw new Error("GitHub issue search returned an item without a stable numeric ID");
      }
      uniqueItems.set(item.id, item);
    }

    if (uniqueItems.size >= expectedTotal) return [...uniqueItems.values()].slice(0, expectedTotal);
    if (payload.items.length < pageSize) break;
  }

  if (uniqueItems.size < (expectedTotal || 0)) {
    let reason = "GitHub issue pagination stopped before total_count; refusing a partial queue";
    if (received > uniqueItems.size) reason = "GitHub issue pagination overlapped or skipped records; refusing a partial queue";
    else if (expectedTotal > pageSize * maxPages) reason = "GitHub issue search exceeded the configured 1,000-result paging cap; refusing a partial queue";
    throw new Error(reason);
  }
  return [...uniqueItems.values()];
}
