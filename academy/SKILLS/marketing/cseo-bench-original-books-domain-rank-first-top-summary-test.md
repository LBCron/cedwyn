# Test rewrite tactics against search position first: C-SEO Bench, original paper, books-domain numbers

**Topic:** whether rewriting a page "for AI answers" (adding statistics, quotes, an authoritative tone, technical terms, a summary at the top) moves it up an AI answer's citation list, compared with ranking higher in the search results the AI reads. For the e-book shop, read the **Books** column.
**Source read in full:** Puerto, Gubri, Green, Oh, Yun, "C-SEO Bench: Does Conversational SEO Work?", arXiv 2506.11097 v3 (20 Oct 2025, NeurIPS 2025 Datasets & Benchmarks; Parameter Lab / NAVER AI Lab). This is an academic benchmark, not a vendor, and its code and data are open (github.com, CC BY 4.0). We already had the Hobo Web audit's summary of it (geo-tactic-triage-...-hobo-2026.md, marked not checked). This file checks his figures against the paper and adds the parts he left out.

## What the paper did
- **Six domains**, each a set of 7-10 real documents per query that an LLM ranks and cites:
  - product recommendation: retail, video games, **books** (249 short "books by mood/theme" queries, about 9 Google Books descriptions each);
  - question answering: web, news, debate.
- **Ten rewrite methods.** Eight come from the GEO paper (Aggarwal 2024): Authoritative, Statistics, Citations, Fluency, Unique Words, Technical Terms, Simple Language, Quotes. Two are new:
  - *Content Improvement*: all eight at once;
  - *LLM Guidance*: an llms.txt-style markdown summary put at the top of the document, in the form "# Title / > intro paragraph / ## sections".
- **Measure:** how many places the document's citation rank moves. Judged by gpt-4o-mini, Claude Haiku 3.5, o3 and o4-mini, with Holm-Bonferroni correction.
- **Two extra tests:** a "Best SEO" baseline (the same document simply moved to position 1 in the list the LLM reads), and an adoption-rate sweep (what happens as more competing documents use the same method).

## Results (read from Tables 3, 4 and 5)
Gain in citation rank places, Books column, gpt-4o-mini / Haiku 3.5:

| Method | gpt-4o-mini | Haiku 3.5 |
|---|---|---|
| Statistics | -0.11 | -0.60 |
| Authoritative | +0.11 | -0.34 |
| Quotes | +0.01 | -0.33 |
| Citations | 0.00 | -0.31 |
| Content Improvement | +0.11 | -0.08 |
| **LLM Guidance (top summary)** | **+0.14** | **+0.06** |
| **Position 1 in the retrieved list** | **+1.60** | **+0.61** |
| Position 2 | +1.28 | (table 5 is gpt-4o-mini only) |
| Position 3 | +0.48 | |

- Retail, the strongest domain: position 1 gave +2.77 against LLM Guidance's +0.36 (about 7.7x). Hobo's figure matches.
- On Haiku, every method was negative in all three product domains except LLM Guidance on books (+0.06) and games (0.00).
- Hobo summarises this as "0 of 10 gained". That holds for statistically significant gains; the small raw positives above are not significant.
- Adding statistics was the most harmful method (debate -0.80 and -0.85; web -0.53 and -0.58).
- **Zero-sum:** as more competitors adopt the same method, each adopter's gain shrinks towards zero (Figure 5, retail and games, gpt-4o-mini). Early adopters gain; the advantage fades at full adoption. Hobo's "+0.04 at full adoption" is read off a chart, so it is not checked to two decimals.
- **The authors' limitations:** white-hat methods only, documents in a frozen list (no live retrieval), and the interplay of SEO with C-SEO was not tested.

## The playbook
1. **Rank first.** Getting into the top 2 of what the engine retrieves is worth roughly 5-10x any rewrite. Spend effort on what gets the page retrieved: the query's own words in the title and first lines, internal links, sitemap, third-party mentions. Prose polish comes later.
2. **Never add statistics, quotes or citations just to impress the engine.** In the paper they lowered rank, and invented ones break our editorial rules.
3. **One rewrite is worth a small test: a short top-of-page summary** in the paper's form (title, one-line > summary, a few ## points). It was the only method that did not hurt on either judge in books. The effect is small (+0.06 to +0.14 places), so treat it as tidy-up, not a growth lever.
4. **Assume any tactic everyone copies decays.** Judge a tactic by what it does when competitors also use it, not by a first-mover win. Re-test after 3 months.
5. **Test before rolling out.** The repo runs a query + document list through a judge model. A lighter version needs nothing installed: take 5 fixed "book about X" questions, paste our book blurb and 6 competitor blurbs (from Google Books) into the connected chat model in random order, record our citation rank, then repeat with the rewritten blurb. Use 10+ orderings, because position alone moves rank by up to 1.6 places.

## How we apply it to Cedwyn
- **Priority stays retrieval.** The e-book blurbs on /ebooks/ and in Google Books, Goodreads and retailer listings should open with the words a reader searches with ("Welsh farm history", "Llandough", "Vale of Glamorgan", "land dispute 1987"). This links to the existing striking-distance and query fan-out skills; don't repeat that work here.
- **PROPOSED (page freeze holds):** a 3-line summary block at the top of each book's blurb: "# <Title> / > <one-sentence what it covers, period, place> / ## Free edition: v0.0.1 · latest £…". It mirrors what /llms.txt already does site-wide. Log it as an ONPAGE proposal; no live edit.
- **Don't run statistics/quotes rewrites** of book copy for AI, even if another skill or tool suggests it.
- **Optional test for the visibility check run:** 5 questions × 10 orderings, our blurb vs 6 Google Books blurbs on Welsh local history, before vs after the summary block. Keep it only if the median rank improves by at least 1 place across both judges available.
- Public text rules apply: never name the project lead; banned words; no outbound links.

## Sources
- arxiv.org (v3, read in full 4 Nov 2026: abstract, sections 4-7, Appendix D Table 5, Appendix E prompts)
- github.com and huggingface.co (named in the paper, not opened)
- Cross-check: geo-tactic-triage-retrieval-rerank-gate-isolation-filter-hobo-2026.md (his C-SEO figures: +2.77 vs +0.36 confirmed; "0 of 10" holds for significant gains; "+0.04 full adoption" chart-read, not checked)