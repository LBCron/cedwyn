# AI Overview citations: only 38% come from the top 10 -> cover the fan-out, use YouTube

Harvested 2026-11-04. Topic: SEO / AI visibility (Google AI Overviews).

## The evidence (primary, read in full)
- Ahrefs, Louise Linehan, "Update: 38% of AI Overview Citations Pull From The Top 10", 2 Mar 2026. Data: 863K keyword SERPs, 4M AI Overview URLs (Ahrefs Brand Radar).
  - All SERP blocks: 37.9% of AIO-cited URLs also sat in the first 10 blocks for the same query; 31.2% in 11-100; 31.0% beyond 100.
  - Blue links only: top 10 37.1%, 11-100 26.2%, not in top 100 36.7%.
  - July 2025 study: ~76% came from the top 10. Ahrefs reads the drop as Gemini 3 (AIO model since Jan 2026) leaning on "query fan-out" sub-query SERPs, which Google has confirmed it runs.
  - YouTube: 18.2% of cited pages that did NOT rank in the top 100 were YouTube URLs; YouTube = 5.6% of all AIO citations and the most cited domain in AIOs (+34% in six months, per Brand Radar). Ahrefs' 75K-brand study: YouTube mentions (titles, transcripts, descriptions) were the strongest correlate of AIO visibility.
- Quote used by Ahrefs (Ethan Lazuk): "we're no longer optimizing for individual keywords but rather entire user journeys, and those fan-out queries guide the way."
- Caveat: one vendor's dataset; correlation, not a controlled test. AIOs change roughly every 2 days (see ai-citation-stability-days-cited-of-7.md).

## How to do it (zero spend)
1. Pick one target question. Write down 8-12 likely fan-out sub-questions (who, when, where, what record, what it looked like, how to visit/read more, comparisons). Free helpers named by Ahrefs: Qforia (iPullRank), WordLift "AI Visibility Fan Out"; or ask any assistant "what sub-searches would you run to answer X?" 3 times and keep the recurring ones.
2. Make sure each sub-question has a passage on your site that answers it in 1-3 self-contained sentences under a heading that echoes the sub-question. Passages, not pages, get cited.
3. Do not treat a top-10 rank as the goal; treat "has a citable passage for each fan-out" as the goal.
4. Put the same answers into YouTube: say the entity names out loud (transcript), put them in title and description. A Short or a video can be cited even when it ranks nowhere for the head query.
5. Measure: for 10 fixed questions, log weekly whether an AIO shows, whether we are cited, and whether the cited URL is a page or a video. Compare against our own rank for that query (Search Console) to see whether we are cited from outside the top 10.

## How we apply it to Cedwyn
- PROPOSAL (ONPAGE): for the 5 core questions (e.g. history of Great House Farm / Ty Mawr Llandough; Cedwyn meaning; Leckwith history; the 1987 case name as a neutral record; where to read the e-books), list fan-outs and add one short, sourced Q-and-A passage per gap on the matching Cedwyn page. Neutral wording, banned-words list applies, no outbound links, never name the owner.
- PROPOSAL (EPISODE): YouTube Shorts descriptions already lead with the shop line and documentary line; add the place names and dates spoken in each clip to the description and make sure captions are on, so the transcript carries the entities.
- The weekly VISIBILITY CHECK run can add one column "cited URL type (page/video)" and "our GSC position" to scores.csv.

## Sources
- ahrefs.com (read 2026-11-04)
- ahrefs.com (the July 2025 76% study, snippet only)
- searchenginejournal.com (secondary, snippet)