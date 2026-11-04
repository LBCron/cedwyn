# UK AI answers lean on news; mentions are not citations (Semrush AI Visibility Index, UK benchmark)

Read 4 Nov 2026. Source: Semrush press release "Semrush Releases 2026 AI Visibility Index, Revealing Its First UK Benchmark"
semrush.com
(full study: ai-visibility-index.semrush.com , not read: download form)
Data: Jan-Jul 2026, fixed monthly prompt sets of 2.5M UK and 25M US prompts, 22 industries, 4 platforms (ChatGPT, Gemini, Google AI Mode, AI Overviews).
Note: this is a vendor's own study (Semrush sells the tracking tool). Figures are theirs; not checked against the full PDF.

## The numbers that matter for a UK site
- UK ChatGPT answers cite news more: news sites were 29.5% of citations among the top-100 cited UK domains vs 19.6% in the US.
- On Gemini, news was the top UK source category every month (16.6-23.0% of top-100 citations).
- After news, UK ChatGPT leans on trip-planning sites and marketplaces; US leans on online learning and streaming.
- Mention is not citation: fewer than half of the top-100 mentioned brands were also top-100 cited domains, every month, both markets. UK overlap: 36.7-45.3 of 100.
  Example: Tesco and Asda were both top-100 mentioned on all 4 platforms; in July Tesco was ChatGPT's 25th most-cited UK domain, Asda 606th (Gemini: 29th vs 60th).
- UK visibility is fragmented: more leading UK domains appear on only ONE platform. Do not assume ChatGPT performance carries to Gemini/AI Mode/AIO.
- Concentration: UK AI Mode's top-10 source domains took 23.2-35.8% of citations (of its top 10,000 domains) vs 12.8-15.4% for ChatGPT. AI Mode is harder to break into.
- AI Overviews is the odd one out: lowest brand-mention overlap with the other 3, and the AIO/ChatGPT pair has the lowest source overlap.

## How to do it (free, manual)
1. Keep TWO counts per platform per week: (a) was our name/site MENTIONED in the answer text, (b) was a cedwyn URL CITED as a source. Never merge them into one score.
2. Score each platform separately (ChatGPT, Gemini, AI Mode, AIO, plus Grok which we already query). A win on one states nothing about the others.
3. For UK prompts, check which NEWS domains are cited for our topic (BBC Wales, WalesOnline, Nation.Cymru, Golwg360, local papers). Those are the third-party sources most likely to carry us into UK answers.
4. Third-party authority beats self-description: every accurate independent page (news piece, museum/library catalogue entry, society journal, Wikipedia where rules allow) is a route into citations.
5. Benchmark against our own category (UK local history / heritage), not a global average.

## How we apply it to Cedwyn
- Visibility check runner (the project workspace): add a mention column AND a cited-URL column per question; record per platform. Proposed scores.csv fields: platform, question, mentioned (0/1), cited_url (blank or URL), cited_news_domains.
- For the 5 fixed questions, log which UK news domains AI cites; that list becomes the PR target list. Press only on the project lead's GO; drafts only.
- Do not report "AI visibility up" from mentions alone; the Sunday report shows mentions and citations as separate lines.
- Gemini/AI Mode/AIO checks need a browser or a manual pass (Grok is the only connected AI). Note which platform each number came from.
- Public text rules unchanged: never name the project lead, banned words, no family holdings.