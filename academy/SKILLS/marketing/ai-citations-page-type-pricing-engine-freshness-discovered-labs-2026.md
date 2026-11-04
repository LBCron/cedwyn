# Skill: Page type and engine freshness for AI citations (Discovered Labs 2M-citation study, 2026)
Written 4 Nov 2026 (skills harvest). Topic: which page-level levers actually move AI citations once domain strength is set, and how often to refresh.
Not a duplicate of: consensus-plus-information-gain (what a cited *passage* states), content-alignment-scoring (Forrester, how to read an alignment score), vector-index-hygiene (boilerplate in chunks). This file is about *page type*, *checklist effect sizes* and *per-engine freshness*.

## Source and how far to trust it
- Discovered Labs, "What actually drives AI citations: a statistical analysis of 2M AI citations across 10K pages" (Liam Dunne, Ben Moore; last updated Aug 2026; read in full 4 Nov 2026). Six months, ~2M (prompt, engine, citation) rows from ChatGPT, Claude, Google AI and Gemini; 10,000 cited pages crawled with 60+ features; domain fixed effects, FDR correction, bootstrapped Lasso, double ML, leave-one-domain-out. A technical paper PDF is linked (also posted to arXiv 2609.35077).
- Discovered Labs, "Content structure for AI search" (Dunne, 5 Jun 2026; read): answer placement and page-type templates.
- **Vendor research.** Discovered Labs sells AEO services and a tracker; the sample is B2B SaaS prompts, not heritage or books. Every figure below is theirs and **not checked**. It is observational: the effects are associations after controls, not tested interventions.
- **Internal contradiction to remember:** the summary states schema and page speed give "real, measurable gains"; the detail section states Core Web Vitals, Lighthouse score and schema showed **no significant independent effect** after controls. Trust the detail section.

## What it found (all not checked)
1. **Domain authority dominates.** AI-perceived domain authority was ~6x more influential (SHAP) than the strongest single page feature. Off-page reputation is upstream of every on-page fix.
2. **Prompt-content alignment** is the biggest page lever: standardised effect +0.37, ~3x the next signal; +1 SD alignment ~ +30% citations. (How to *measure* alignment honestly is in content-alignment-scoring-directional-two-intent-forrester-2026.md; do not duplicate here.)
3. **Checklist items are small.** FAQ block +0.07 (third-party pages, conditional on domain), TL;DR/BLUF block +0.05, author bio +0.02 (collapses after content-depth controls). None reach 0.10, the usual "small effect" bar. CWV, Lighthouse, schema: no independent effect.
4. **Page type matters on its own.** Pricing pages +0.39; listicle reviews -0.12; comparison and how-to near the reference. Holds after controlling for alignment. Their read: a pricing page is what a "how much / is it free" prompt asks for.
5. **Engines differ on freshness.** Median cited-content age: Claude 5.1 months, Google AI 6.0, Gemini 7.8, ChatGPT 8.0. Share of citations on content under 6 months: Claude 60%, ChatGPT 40%. Comparison content is cited fresh everywhere (3-6 months median); blog posts 6-10 months. Advice: set cadence to the steepest engine (Claude), so refresh key pages inside 6 months.
6. **Brand pages:** 39% of ChatGPT's unique cited URLs are brand-controlled vs 14% on Gemini. 97% of LinkedIn citations came from Google AI.
7. **Answer placement (structure post):** 55% of AI Overview citations come from the top 30% of a page; put the direct answer in the first ~500 words; match H1/title to how people phrase the question.

## How to do it (any site)
1. Fix off-page first: being named on strong third-party sites beats any template change.
2. For every buying question ("how much", "is there a free version", "which edition"), give it a page whose *type* matches: a plain pricing page with a table, and one comparison page for "which one should I get".
3. Put the answer (price, free edition, what you get) in the first 30% of the page body, not below long intros or nav.
4. Add one FAQ block and one 2-3 line summary at the top; expect small lift, so do it once and move on. Do not spend time on schema or speed *for AI citations* (they may still matter for Google and humans).
5. Show a visible "Updated <date>" line and actually refresh pricing/comparison pages at least every 6 months (sooner when a version ships).
6. Measure per engine, not "AI" in general: ask the same fixed question set in each engine and log which URL is cited.

## How we apply it to Cedwyn
Live check of cedwyn.bucklerfamily.estate at ~11:45Z 4 Nov:
- First "£" appears at word 176 of 2,641, so the price is already in the top 30%. But the 175 words before it are navigation labels (see vector-index-hygiene skill).
- No visible "Updated <date>" line on the page (only body text mentioning "updated editions").
- /ebooks/pricing/, /pricing/ and /ebooks/compare/ all return 404. There is no page whose *type* is pricing or comparison.
PROPOSED (page freeze holds; markup and new pages only, nothing committed):
1. A new /ebooks/pricing/ page: one table (book, latest version and price, earlier versions at £4.99 less per step, v0.0.1 free, bundle £19.96, Academy £49.99/month), generated from the version-standard data so it cannot drift. Two-line summary at the top: "Every book has a free edition (v0.0.1). The latest edition is £4.99 or more." Linked from /ebooks/, llms.txt and the sitemap.
2. A /ebooks/compare/ page: "Which book should I start with?" table (topic, pages, period covered, free edition yes/no), no listicle framing.
3. A visible "Edition · Updated <date>" line on /ebooks/ and each book page (also proposed in the machine-readable stack skill; do it once).
4. Add a 6-month refresh date for /ebooks/, /ebooks/pricing/ and /ebooks/compare/ to the version-standard flywheel log.
5. Weekly visibility check: log the cited URL per engine for "How much is the Great House Farm e-book?" and "Is there a free version?"; success = /ebooks/pricing/ cited.
6. Bigger lever per this study: third-party mentions (archives, history societies, Goodreads, review profiles) already covered by existing skills; keep them ahead of page tweaks.
Public text rules apply to any page copy: never name the project lead, banned words, no outbound links.

## Sources
- discoveredlabs.com (read 4 Nov 2026)
- discoveredlabs.com (listed, not read)
- discoveredlabs.com (read 4 Nov 2026)