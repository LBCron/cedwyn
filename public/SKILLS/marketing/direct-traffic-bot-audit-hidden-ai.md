# Direct-traffic audit: strip bots, find hidden AI visits, annotate tag outages
Date: 2026-11-04 · Source type: practitioner analysis of 12 GA4 properties + incident reporting

## Why
"AI traffic hides in Direct" is widely believed. Kevin Indig (Growth Memo, 19 Oct 2026) tested it on 12 GA4 properties (Aug-Sep 2026; homepages and unknown landings excluded):
- 8 of 12 showed Direct growth, some over 100%. Most of it was bots: one site logged 409,000 Direct sessions, of which 198 were engaged.
- Filtered Jan-Sep sample: total Direct +140.9%, engaged Direct -1.0% (monthly counts) / +2.3% (average daily volume). Flat.
- Direct sessions with identifiable AI traces: 0.003% of Direct on average.
- Counter-example: Eric Wu (Ramp, via the Siege Media Podcast) attributed 30-40% of Ramp's Direct to answer engines. Method: Direct growth on long blog URLs nobody types, minus email-campaign patterns, compared with organic visitors on time on page, scroll depth and clicks, then confirmed by self-reported attribution.
- Known outage: from 8 to 16 Oct 2026, ChatGPT's outbound links lost the utm_source=chatgpt.com tag. Most ChatGPT clicks carry no referrer, so those visits were counted as Direct. Search Engine Roundtable's comparison (9-13 Oct vs the week before, cited by Arcalea): ChatGPT-attributed visits about -31,000/day, Direct about +26,000/day on the same pages. Direct rose on 2 of every 3 pages that lost ChatGPT traffic. Adobe's Cedric Huesler reported that OpenAI called it a bug (14 Oct), with the fix rolling out from 15 Oct. That report is second-hand. Gemini appears to have started adding UTMs to some links around 1 Oct; Google has not documented this.

## How-to (monthly, about 20 min)
1. **Strip bots first.** Break Direct down by day, landing page, country, browser, OS, browser version and screen size. Flag sudden growth concentrated in one browser configuration with zero or low engagement. From then on, report engaged Direct only.
2. **Exclude naturally-direct pages:** home and regional roots, index aliases, untracked landings, pricing/plans, login/account/dashboard, checkout and confirmation, help/about/privacy, internal search.
3. **Long-tail Direct = candidate AI visits.** Count engaged Direct landings on deep URLs (long slugs, evidence/record pages) that nobody would type. Drop email-campaign signatures: spikes on send days, newsletter-linked URLs, and mail-app user agents.
4. **Behaviour match.** Compare those landings with organic search landings on the same pages (time on page, scroll, next click). Similar behaviour supports "probably AI or search-like". It is not proof.
5. **Confirm only with self-reports.** Use the "Where did you first hear about us?" answer (see self-reported-attribution-hdyhau-survey.md and tools/hdyhau_code.py). Without it, label the number "candidate", never "AI traffic".
6. **Annotate tag incidents.** Mark 8-16 Oct 2026 (ChatGPT tag loss) and 1 Oct 2026 (Gemini UTMs, undocumented) on every chart. Never multiply the gap back as a correction factor; Arcalea warns against it. Compare the same pages before and after instead.
7. Report three rows: raw Direct, engaged Direct (non-naturally-direct pages), and tagged AI referrals. Keep raw counts beside percentages.

## Pitfalls
- Raw Direct growth is usually bots, scrapers or prefetch. Never celebrate it unfiltered.
- One-person accounts of a vendor bug are second-hand. Quote them as such.
- Small sites have tiny counts. Show raw numbers and do not compute shares under ~30 sessions.

## How we apply it to Cedwyn
- The site has no GA4. Use Cloudflare analytics/logs (the same source as cf_traffic.py in the growth report). Run the bot strip on the existing "non-US HTML 200" visitor proxy by user agent + country + path, and keep only requests that also load page assets or carry a second pageview.
- Candidate-AI pages: deep evidence-catalogue, /research/ and /wiki/ record URLs, /movie/ scenes. Exclude /, /ebooks/ checkout and confirmation, /learn/ login, /hive/ and the agent-facing /academy/, /llms.txt and /agents.json (machine traffic).
- Add the 8-16 Oct 2026 annotation to the Sunday growth report charts and to the AI referral ratio (ai-referral-ratio-per-100-organic-benchmark.md). October ChatGPT counts are a floor.
- PROPOSAL (growth report owner): add the "engaged long-tail Direct" row weekly. Label it "candidate, not confirmed" until the /ebooks/ "where did you hear" answers mention an AI tool.
- Zero spend, read-only, no tool installed.

## Sources
- growth-memo.com (Kevin Indig, 19 Oct 2026; read in full)
- arcalea.com (Arcalea, 29 Oct 2026; cites SER and SEJ for the -31k/+26k figures and Huesler's account)
- onlyaclick.com (search snippet only, not read)