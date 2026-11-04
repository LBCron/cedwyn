# Niche-brand AI citations: get named on third-party pages, match the question

Date harvested: 2026-11-04. Topic: SEO / AI visibility for a small, little-known brand (Cedwyn is one).

## The evidence (primary source, read in full HTML)
Chen & Koudas, University of Toronto, "What Drives AI Citations? Content, Retrieval and Model Knowledge in
Generative Engine Optimization (GEO)", arXiv:2610.15033v1, 10 Oct 2026 (CC BY 4.0). Two 90-day daily collections:
158,099 answers / 468,037 citations (US home internet, a few big brands) plus a replication on 55 queries in a
niche market of small B2B vendors (14,850 answers, 71,849 citations, 3,895 websites). ChatGPT, Gemini, Perplexity.

Numbers that matter for a small brand:
- A niche vendor is named mainly when a CITED THIRD-PARTY PAGE names it: x39.7 for ChatGPT (vs x4.2 for big brands).
- Without search evidence the models have no stable ranking of small vendors (64% / 67% of pairs predictable);
  search restores ~80%. Big brands are ranked from memory (75% ChatGPT, 92% Gemini). So for a small brand,
  visibility exists only when the engine's own search finds evidence about it.
- Website authority had NO effect in the niche market (-1.3% per SD vs +12.1% for big brands); only 9% of the
  variation lies between websites. Small sites are not penalised for being small.
- Question match is the one page property that passes every test: title match +26.4% per SD and best-paragraph
  match pass all five tests in the niche market, +33.6% on brand pages; on third-party pages +23.6% (title) and
  +25.7% (paragraph) in the main set.
- FAQ blocks look effective across websites (+22.5%) but not within them (-1.9%); schema.org, summary/author boxes
  and page speed likewise show no within-site gain. Pages naming more relevant entities: +11.8% per SD.
- The best-matching paragraph sits at a median 45% down the page; engines find it wherever it is.
- At equal rank, concise pages from the original source beat roundups and forums.
- Main text that needs JavaScript: -10.6% Gemini citations within site (p=0.008).
- A brand in the model's memory gets written into its searches (67% vs 11%); the authors HYPOTHESISE (not proven)
  that accurate brand-question associations plus retrievable brand and third-party pages compound.
- Caveat: commercial markets (home internet, B2B software); heritage/books not studied. Associations, not experiments,
  except the answer-step tests.

## How to do it (small brand playbook)
1. List 20-30 real questions people ask in your niche, in their words (Search Console queries, forums, PAA boxes).
2. For each question, make sure ONE concise page on your own site has a title and one paragraph that answer it in
   the question's own terms. Plain HTML text, no JS-only content. Do not bother adding FAQ/schema for AI's sake.
3. Third-party presence is the multiplier: get the brand named, accurately and next to the question topic, on pages
   the engines retrieve (directory/catalogue entries, society and library listings, review profiles, Wikipedia-style
   reference entries where notability allows, interviews, guest articles). Each must answer a question too, not just
   carry a link.
4. Name the relevant entities (places, people, record types) on each page; that broadens the questions it is cited for.
5. Re-check monthly (see ai-citation-replay-monitoring-drift.md): standing is per question and drifts.

## How we apply it to Cedwyn
- Cedwyn is the textbook niche brand: models will not know it, so it is named only when a retrieved page names it.
  Priority order: (a) question-matching titles + one answer paragraph on the existing /wales/, /research/ and
  /ebooks/ pages (e.g. "What was Great House Farm, Llandough?", "Who were the Williams family of Leckwith?");
  (b) third-party mentions that say what Cedwyn holds, next to those topics.
- Third-party targets (all PROPOSALS, outward steps need the project lead's OK; zero spend): Goodreads author/book entries for
  the e-books, local history society and heritage directory listings, library/catalogue records for the e-books,
  a Wikidata item only if notability rules allow. Never write content that names the project lead or uses banned words.
- Do NOT spend agent time on more FAQ blocks or JSON-LD for AI; keep existing markup, but re-tier it as
  good-to-have (matches ai-search-roadmap-evidence-tiers-90day.md).
- Check that key pages render their main text without JavaScript (Gemini penalty); the HyperFrames/interactive
  pages should carry a plain-text answer paragraph.
- Next BIZDEV/onpage run: pick 5 questions, rewrite 5 titles + add 5 answer paragraphs, log before/after.

## Sources
- arxiv.org (Chen & Koudas, 10 Oct 2026; sections 4, 7, 8, appendix C read)
- hobo-web.co.uk (practitioner commentary on the same study; snippet only, not read)