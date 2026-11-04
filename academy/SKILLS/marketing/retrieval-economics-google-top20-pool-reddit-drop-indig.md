# Retrieval economics: why AI citations follow Google top-10/20 (Indig on the Sept 2025 Reddit drop)

Sources (read 4 Nov 2026):
- Kevin Indig, "Decoding Google's Role in Reddit's Recent ChatGPT Citation Dip", G2 Learn, 2 Oct 2025. learn.g2.com
- Semrush blog, "Reddit's citations in ChatGPT fall from 3.8% to 0.5%" (2026), recaps the 2025 drop and Indig's explanation. semrush.com
Indig led SEO/growth at Shopify, G2 and Atlassian and writes Growth Memo; the G2 piece uses data from Profound (a G2 partner). His causal story is a reasoned hypothesis, not confirmed by OpenAI or Google.

## What happened (figures NOT CHECKED)
- Around 10 Sep 2025 Google removed the `&num=100` results parameter. SERP-data vendors (whom OpenAI reportedly buys search data from) could then cheaply see only the top ~10-20 results.
- Ahrefs: 57.8% of Reddit's keywords rank outside the top 20, so those Reddit URLs stopped entering ChatGPT's candidate pool.
- Semrush (230,000+ prompts): Reddit cited in ~60% of ChatGPT responses early Aug 2025 -> ~10% by mid-Sep 2025.
- Profound data: Wikipedia's visibility rose as Reddit's fell — canonical, structured, consistently top-ranked pages filled the gap.
- Reddit's stock fell 14.4% in five days (26 Sep -> 2 Oct 2025).
- A second, separate drop came 14 Aug 2026 (Promptwatch 3.83% -> 0.52%), covered in post-reddit-citation-source-mix-audit; OpenAI states it sets no fixed visibility per site.

## The transferable rule
Live retrieval for answer engines is cost-optimised: it pulls from sources that are cheap to fetch, easy to refresh and consistently structured, and for ChatGPT that candidate pool appears to be fed by *Google's first page or two*. An API or licensing deal does not guarantee citations. So:
1. **Gate = top-20 Google rank for each sub-query**, not for the head term. A page ranking 25th for a facet is invisible to retrieval, however good it is.
2. **Upstream plumbing changes move citations overnight.** A citation drop may be a pipeline change, not your content. Check a known third-party domain (Reddit, Wikipedia) in the same week before rewriting anything.
3. **Canonical + structured beats conversational** when the pool shrinks (Wikipedia effect).
4. Don't build a strategy on one channel being cited (the "Reddit SEO" lesson, twice in 12 months).

## How-to (monthly, 20 minutes, free)
1. Take the facet list from query-fan-out-answer-a-facet (8-15 sub-queries per e-book).
2. For each facet, record our best URL's Google position from Search Console (Performance -> Queries, filter query; average position, last 28 days). No paid rank tracker needed.
3. Bucket: 1-10 = in pool; 11-20 = at the edge; 21+ = out of pool. Only buckets 1-20 are worth AI-citation work; 21+ need classic SEO first (internal links, a dedicated H2/page, title match).
4. When the weekly AI visibility check shows a sudden fall, first test a control: ask the same prompts and count Reddit/Wikipedia citations. If they moved too, log "pipeline change" and do not rewrite pages that week.

## How we apply it to Cedwyn
- Add a "Google position" column (from the connected Search Console, read-only) beside each facet in the weekly visibility check; mark in-pool / edge / out. Priority list for onpage work = facets at 11-20 (cheapest to lift into the pool).
- Our natural "Wikipedia-like" assets are the evidence catalogue and dated record pages: keep them canonical (one URL per record, stable titles, `@id` graph per the machine-readable-content-stack skill) so they qualify when pools shrink.
- Bing: ChatGPT's search has historically leaned on Bing too (2026 share not checked); Bing currently shows 0 pages indexed (the project lead's open task: import from Search Console). Until that is done, treat ChatGPT citation numbers as capped.
- Reddit stays research-only (our standing rule: no Reddit by script); this source is one more reason not to invest there for AI visibility.
- Lead NOT made a skill this run: Similarweb's AI Traffic Tracker advertises per-landing-page chatbot prompts ("the prompts behind the clicks") as a facet source; free tier and data coverage for a ~450 visits/day site are not checked (likely below panel threshold; login needed). Use Search Console queries + our own Cloudflare referrers instead.