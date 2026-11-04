# AI referral ratio: AI visits per 100 Google organic visits (benchmark: 1.25)

Harvested 2026-11-04. Topic: analytics / SEO + AI visibility.

## The evidence (primary, read)
SEOcrawl AI, David Kaufmann, "AI Traffic vs. Google Organic in 2026: A Study of 16,000+ Websites", 23 Oct 2026 (free 32-page PDF, no email). GSC + GA4 from sites connected to SEOcrawl.
- Google organic clicks, fixed cohort of 16,661 sites: 3.72bn -> 3.16bn (Sep 24-Aug 25 vs Sep 25-Aug 26), -15.0%. Median site -20.1%; 69% of sites declined. Top 1% of sites = ~70% of clicks.
- YoY decline accelerating: -7.5% (May 2025) -> -18.1% (Jul 2026) -> -21.8% (Aug 2026). Impressions flat (+0.4%): sites still shown, clicked less.
- AI-referred GA4 sessions (3,949 sites): +44.6% YoY (Mar-Aug 2026 vs 2025); strict cohort 3,099 sites +41.1% (2.13M -> 3.00M). AI share of all sessions 0.23% -> 0.36% (0.42% Aug 2026). AI grew at 57.6% of sites.
- Ratio: 1.25 AI sessions per 100 Google organic sessions (was 0.70); 1.52 in Aug 2026. Large sites 0.68 -> 1.21; vs GSC clicks 0.78 -> 1.18. Google still sends ~80x more visits than all assistants.
- Mix Mar-Aug 2026: ChatGPT 83.3% (91% in Aug), Gemini 6.0%, Perplexity 4.7%, Claude 3.7%, Copilot 2.1%. Claude x6.6, Gemini x2.8, Perplexity halved.
- Mid-size sites (1k-10k clicks/month) hit hardest: median -28%, 78% lost clicks. Education -20%; travel AI referrals +120%.
- Measured AI traffic is a FLOOR: ChatGPT app visits often arrive with no referrer (counted as Direct); AIO/AI Mode clicks count as ordinary organic in GSC; many answers never become a click. (Growth Memo 26 Oct adds: after GPT-6 shipped in early Oct, ChatGPT links lost referrer/UTM for about a week; Adobe's Cedric Huesler measured ~31k fewer daily ChatGPT visits and ~26k more Direct across 500 pages.)

## How to do it
1. Monthly, compute: AI sessions / Google organic sessions x 100. AI sessions = referrers matching chatgpt.com, chat.openai.com, gemini.google.com, perplexity.ai, claude.ai, copilot.microsoft.com, deepseek.com (keep the regex in one place).
2. Report three numbers side by side: Google clicks YoY, AI sessions YoY, ratio. Judge yourself against 1.25 (and 1.52 for the latest month) and against the median-site -20%, not the -15% aggregate.
3. Add a "Direct to deep pages" line (Direct landings that are not the homepage) as a proxy for unattributed AI app traffic; watch for jumps when an assistant ships a release.
4. Do not chase the ratio with volume content; it is a context number. Its use: deciding how much time AI-visibility work earns versus email/direct (see organic-decline-peer-benchmark-email-direct.md).

## How we apply it to Cedwyn
- We have no GA4 property confirmed in notes; Cloudflare analytics + Search Console are the sources. PROPOSAL (growth report): add an "AI ratio" line computed from Cloudflare referrer counts for the regex above vs Google referrals, plus Direct deep-page landings; log monthly in growth-report/weekly.csv. At our scale counts will be single digits; record raw counts, never percentages alone.
- Expect ChatGPT to dominate; the weekly visibility check asks Grok, so add ChatGPT-style questions only via free surfaces, zero spend.
- Treat any AI number as a floor in what we tell the owner.

## Sources
- seocrawl.ai (read 2026-11-04)
- growth-memo.com (GPT-6 referrer bug paragraph, read 2026-11-04)