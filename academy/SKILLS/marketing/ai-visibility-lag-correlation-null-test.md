# Does AI visibility move traffic? Lag-correlation test with a fair null
Date: 2026-11-04 · Source type: practitioner experiment (4 brands, 632 tests)

## Why
Teams chart "AI share of voice" against Direct or branded search, find r = 0.7 at some lag and call it impact. Kevin Indig (Growth Memo, 19 Oct 2026) ran 632 tests across 4 brands: weekly AI visibility against branded search impressions and Direct, at lags of 0-6 weeks.
- First pass: one site had r = 0.72 (AI SoV vs Direct, peak at 3 weeks) and r = 0.59 with branded impressions. Another had r = 0.47 (ChatGPT mention rate vs Direct).
- Fair null: he shifted the AI series against traffic, keeping each series' order. When every mismatched alignment got the same 7 lag choices, and kept its best, several wrong alignments matched or beat the real one.
- Split-half: one site's link sat only in the second half, the other's only in the first. Usable weekly observations at the chosen lag: 17 and 35.
- Verdict: no reliable link across the 4 brands. An effect may exist but could not be isolated. Measure with self-reported attribution plus triangulated leading indicators instead.

## How-to
1. Build weekly series: AI visibility (mentions or citations over a fixed prompt set, platforms and markets) and the outcome (branded impressions from Search Console, engaged Direct, sales).
2. Pre-register: name ONE metric pair and ONE lag before looking. If you must search lags 0-6, apply the same search to the null.
3. Null: generate many shifted or circularly-rotated versions of the AI series. For each, take the best r over the same lags. Real p is roughly the share of nulls with r >= real r. Below ~0.05 counts as signal; otherwise none.
4. Stability: split the period in half. Count it only if both halves agree in sign and roughly in size.
5. Minimum data: below ~30 weekly points, report "insufficient data" and skip the conclusion.
6. Detrend first (week-over-week differences). Two rising lines always correlate.
7. Monthly report: exposure (prompt-set visibility), discovery (self-reported "where did you first hear", in the buyer's own words, naming the AI tool), and outcome (sales/signups from those people). If visibility rises but no buyer mentions AI, check whether the prompt set matches how buyers actually research.

## Pitfalls
- Picking the best of 7 lags, then testing the null at only that lag, inflates significance. This was Indig's own first mistake.
- Many brands x metrics x lags guarantees an impressive r somewhere.
- Weekly AI visibility from a small prompt set is noisy, so use the same prompts every week.

## How we apply it to Cedwyn
- The weekly VISIBILITY CHECK already asks the connected Grok 5 fixed questions and counts mentions. That is the exposure series (5 prompts, 1 platform: very noisy). Never claim from it that "AI drove sales/traffic" before about 30 weeks of data AND a passing shifted-null test.
- Outcome series: Search Console branded impressions (Cedwyn / Great House Farm / Ty Mawr Llandough queries) and engaged long-tail visits (see direct-traffic-bot-audit-hidden-ai.md).
- Discovery series: the /ebooks/ "where did you first hear" answers, coded by tools/hdyhau_code.py.
- PROPOSAL (growth report owner): one line in the Sunday report: "AI mentions x/5 · branded impressions n · buyers naming an AI tool k". Label any correlation "not tested" until the null test has been run.
- The null test is about 20 lines of stdlib Python (rotate list, pearson). Write it only when there are 30 or more weekly rows. Nothing installed this run.

## Sources
- growth-memo.com (Kevin Indig, 19 Oct 2026; read in full)
- growth-memo.com (now titled "The usefulness of attribution for AI Search", 28 Sep 2026, with George Bonaci of Ramp; paywalled, only the summary was read)