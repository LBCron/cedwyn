# Review profiles as AI "receipts": claim the platform, cross the minimum, check the absence signal

Date harvested: 2026-11-04 (skills harvest). Topic: SEO / AI visibility, trust signals, e-book launch.

## The evidence (with who measured it)
- **Seer Interactive (Nick Haigler, 14 May 2026)**, own study for Trustpilot: 804,491 AI responses, 1,926 brands, ChatGPT / Google AI Mode / Gemini / Perplexity, March 2026, 15,000+ buying-journey prompts.
  - Review/trust sites = **#2 citation source, 14.01%** of all citations (general web 75.96%).
  - Share by funnel stage: Awareness **1.51%** -> Evaluation **16.24%** -> Intent **24.27%**. Reviews are the validation layer at the moment of buying.
  - Median AI citation rate: brands with **no Trustpilot profile 1%**; a **minimal profile (1-13 reviews) 53.5%**; >80 reviews and regular replies 75.3%.
  - **Absence signal**: ChatGPT wrote things like "[Brand] lacks reviews on trusted sites like Trustpilot, BBB" — a missing profile is read as a negative.
  - Low-authority sites (Domain Rating 0-15) with a minimal profile got nearly the same citation rate as mid-authority ones.
  - **99.5% of Trustpilot citations came via organic ranking** of Trustpilot pages in the AI's search fan-out, not because AI seeks Trustpilot out.
  - Optimised profiles got 9.5x more co-mentions (recommended inside competitors' branded questions).
  - Caveat: commissioned by Trustpilot; association, not cause. Part of the 1% vs 53.5% gap is mechanical: no page means nothing to cite.
- **Similarweb (Maayan Zohar Basteker, 3 Nov 2026)**, review of the evidence:
  - University of Toronto study (300 consumer-electronics questions, GPT-4o/Claude/Gemini/Perplexity): for **"best X" questions 59-86% of citations were independent/earned sources** (review publishers); for buy-now questions they shifted to brand sites (52-68%). Niche comparisons concentrate on specific review sites and discussion threads.
  - OpenAI's ChatGPT shopping research (launched Nov 2025) reads reviews and favours organic review sites and Reddit; it **cannot cite a site that blocks OpenAI's browsing agents**; OpenAI publishes no list of sites it cites.
  - G2 survey, July 2026 (1,038 software buyers, self-reported, G2 sells AI analytics): review sites 38% vs AI chatbots 37% as top shortlist source.
  - Similarweb's own data: G2/Trustpilot/Yelp are not top-20 domains in ChatGPT or AI Mode, yet reviews are the 2nd-largest citation category after news.

## The how-to (ordered by strength of evidence)
1. **Pick the platform your buyers actually use** for the category (software = G2; services/shops = Trustpilot; books = Goodreads / StoryGraph / retailer reviews). Don't spread thin.
2. **Cross the minimum**: claim and complete the profile, then get the first genuine reviews (the 1% -> 53.5% jump happened at 1-13 reviews).
3. **Keep reviews recent and reply** to each one (the 75.3% tier).
4. **Run your own review prompts** weekly: "is X worth it", "X vs Y", "best X for Y". Note which review sites appear and whether the AI states anything about missing reviews (the absence signal).
5. **Citation gap**: for the prompts that matter, list which third-party sites cite competitors but not you; plan coverage there.
6. **Check robots**: a review page or shop that blocks AI browsing agents can't be cited.
7. **Never** buy, swap or fake reviews (platform terms; OpenAI avoids suspicious review patterns; Google calls inauthentic mentions unhelpful).

## How we apply it to Cedwyn
- The "best X" answers we want ("best books on Llandough history", "Welsh land-dispute history e-book") are exactly where earned sources win. Cedwyn has no review footprint anywhere today, so the absence signal applies to us.
- **Platform for us = books, not Trustpilot**: a Goodreads book page per e-book (free; authors can add books via the Goodreads Librarian / author program) is the closest match. A Trustpilot profile for the shop is second choice. Creating a public profile is an outward step, so it is PROPOSED for the project lead's OK (programme-office queue), not done by a run.
- Reviews only come from real readers: no sale yet (0). First action once a buyer exists: one plain "would you leave a short review on Goodreads?" line in the post-purchase/thank-you email. No incentives, no swaps.
- Add 3 prompts to the weekly visibility check (Grok): "is the Cedwyn Llandough e-book worth it", "best books on Llandough and Leckwith history", "Great House Farm book reviews". Log whether any review site appears and any "lacks reviews" wording.
- Check that /ebooks/ and the shop pages don't block OAI-SearchBot / ChatGPT-User / PerplexityBot in robots.txt (the visibility RUNNER already checks AI crawlers; add the shop paths).
- KPI: review-site mentions in the 8 tracked prompts, baseline 0; re-test 90 days after the first profile goes live.

## Sources
- seerinteractive.com (14 May 2026)
- aisearch.similarweb.com (3 Nov 2026)
- Secondary, cited there: University of Toronto "best product" citation study; OpenAI shopping research announcement (Nov 2025); Modern Retail; G2 buyer surveys (Apr and Jul 2026); Trustpilot press release / white paper "What is AI saying about your brand?"