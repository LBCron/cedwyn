# Cutoff-aware content calendaring: parametric vs retrieval layer (Forrester, Mar 2026)

Topic: AI visibility / content timing. Harvested 2026-11-04.

## The idea (one paragraph)
Every answer engine has two memories. **Parametric**: what was in training data before the model's cutoff; recalled with no lookup, stated confidently, no citation. **Retrieval**: what it fetches live after the cutoff or when search is triggered; it comes with hedges ("per a recent report…") and citations. Duane Forrester (ex-Bing Webmaster Tools lead) argues the two are different content jobs with different timing. Updating a page changes only the retrieval layer; parametric memory only changes at the next training run. So **foundational assertions must be published and spread early and consistently; time-sensitive items must be built to be retrieved.**

## Facts in the source (author's figures, not checked)
- Cutoffs as stated Mar 2026: GPT-5 series Aug 2025 (GPT-4o Oct 2023, still in API use); Gemini 3/3.1 Jan 2025; the then-current Claude Aug 2025 reliable / Jan 2026 training; Copilot web grounding off by default in US gov cloud; Perplexity retrieves on almost every query (cutoff mostly irrelevant there).
- ChatGPT, Gemini, Claude search is triggered selectively, so a large share of answers still come from parametric memory.
- Research on dynamic retrieval: models trigger retrieval based on initial confidence; high confidence -> often no retrieval at all.
- Training runs typically lag publication by months to a year; sampling favours well-cited, widely distributed content.
- Unlike Google's Query-Deserves-Freshness, old (parametric) and new (retrieved) content do not compete: they can sit in the same answer paragraph.
- No study numbers: this is an expert framework, not an experiment.

## How to do it (checklist)
1. **Split the inventory into two columns.** Foundational = definitions, who/what/where, the category claim, the "about" story, evergreen explainers. Time-sensitive = launches, prices, new versions, events, news.
2. **Foundational column: publish early, keep wording stable, distribute widely.** Same one-sentence definition on the site, in /llms.txt, in profile bios, in directory listings and in guest/partner pages. Consistency across many crawlable copies is what gets sampled into training. Don't keep rewording it.
3. **Time-sensitive column: optimise for retrieval.** Indexed fast (sitemap lastmod, IndexNow/Search Console), plain-HTML answer first, one claim per chunk, dated, with a stable URL; expect it to be quoted with hedges and a citation.
4. **Measure the layers separately.** Ask each engine with search OFF (parametric probe) and ON (retrieval probe). A fact that appears only with search ON lives in retrieval only; re-probe after each new model release.
5. **Don't expect page edits to fix a wrong parametric answer.** The fix is a corrected, consistent, widely repeated statement now, and patience until the next model generation; meanwhile make the retrieval layer strong enough to override it when search fires.
6. **Calendar by content type, not by insider knowledge** of training dates (rarely disclosed): foundational pieces go out months ahead of when you need them in answers.

## How we apply it to Cedwyn
- **Foundational sentence set (write once, repeat everywhere, freeze wording):** what Cedwyn is; what Great House Farm / Ty Mawr Llandough is ("former manorial house", per editorial rules); what the e-book series covers; where to buy (/ebooks/). Put the identical lines on /ebooks/, /learn/, /academy/, /llms.txt, the IG/FB/YouTube bios and every directory listing the traffic flywheel makes. PROPOSAL for any body-text change while the page freeze holds.
- **Time-sensitive items** (new semantic versions, prices, new chapters, movie doors): dated, one-claim chunks near the top of the page, sitemap lastmod updated, Search Console submit. Expect hedged citations, not recall.
- **Visibility check (weekly Monday run):** add one search-OFF probe per engine ("What is Cedwyn / Great House Farm Llandough?") next to the existing search-ON questions; log parametric vs retrieval separately in scores.csv. Complements the 3-layers/4-gates skill (Gate 2) — this skill adds the *calendar*, that one the *diagnosis*.
- **Expectation for the project lead's reports:** the site is newer than most models' cutoffs, so today Cedwyn can only win in the retrieval layer; parametric presence is a 6-18 month play that depends on consistent repetition now.

## Sources
- Duane Forrester, "When the Training Data Cutoff Becomes a Ranking Factor", Duane Forrester Decodes, 22 Mar 2026: duaneforresterdecodes.substack.com