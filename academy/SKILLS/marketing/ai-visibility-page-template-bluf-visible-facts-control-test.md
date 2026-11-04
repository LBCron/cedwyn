# AI-visibility page template: answer first, facts in visible text, crawler tiers, one-change tests (Similarweb, 3 Nov 2026)

Read 4 Nov 2026. Source: Shai Belinsky (Similarweb), "How Publishers Can Improve AI Visibility: 12 Tips Ranked by Confidence and Effort", 3 Nov 2026
aisearch.similarweb.com
It cites: Princeton GEO-Bench (already in ai-answer-citations-geo-sources-quotes-stats.md), Kevin Indig's 18,012 ChatGPT citations (Growth Memo), Pew Research (68,879 Google searches, 900 US adults, Mar 2025), searchVIU JSON-LD test (Oct 2025), OpenAI crawler docs, Google's May 2026 AI features guide. Not each checked at source.

## Context numbers
- Google Search referrals to hundreds of publishers fell 40% Jul 2025 -> Jul 2026 (Chartbeat via Reuters Institute).
- AI referrals to news sites: 44.5M visits/month worldwide, +115.6% YoY, still under 2% of organic search volume for US news.
- Pew: with an AI summary, people clicked a normal result in 8% of visits vs 15% without; clicked a link inside the summary in 1%.
- Explainers, background pieces and profiles sit closest to AI answers (AIO is off for breaking news).
- Example (foxnews.com, Apr-Sep 2026): AI chatbots = 0.19% of traffic; homepage took 35% of AI visits, but ChatGPT rarely CITES homepages: cited pages sit several folders deep.

## The template (best-supported first)
1. Original data + named source in one sentence: number, name and source together.
2. Answer first (BLUF): the main fact in the first sentence of the page and of each section.
   Indig: 44.2% of 18,012 ChatGPT citations came from the first 30% of the text.
3. Refresh evergreen explainers: new facts, visible "updated <date>" in the text.
4. TL;DR of 40-100 words on long explainers only (no test shows the label alone earns citations).
5. Sections that stand alone: descriptive subhead, one question, 3-4 sentence paragraphs (Google: chunking not required; write for readers).
6. Tables for comparable facts (timelines, prices) with a one-line takeaway above.
7. FAQ of 3-5 real follow-up questions at the end of explainers/profiles.
8. Crawler access by bot type: OAI-SearchBot (ChatGPT search results) is separate from GPTBot (training); allow the first even if blocking the second. Check server logs for 200/403/429 to AI bots; check CDN one-click AI blocks don't block retrieval bots.
   Google AI Overviews/AI Mode opt-out toggle in Search Console: tested in the UK from 3 Jun 2026, worldwide by 31 Aug 2026; opting out means no traffic from those features. Leave it ON (included).
9. Indexed and snippet-eligible (no nosnippet), canonicals right, accurate dates, lastmod in sitemap.
10. Key facts in VISIBLE HTML text: searchVIU put a price only in JSON-LD; none of ChatGPT, Claude, Perplexity, Gemini or AI Mode extracted it on live fetch. Check with JavaScript off.
11. Article schema with named Person author + Organization sameAs: low cost, no proven lift.
12. Test one change at a time against a control group of similar pages, over several weeks.

## How we apply it to Cedwyn
- Ebook and evidence pages: make sure title, price, version and the one-line "what this record shows" are in visible HTML, not only in JSON-LD or JS (the version dropdown/price must render server-side or in a no-JS fallback). Spot-check 5 pages with JS off; log as ONPAGE fixes.
- Explainer pages (/research/, /wiki/, place profiles): first sentence states the dated fact with its record source; visible "updated" date; FAQ of 3-5 questions from Search Console queries.
- Cloudflare AI crawl controls: confirm OAI-SearchBot, PerplexityBot and Claude/Google retrieval bots get 200 on cedwyn (AI crawler check already in the visibility runner); Search Console generative-AI setting stays included.
- Run tip 12 as the ONPAGE flywheel's test method: change 3-5 pages, keep 3-5 similar pages as control, compare AI mentions/citations and clicks after 3-4 weeks (pair with ai-citation-stability-days-cited-of-7.md, since day-to-day citations churn).
- Editorial rules apply to all page text (never name the project lead, banned words, neutral dated wording).