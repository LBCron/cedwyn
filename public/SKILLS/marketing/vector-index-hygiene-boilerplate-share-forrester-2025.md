# Vector index hygiene: keep repeated boilerplate out of the chunks AI retrieves

Source: Duane Forrester, "Vector Index Hygiene: A New Layer of Technical SEO", Duane Forrester Decodes (Substack), autumn 2025 (his 2026 piece calls it "last year"; exact date not checked), read in full 4 Nov 2026:
duaneforresterdecodes.substack.com
Supporting papers he cites: "Lost in the Middle" arxiv.org ; chunking trade-offs arxiv.org
Status: a practitioner framework with no numbers of its own. Big engines very likely strip cookie banners themselves; the open question he raises is whether a page that is mostly repeated text looks lower-utility. Our own measurement below is real; the effect on citations is not checked.

## The idea
AI search retrieves chunks, not pages. A chunk mixing topics embeds as mush; identical blocks repeated across pages make identical vectors that compete with the unique text; sidebars, CTAs and footers get chunked and retrieved as if they were content. Hygiene = canonicalisation for the retrieval era.

## Five pollution types
1. Bloated blocks (one section, several topics).
2. Boilerplate duplication (same intro/promo/notice on many pages).
3. Noise leakage (nav, CTAs, footers, banners chunked as content).
4. One chunk shape for every content type (FAQ vs guide vs record need different sizes).
5. Stale embeddings (only matters for indexes we run ourselves, e.g. a site chat/RAG).

## Practice for a publisher
1. Measure: share of each page's words sitting in lines repeated on 3+ pages. Tool: tools/boilerplate_share.py URL... (requests + lxml, no install). Target under ~15% on money and record pages (our working line, not Forrester's).
2. Move repeated blocks out of the served HTML of human pages, or shrink them to one short line + link. Agent-facing material belongs on agent pages (/academy/, llms.txt, agents.json), not inline.
3. One topic per H2 section, a self-contained first sentence per section (it is the chunk's label).
4. Vary intros and summaries; never paste the same 200-word block on every page.
5. Date, language and source on every block that matters (visible "updated" line + dateModified).
6. If we run our own retrieval (site chat): strip boilerplate before embedding, tag chunks with type/date/URL, re-embed after a model change, use hybrid (keyword + vector) search.

## How we apply it to Cedwyn (measured 4 Nov 2026 11:13Z, 8 live pages, lines on 3+ pages)
| page | words | repeated |
|---|---|---|
| / | 1,165 | 5.1% |
| /ebooks/ | 2,302 | 12.0% |
| /learn/ | 1,254 | 4.7% |
| /academy/ | 1,298 | 4.5% |
| /movie/ | 2,203 | 37.9% |
| /review/ | 1,591 | 52.4% |
| /chess/ | 1,461 | 18.9% |
| /maps/ | 1,305 | 63.9% |
Biggest repeated blocks in the served HTML (whether hidden by CSS was not checked):
- a 558-word "CEDWYN SNOWBALL - FIRST READ FOR ALL AGENTS" protocol block on 3 of the 8 pages;
- a 217-word "Page versions & agent info / change log" block on 5 pages;
- a 59-word "For AI agents (e.g. ChatGPT) acting on behalf of a signed-in contributor..." notice on all 8.
On /maps/ and /review/ more than half of what a crawler reads is that shared text, so the chunk an AI retrieves for "Llandough maps" may be the agent protocol, not the maps.
PROPOSED (page freeze holds; log, do not commit; owner: site flywheel / agent-library cycle):
1. Remove the 558-word snowball block from human pages' HTML; link to /academy/ with one line. This also matches the standing rule that agent text never sits on human pages.
2. Collapse the version/change-log block to the dropdown + (i) modal loaded on click, so its table is not in the initial HTML of every page (check the version standard still passes).
3. Shorten the 59-word agent notice to one sentence or move it to agents.json.
4. Re-run tools/boilerplate_share.py after the freeze lifts; target under 15% on /ebooks/, /maps/, /review/, /movie/. Log before/after in the project workspace
5. Watch: Search Console impressions for /maps/ and /review/ 4 weeks before/after (effect not checked; no promise).