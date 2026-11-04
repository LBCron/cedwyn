# Owned-audience share + loyal-reader KPI (Chartbeat 2026 Publisher Playbook)

Read 4 Nov 2026. Topic: when Google referrals fall, measure and grow the channels you control (direct, internal, dark social, loyal readers) and sort content by how exposed it is to no-click AI answers.

## The evidence (with numbers)
- Chartbeat 2026 Publisher Playbook (client network, skews news/media; no site count given): Google Search referrals -40.2% YoY (Jul 2025 to Jul 2026), after -21.9% the year before. Discover -34.3% (was -6.6%). Source: Search Engine Journal, 4 Nov 2026 coverage (read); The Measure (read).
- Google Search share of all pageviews fell from ~9% (Jul 2024) to ~5% (Jul 2026), a ~46% relative drop. Network pageviews still ~31.1B/month (Jan-Jul 2026) vs ~32B in 2025: small decline overall.
- What held traffic up, Jul 2024 to Jul 2026 shares: dark social 7.1% -> 11.3%, direct 13.5% -> 15.9%, internal (clicks within the site) 37.9% -> 40.4%.
- Loyal readers (visited on 8+ of the last 16 days) flat: 14.98B -> 15.02B monthly pageviews. Returning readers -8%, new readers -14%. Chartbeat: loyal readers "are a major reason why overall pageviews haven't seen a major decline."
- AI referrals grew 8x in two years but are 0.01% of traffic and were declining across ChatGPT, Claude, Perplexity, Copilot and Gemini in 2026. ChatGPT was the best AI traffic driver.
- Chartbeat quote: "If a chatbot can fully answer the question your article addresses without a click-through, that content is more exposed than your differentiated reporting is." Recommendation: "treat SEO as just one channel among several, while moving resources to developing audiences your organization can more closely influence."
- Caveats (SEJ): YoY figures do not say whether they are counts or shares; Chartbeat sells analytics. Treat the direction as solid, the exact numbers as one vendor's network, not checked against other datasets.

## How to do it
1. Monthly channel-share table (not raw counts): Search, Discover, Social, AI, Direct, Dark social (untagged shares from WhatsApp/DMs; tag your own share links with UTMs so they stop hiding in Direct), Internal. Track each channel's share of pageviews July-to-July and month-to-month.
2. Owned-audience share KPI = (direct + internal + tagged dark social + email) / all human pageviews. Goal: rising, even if total traffic is flat.
3. Loyal-reader KPI: count visitors seen on 8+ of the last 16 days (or, for a small site, 2+ visits in 30 days). Report it weekly beside new visitors. A small site with a few loyal readers is healthier than a spike of one-visit traffic.
4. Exposure audit: tag every page A (fully answerable by a chatbot: definitions, generic summaries, dates lists) or B (original: primary records, scans, transcriptions, maps, film, first-hand material). Put new effort into B; for A pages, add a reason to click (the record image, the full transcript, a downloadable source) or fold them into a B page.
5. Internal clicks are the biggest single share (40%): every page ends with a next step (see dead-end-pages-read-next-recirculation-register.md), and the shop/signup is one of the next steps.
6. Do not chase AI referrals as a traffic channel this year (0.01%); chase being cited (trust) and owned audience (return visits).

## How we apply it to Cedwyn
- Baseline now: from the Cloudflare non-US HTML-200 proxy already used in growth-report/cf_traffic.py, split by referrer class into the share table above; first row goes in the Sunday growth report. Exclude bursts (the 5,653-visit Belgium homepage burst, 1-3 Nov) before computing shares.
- Loyal-reader proxy: Cloudflare has no user ids, so use Mailchimp list growth + repeat visits to /ebooks/ and /learn/ where a cookie-free count exists; state it as a proxy.
- Exposure audit of the top 20 pages by traffic: most Cedwyn pages are B (period records, evidence catalogue, transcriptions, the /movie/ scenes); generic pages like /nomenclature/ meanings are A and should show the source record image beside the answer.
- Share links on evidence pages (WhatsApp, copy link) carry utm_source=share so dark social becomes measurable (pairs with share-links-dark-social-web-share-utm.md).
- Weekly line for the growth report: "Owned share X% (last week Y%); loyal/repeat readers N".
- Proposals only for page changes (BRIEF.md/RULES.md); no spend; nothing outward.

## Sources
- searchenginejournal.com (read 4 Nov 2026)
- themeasure.net (read 4 Nov 2026)
- chartbeat.com (Chartbeat's own resource page; the playbook article itself returned 403 to plain fetches in the previous run)