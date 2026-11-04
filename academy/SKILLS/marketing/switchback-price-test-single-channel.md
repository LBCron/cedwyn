# Switchback (time-split) price test inside ONE channel

Date: 2026-11-04 · Topic: e-book launch / pricing tests where a per-visitor A/B split is not possible or not fair.

## Why this exists
A per-visitor price split (two people see two prices for the same e-book at the same moment) is awkward for a small UK shop: buyers compare notes, platforms such as KDP/Google Play/Apple show one price to everyone, and UK price-transparency rules (see uk-dmcc-act-urgency-reviews-price-copy.md, uk-reference-pricing-was-now-emma-sleep-2026.md) punish "was/now" games. The marketplace answer is the **switchback**: everyone sees the SAME price at any moment, and the price flips between A and B on a randomised time schedule.

## What the practitioners and the source paper establish
- Statsig (experimentation vendor, practitioner guide): switchbacks flip test/control "based on time, rather than randomly splitting the population. At any given time, everyone ... receives the same treatment." Set the switching interval long enough to capture the effect, short enough to get many intervals; balance across times of day and days of week; common total duration is **2-week blocks**. Add **burn-in/burn-out** windows to drop exposures right after a switch (their example: 1-hour window with 5-min burn-in and burn-out keeps only the middle 50 min). Do NOT run a per-user t-test: the unit is the time interval; they analyse with **bootstrapping**; regression (DoorDash's method) is the alternative. Limitation: switchbacks measure short, in-session behaviour, not long-term effects. (vendor guide; figures are their worked examples)
- DoorDash engineering (cited by Statsig; page behind a bot wall from this box, not re-read): used switchbacks for surge ("SOS") delivery pricing across whole regions, analysed by regression.
- Bojinov, Simchi-Levi & Zhao, "Design and Analysis of Switchback Experiments" (Management Science; arXiv 2009.00148, read sec. 3 + 6): the optimal randomisation frequency depends on the **real duration of the carryover effect**, not on how finely you slice periods; set each period close to the carryover length; they suggest a horizon so that T/p > 100 periods for the carryover-order test; their Table 3 optimal design for T=12, m=2 randomises only at periods {1,5,7,9}.

## Translation for e-books (our reading, not a published result)
- Carryover for a book price = people who saw price A on a visit and buy later at B. For a £5-£25 PDF this is typically a day or two (wish-list, payday). So **one period = 1 day** (or 2), with the first ~6 h after each flip marked burn-in and excluded or analysed separately.
- Unit of analysis = the day. Metric = **revenue per visitor (RPV) on the product page**, not conversion rate (a lower price always "wins" on conversion). Secondary: orders, refunds.
- Randomise days in blocked pairs (each Mon–Sun week gets A and B in a random order per pair of days) so weekday effects cancel.
- Small shops have few orders. A switchback at ~20 product-page visits/day and ~1% conversion gives ~1.4 orders per week: no test will reach significance in a month. Use it only once a product page has **≥ 100 visits/day** or ≥ 3 orders/week; otherwise use the gated survey routes (van-westendorp-price-survey-gated.md, gabor-granger-price-ladder-survey-revenue-peak.md).
- Stopping: fix the horizon in advance (e.g. 28 days = 14 A + 14 B); no peeking-to-stop (see sequential-ab-test-miller-2sqrtN-stopping-rule.md).

## Steps
1. Pick ONE channel you fully control (own Stripe/Gumroad checkout). Keep every other channel's price fixed during the test.
2. Choose two prices that are both legitimate standing prices (no struck-through "was" price, no fake urgency). State on the page only the current price.
3. Generate the schedule: `python3 the project workspace schedule --days 28 --start 2026-11-09 --seed 7` (blocked pairs, writes a CSV).
4. Each day at 00:00 UK, switch the live price per the schedule (a Stripe Price swap on the Payment Link / Gumroad price edit) and log the switch time.
5. Daily, record visits (Cloudflare analytics for the page, HTML 200s), orders, revenue. Mark the first 6 h after a switch as burn-in.
6. At the end: `python3 .../switchback_price.py analyse days.csv` → difference in mean RPV per day, permutation-test p-value over day labels, and a "not enough data" verdict under 20 orders total.
7. Segment check before naming a winner (simpson-paradox-within-segment-check-discovered-labs-limitations.md): look at traffic source per arm.

## Interactions
- **KDP**: a Kindle Countdown Deal requires the list price unchanged 30 days before and 14 days after (kindle-countdown-deal-kdp-select-uk-rules.md). Never switchback-test a KDP price.
- Versioned-release ladder (versioned-release-rising-price-ladder.md; latest paid, each earlier version £4.99 less): test only the LATEST version's price, then recompute the ladder; never break the "v0.0.1 free" rule.
- Argentina scope: no money words; do not test prices in Argentina-facing pages.

## How we apply it to Cedwyn
- Today Cedwyn traffic to /ebooks/ is far below 100 visits/day, so the switchback is **PROPOSED, gated**: arm it when the e-book page passes 100 visits/day for 7 days (the traffic flywheel can flag it).
- Candidate first test when the gate opens: latest-version price of the lead e-book at its current price vs. one £-step lower, 28 days, own checkout only, KDP/Google Play unchanged.
- A price change itself is a the project lead decision (standing rule: prices are proposals); the test plan goes to the project workspace as a proposal, not executed.
- Tool: tools/switchback_price.py (stdlib only, written, nothing installed).

## Sources
- statsig.com (vendor practitioner guide; examples not checked)
- careersatdoordash.com (bot wall from this box; content relayed via Statsig/search snippet)
- arxiv.org (Bojinov, Simchi-Levi, Zhao; read HTML v4 sec. 3, 6)