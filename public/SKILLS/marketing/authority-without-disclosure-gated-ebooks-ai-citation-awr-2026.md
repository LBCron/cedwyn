# Authority without disclosure: get cited for paid/restricted content without giving it away (AWR / Fiorelli 2026)

Source type: practitioner methodology (Gianluca Fiorelli, Advanced Web Ranking blog, 2026), built on Google's documented paywall and preview controls and OpenAI's crawler split. It is explicitly a set of **hypotheses to pilot**, with no results reported. AWR sells AI-visibility tracking.

## The problem
If the authoritative source keeps its content behind a paywall, login or licence, AI answers get built from third parties that do expose it, and the owner is cited by nobody. This is an access and output-control problem, not a relevance problem. It splits into three stages: **access** (can the bot fetch it?), **retrieval** (is it matched to the query?), **answer/citation** (what may be reproduced, and who gets the citation?).

## Two implementations
**A. Google Search, AI Overviews, AI Mode** (documented by Google):
- Paywall markup: `isAccessibleForFree: false` plus `hasPart` > `WebPageElement` with `cssSelector` of the gated block. This tells Google it is a paywall, not cloaking. Googlebot must be able to fetch the gated text if you want it indexed.
- `data-nosnippet` on the gated section: a **presentation** control, not noindex. Google can use the section to understand the page but should not show it in snippets; Google states AI Overviews/AI Mode follow preview controls.
- Public context block (not nosnippet): what the resource is, who publishes it, who it is for, what it covers.
- Goal = **source decomposition**: you are cited as the official resource, and any public fact in the answer comes from elsewhere. Citation is still algorithmic and not guaranteed.

**B. LLM search (ChatGPT, Claude, Perplexity, Gemini)**: never expose the payload. Publish one **semantic proxy** per information object (Markdown or plain HTML): title, owner, scope, coverage, date, the questions it answers, and a link to the controlled resource. Put nothing in it you would mind seeing quoted word for word.
- Crawler split, e.g. `User-agent: OAI-SearchBot / Allow: /llm/` and `User-agent: GPTBot / Disallow: /llm/` (search yes, training no). Check each vendor's current docs. Google-Extended is a robots token, not a separate fetcher, so test Gemini separately.
- To keep a proxy out of normal Google results: serve it with `X-Robots-Tag: noindex` rather than relying on a robots Disallow, which can still leave a bare URL in results.
- **No doorway pages:** one proxy per real resource, not one per keyword variant.

## Pilot design (from the article)
Pick ONE gated resource that already gets some organic traffic but no AI citations. Change one thing. Track a fixed query and prompt set for 4-8 weeks:
- Google: indexed? snippet text? any gated passage leaking into a preview? official URL appearing as an AI supporting source? Search Console impressions and queries.
- LLMs: did the bot fetch the proxy (server logs)? is the owner named as the official source? which URL is cited? did the model **invent** the missing content or pin third-party assertions on you?
- Success needs both: more retrieval AND no leak of the paid payload.

## How we apply it to Cedwyn
Cedwyn's paid e-books (and newer paid versions under the version standard: latest paid, earlier versions £4.99 cheaper per step, v0.0.1 free) are exactly "restricted content".
1. **Each e-book's HTML page = the public context layer**: title, edition/version, period covered, record types used (tithe map, census, newspapers), catalogue IDs of key evidence, the 5-8 questions the book answers, price and free edition in HTML. No paid chapter text.
2. **Paid excerpts or preview chapters shown on site** (if any): wrap in a container with `data-nosnippet` and add the `isAccessibleForFree:false` / `hasPart` markup on that page. Markup only, so it fits the onpage flywheel's "fix markup, propose body changes" rule. Verify at 390 px and with a raw-HTML fetch.
3. **Semantic proxy**: Cedwyn already serves `/llms.txt` and the machine-facing `/academy/`. Add one short entry per e-book there (owner, scope, questions answered, canonical /ebooks/ link). This is a PROPOSAL for the agent-library and onpage runs: public text never names the project lead, banned words apply, nothing about holdings.
4. **Crawler policy**: check robots.txt treats OAI-SearchBot / PerplexityBot (search) separately from GPTBot / CCBot (training). Changing policy is the project lead's call, so log it as a PROPOSAL with the trade-off.
5. **Measure**: add 3 prompts to the weekly visibility check, e.g. "Is there a book on the history of Great House Farm, Llandough?". Log whether Cedwyn is named as the source, and whether the model **invents** book contents (a hallucination risk for evidence-based work).
6. Do not pilot on more than one e-book at a time; record the start date in the project workspace

## Sources
- advancedwebranking.com (Fiorelli, 2026; read 4 Nov 2026)
- Google paywalled-content structured data and `data-nosnippet` docs, as cited there (behaviour in AI surfaces not guaranteed; not checked)