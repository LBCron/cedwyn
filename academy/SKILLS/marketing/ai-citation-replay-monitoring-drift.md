# AI citation monitoring by replay: per question, every two weeks, expect drift

Date harvested: 2026-11-04. Topic: analytics for AI search visibility (how to measure, not how to optimise).

## The evidence (primary source)
Chen & Koudas, arXiv:2610.15033v1 (University of Toronto, 10 Oct 2026). They replayed the questions through the
engines' own APIs to see which pages each engine's search retrieved, at what rank, and which were retrieved but not
cited.
- Every page ChatGPT cites is one its own search retrieved. Retrieval explains 32% of within-site variation vs 2.8%
  for page properties.
- Rank inside the engine's own search decides citation: ChatGPT cites 57.1% of pages it ranks first and 8.3% of
  those at ranks 11-20 (niche market).
- The engines rewrite the question on every answer: two same-day runs of ChatGPT share 2.7% of their sub-queries
  (Jaccard) and 15% of cited pages. Their results almost never match Google's or Bing's, even Gemini's. A good classic
  rank is NOT a proxy for AI citation.
- Ranking follows meaning more than keywords (embedding similarity rho 0.20 vs BM25 0.08).
- Drift: within a 14-day window 63-67% of the citation pattern repeats; two weeks later 40% (ChatGPT), 47% (Gemini),
  22% (Perplexity) is still shared; ten weeks later 14%, 29%, 0%.
- robots.txt blocking does not keep pages out: 7.1% of pages ChatGPT cites disallow OAI-SearchBot; 19.9% of those
  Gemini cites disallow Googlebot (read at download time).
- Forum pages get +78% citations vs articles within site, lists +13%; Reddit is 2.2% of ChatGPT and 13.1% of Gemini
  citations, but ChatGPT rarely cites Reddit threads it retrieved at equal rank.

## How to do it
1. Fix a question set (30-50 real questions, same wording each time) and keep it in a file.
2. Every 14 days (drift makes monthly too coarse for Perplexity, weekly too noisy), ask each question 3 times per
   engine (single runs are noise: 15% page overlap between same-day runs). Record per question: brand named yes/no,
   our page cited yes/no, which third-party pages cited, and position.
3. Report per question, not as one score; flag questions where a competitor or a third-party page appears that
   could name us.
4. Where an API with web search exposes the search results or sources, log retrieved-but-not-cited pages too:
   retrieved-not-cited means the page was found but lost at selection (make it more concise/original); not
   retrieved means fix the question match or get a third-party page.
5. Treat changes under ~2 runs as noise; act on patterns that persist across two windows.
6. Free tooling: a stdlib/pandas script over a CSV is enough; no paid tracker needed.

## How we apply it to Cedwyn
- The weekly VISIBILITY CHECK (Monday 07:30) asks the connected Grok 5 fixed questions (repeat count not checked in its RUNNER). Proposal for its
  RUNNER: (a) run each question 3x and count named/cited per run; (b) keep the result per question in scores.csv;
  (c) treat one-week swings as noise, compare 14-day windows; (d) add 5 question-phrased queries taken from Search
  Console. Zero spend; only engines already connected (no new paid API keys).
- Do not read classic Google rank as AI visibility; record both separately.
- Do not change robots.txt to "get into" AI answers on the basis of this study alone; keep OAI-SearchBot allowed
  (blocking does not reliably remove pages, allowing costs nothing).
- Log changes we make (titles, answer paragraphs, third-party listings) with dates beside the scores so a later run
  can see what moved after what.

## Sources
- arxiv.org (sections 5.3, 6, appendix C read, 4 Nov 2026)