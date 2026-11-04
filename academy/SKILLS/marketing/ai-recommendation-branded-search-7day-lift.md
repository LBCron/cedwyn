# AI recommendation -> branded search within 7 days (Similarweb downstream-impact study)

Read 4 Nov 2026. Source: Adelle Kehoe (Similarweb), "Being Recommended in AI Makes Users 2.5x More Likely to Visit Your Site", 23 Jun 2026
aisearch.similarweb.com
Also covered by PPC Land: ppc.land (not read).
Method (as stated): thousands of real user journeys (panel data) in Finance, Travel and Beauty; users asked ChatGPT an industry question, got a brand recommendation, then were followed for 7 days. Only users who had not visited the brand before and did not name it in the prompt.
Caveat: vendor study, 3 consumer categories, full report behind a form (not read). Treat the ratio as direction, not a promise for a niche heritage site.

## Findings
- Users recommended a brand by ChatGPT were 2.5x more likely to visit that brand's site within 7 days, with no AI referral click to track. When a competitor was recommended, the visit went to the competitor.
- How they arrive: about 56% of AI-influenced visits came via a search engine (mostly branded search) vs about 40% for standard visits. AI primes people to search the name.
- Depth: AI-influenced visitors viewed nearly 2x the pages and spent about 2x the time on site.
- Analytics misses it: the visit is logged as branded organic search (or Direct), and the AI answer gets zero credit.
- Rand Fishkin (SparkToro), quoted: measure it like billboard/TV lift, not last click.

## How to do it
1. Watch BRANDED search, not only AI referrals. In Search Console, filter queries containing the brand words; track weekly impressions and clicks as the AI-lift proxy.
2. Make the brand SERP clean: the brand query should return our own page first with a clear title and description; Google Business-style facts, sameAs links, consistent name everywhere.
3. Compare branded-search trend against the weeks our AI mention count rose (lag 0-7 days). Use the null test in ai-visibility-lag-correlation-null-test.md before claiming a link.
4. Ask buyers "where did you hear about us?" (one optional field at checkout or in the welcome email). Ramp found 30-40% of Direct came from AI answer engines this way (see direct-traffic-bot-audit-hidden-ai.md).
5. The study's "protect your brand with paid search" step is skipped: zero spend.

## How we apply it to Cedwyn
- Brand terms to track in Search Console (connected): "cedwyn", "great house farm llandough", "ty mawr llandough", "bucklerfamily". Add one weekly row to the Sunday growth report: branded impressions/clicks vs last week.
- Check the brand SERP for each term once a week (search, not paid). If our own page is not first, that is an ONPAGE action (title/description/canonical), proposed in the visibility findings.
- Add an optional "How did you find us?" free-text field to the e-book thank-you/welcome email (Mailchimp) with "AI assistant (ChatGPT, Gemini...)" as an example answer. Proposal only; email journeys are proposals per BRIEF.md.
- Do not credit AI for sales from branded search alone; report it as "possible AI influence".