# AI citations split by intent: advice questions cite reference/official sources, "choose a provider" questions cite brands (2026)

Skill harvested 2026-11-04. Topic: SEO / AI visibility measurement.

## What the sources show (with numbers)
- **Semrush AI Visibility Index mini study "Your Money or Your Life: AI Citation Patterns When Stakes Are Highest"** (published Sept 2026; 22 topics, YMYL vs everyday commercial, 4 platforms: ChatGPT, Google AI Mode, Google AI Overview, Gemini; US data with a UK cross-check). The full report is behind a download form, which we did not submit. The landing page lists 3 findings: AI leans more on government sources and less on community content for YMYL; user intent decides whether brand-owned domains are cited; each platform has its own "Citation Core" (a recurring set of sources).
- **The one number we have from inside the report**, posted by Semrush's Eli Goodman on LinkedIn: brand-owned sites are **20.6% of AI citations in credit cards but 0.6% in legal services**. Both are high-stakes, so risk alone does not explain it. Intent does. When people are *choosing a provider*, AI cites the brands. When they *ask for advice*, brand domains largely disappear and AI turns to governments, independent authorities and reference sources. His conclusion: an overall AI visibility score is not enough. Measure it by intent and by journey stage.
- **Otterly.AI, 27 Aug 2026** (16 brand reports across 14 industries, one tracking setup). In mid-August 2026 ChatGPT cut reddit.com citations from **497 to 132 per day (-73.4%)**, while its total citations **rose 3.5%** (36.1k to 37.4k per day). Other engines (Google, AI Mode, Gemini, Perplexity) were flat at -0.6%. What filled the gap, counted as the number of reports moving each way:
  - Reddit fell in 16 of 16. News and media fell in 11 of 12.
  - Encyclopedia and reference sources rose in 4 of 5. Official brand pages rose in 10 of 15.
  - Government and NGO sources were split.
  - Examples: sec.gov and irs.gov replaced Reuters. MIT OpenCourseWare and PMI replaced Reddit in the Udemy report.
  - Their method point: always carry the denominator (the engine's total citations) beside a domain's count. Otherwise a quiet week looks like a loss.
- Background, older data: Semrush's Sept 2025 AI Visibility study found Reddit in 176.89% of ChatGPT finance answers. That pattern is what August 2026 reversed in ChatGPT only. The landscape moves in steps, so re-measure and don't rely on old rankings.

Caveats: Semrush and Otterly both sell AI-visibility tools. Semrush's full method is not seen (download form). Otterly counts directions, not sizes. The UK cross-check figures are not seen.

## How to do it (steps)
1. **Tag every tracked question by intent.** Use three buckets: ADVICE/KNOW ("what happened at…", "how do I research a Welsh farm's history"), CHOOSE ("best book on…", "where to buy…") and BRAND ("Cedwyn e-book"). Keep the tag in the question list.
2. **Report AI visibility per bucket, never as one blended score.** For each bucket, record whether we were cited, which of our pages was cited, and the top 5 other cited domains (the platform's Citation Core for that bucket).
3. **Carry the denominator.** For each run and platform, log the total citations in the answer. Read "our share" as our citations divided by total, so engine-wide swings don't read as our wins or losses.
4. **Match the page to the role the engine wants.**
   - For ADVICE questions, the winners are reference-style and official pages. Make our pages read like a reference: dated facts, catalogue IDs, primary-source scans, a neutral tone, no sales copy above the fold.
   - Where the engine cites an archive or official body, the job is to be the page that body's record points to, or to be cited *alongside* it.
   - For CHOOSE and BRAND questions, a clear product page with price, format, sample and publisher facts can be cited directly.
5. **Look at each platform separately.** A win in Google AI Overview tells you nothing about ChatGPT or Gemini (each has its own Citation Core). The August 2026 Reddit change hit ChatGPT only.
6. **Re-check after step changes.** When a monitoring vendor reports a sudden shift in one engine, re-run our question set that week and annotate the log, so the change isn't misread as our content's effect.

## How we apply it to Cedwyn
- Almost all of Cedwyn's natural queries are ADVICE/KNOW: history of Great House Farm / Ty Mawr, Llandough and Leckwith, BP Properties v Buckler (1987), "Cedwyn meaning". On those questions AI should be expected to cite reference and official sources (Coflein/RCAHMW, Cadw, National Library of Wales, Wikipedia, legal reporters), not a shop. So **don't judge the /ebooks/ page by advice-question visibility.**
- **Advice pages** (/research/, /wiki/, /wales/thousand-cuts/, /nomenclature/) should use reference style: short answer first, dated facts, catalogue IDs and the primary record shown. This is already the direction of the answer-first and visible-facts skills. This skill adds the reason: on advice intent the engine is looking for reference-shaped sources.
- **CHOOSE/BRAND questions** to add to the weekly Visibility Check (Grok plus whatever else we can query), tagged CHOOSE:
  - "best book on the history of Llandough"
  - "e-book about a Welsh farm court case"
  - "where can I read about Great House Farm Llandough"

  Score them separately from the 5 fixed advice questions. The /ebooks/ page's h1, intro facts and Book markup are what can win here.
- **Visibility log:** add columns `intent`, `total_citations` and `top5_domains` to the project workspace scores.csv. The weekly report states advice-share and choose-share separately.
- **Third-party reference listings** (library records, society bibliographies, Wikipedia mentions) are where advice-intent citations come from. Any such listing is an outward step and stays a PROPOSAL for the project lead's OK. Wikipedia edits by an interested party need disclosure under Wikipedia's conflict-of-interest rules, and we do not edit it ourselves.
- Public wording stays neutral, with no banned words. Never name the project lead.

## Sources
- ai-visibility-index.semrush.com (landing page read 2026-11-04; report behind form, not submitted)
- linkedin.com (Semrush's Eli Goodman, 20.6% vs 0.6%, read)
- scalevise.com (coverage: 4 platforms, 126M-prompt index, no extra numbers)
- otterly.ai (read; 16 reports, -73.4%, control +3.5%)
- semrush.com (Sept 2025 baseline, Reddit 176.89% ChatGPT finance)