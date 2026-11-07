# Paid membership / paid newsletter benchmarks 2026 (beehiiv State of Paid Newsletters)

Harvested 2026-11-07 (SKILLS HARVEST). Primary source read: beehiiv, "The State of Paid Newsletters 2026", Kanishka & Tyler Denk, 22 Jun 2026, beehiiv.com (first-party data, thousands of publications 2021-2026, medians; vendor data, not independently checked).

## Numbers
- Free-to-paid conversion: median 0.62% (about 6 payers per 1,000 subscribers). Top 10% by vertical: 5.55% (Technology) to 30.80% (Economy); Finance 20.00%, Investing 18.69%.
- Price: $10/month and $100/year is the standard across nearly every vertical and list size, unchanged since 2024. Investing median $292/year; finance $20/mo, business $15/mo; lifestyle/travel lower.
- Niche beats size: a 1,000-subscriber investing letter earns >$2,700/yr; median 1,000-subscriber travel letter ~$252/yr.
- Timing: median creator launched paid 45 days after starting the newsletter.
- Lifetime (1 / monthly churn): Money ~6 months (16.67% churn), Investing ~8.5 (11.72%), Sports ~12.9 (7.76%), Food & Drink ~20 months.
- Billing: monthly was ~70% of subscription revenue in early 2025; annual overtook monthly by mid-2025; annual churns far lower.
- Retention offers (discount or pause at cancel) recover 10-20% of cancellations; few publishers use them. Failed-payment dunning is the quiet leak.
- No evidence launching paid hurt free-reader engagement (beehiiv's read of its data).

## Practitioner testimony in the report
- Oliver Darcy (Status): weekday editions paid, weekend free; two versions of every edition; web articles end on a cliffhanger before the paywall; referral programme + upgrade automations "crucial".
- Lachlan Cartwright (Breaker): never give away more than the first ~6 paragraphs; place the cliffhanger deliberately; paid content must deliver.
- Preeya Goenka (beehiiv CCO): fear of alienating free readers is mostly in publishers' heads; the real risk is launching poorly; use retention offers and annual founding-member tiers.
- L.A. Material (2026 launch): community forum for paid members within months; most subscribers chose annual.

## Playbook
1. Treat paid as a separate product (its own content, cadence, community), not a gated slice of free.
2. Default price ladder: monthly + annual at ~10x monthly; add a founding-member annual tier at launch.
3. Onboarding is table stakes: welcome email, what arrives when, immediate archive access.
4. Free sample = first ~6 paragraphs / a weekend free edition, then a clear upgrade point.
5. At cancel: offer pause or a discount; set up failed-card retries.
6. Judge results against the vertical's median, not finance's top decile: history/heritage sits with lifestyle/travel-type ROI, so expect ~0.5-1% conversion and price at or below the $10/$100 norm.

## How we apply it to Cedwyn
- Cedwyn Academy (/learn/, member sync schedule waits on the STRIPE_KEY): set expectations at ~6 payers per 1,000 engaged readers; with today's tiny list, the first job is list size, not price tests.
- Price shape PROPOSAL (owner sets prices; never invent one live): monthly + annual (~10x) + a "founding member" annual tier; record in QUEUE-after-framing.md, not on the site.
- Paid = distinct: new archive records, transcribed documents and member Q&A first; keep the free side (samples, v0.0.1 free versions) as the taste, matching the version standard.
- Upgrade moment: end free sample PDFs and blog posts on a deliberate cliffhanger line ("the next record shows ...") with the /ebooks/ or /learn/ link.
- When Stripe is live: turn on Stripe Smart Retries/dunning and a pause option before any new marketing; log cancel reasons.
- Benchmark line for the Sunday growth report: paid members / list size vs 0.62% median.

## Sources
- beehiiv.com (read 2026-11-07; methodology section: medians, LTV = median monthly price x 1/churn, steady-state estimate)
- Secondary, numbers match: tomorrowspublisher.today (beehiiv data, six in 1,000); digitalapplied.com newsletter statistics 2026