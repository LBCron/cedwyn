# Check a tactic inside each segment before trusting a pooled result (Simpson's paradox guard)

**Topic:** analytics hygiene for every "pages with X do better" conclusion we draw, whether about AI citations, traffic, email or sales pages. Compare like with like (the same host, channel or list) before acting.
**Source read:** Moore & Dunne (Discovered Labs), "What Drives Citations in Production Large Language Models?", arXiv 2609.35077 v1 (28 Sep 2026). This is the technical paper behind the existing skill ai-citations-page-type-pricing-engine-freshness-discovered-labs-2026.md, which only read the web summary. I read section 5.2 and section 7, "Limitations and threats to validity", in full. The authors sell AI-visibility services, so every figure is **not checked**. The method lesson stands whatever the figures turn out to be.

## What the paper found about its own method
- **Simpson's paradox, in their data:**
  - Pooled across all sites, faster pages looked *less* cited.
  - Within the same domain (domain fixed effects, N = 4,841 pages with real-user speed data), the speed effect collapsed to about zero or flipped sign.
  - Cause: big incumbent brands have many citations *and* slow pages, so domain was the hidden third factor. Most yes/no on-page signals (schema, FAQ, Core Web Vitals) behaved the same way, "to a smaller absolute degree".
- **Surviving on-page effects are small (not checked):** FAQ section +0.07, TLDR/summary +0.05, author bio +0.02 (non-significant after content-depth controls). Prompt-content alignment +0.37 (a word-overlap measure against the full prompt list, including prompts that did not cite the page). Domain-level authority is about 6x the strongest other page feature.
- **Limitations, in their words:**
  1. Observational. Clients did not randomise anything, so coefficients are "within-domain partial associations, not treatment effects". Unmeasured content quality and editorial investment "cannot be ruled out".
  2. Scope. 19 B2B SaaS workspaces from one platform; "results do not transfer without re-validation to news, e-commerce, B2C, or other content domains". Four engines (ChatGPT, Claude, Google AI, Gemini); Perplexity and Bing are absent. One six-month window, while engine pipelines change across quarters.
  3. The semantic-similarity metrics were computed only against prompts that cited the page, so read them as upper bounds.
  4. Schema extraction failed on many brand-owned pages, so the schema results cover third-party pages only. 4.4% of speed data was filled in with the median.
- Side facts (not checked):
  - Of 23,908 LinkedIn citations, 96.6% came from Google AI Overviews and none from Gemini.
  - Claude cites pricing content at a median age of 3.3 months, ChatGPT at 14.0 months.

## The playbook (for any "X works" claim, ours or a vendor's)
1. **Name the segment that could fake the effect.** Usually host (apex / cedwyn / wiki), channel (Facebook / Instagram / email / Nostr), list or audience, or month. Big, old segments differ from small, new ones in many ways at once.
2. **Compare inside segments.** Run `python3 the project workspace data.csv --segment <col> --treat <0/1 col> --outcome <number col>`. It prints the pooled difference, the within-segment difference (weighted by rows) and a verdict:
   - SIGN FLIP: the pooled result is a segment artefact;
   - SHRINKS >50%: most of the effect is the segment mix;
   - holds;
   - cannot separate: no segment has both versions.
   It uses only the standard library; nothing was installed. Self-test on a built paradox: pooled -26.8, within -0.6, verdict SHRINKS.
3. **Can't separate? Then randomise.** Use the existing A/B skills and `tools/ab_stats.py`: split within one segment and run a fixed window.
4. **Read a study's limitations before its headline.** Was it randomised? Is it our domain (B2B SaaS is not a heritage e-book shop)? Which engines? Which time window? If it fails on domain or randomisation, treat its numbers as a hypothesis for our own test.
5. **Log the verdict** next to the tactic in the experiments log, so the next run doesn't re-adopt it on the pooled number.

## How we apply it to Cedwyn
- **Traffic flywheel** (the project workspace, experiments.csv): before calling a channel or post format a winner, add a `segment` column (host or channel) and run the check. Our hosts differ hugely: the apex wiki is old and linked, cedwyn is new.
- **AI visibility check run:** when comparing pages with and without an FAQ, summary block or schema, segment by host. Within cedwyn, compare only pages of the same type (book page vs book page). The Discovered Labs page-type skill's own numbers came from B2B SaaS, so treat them as hypotheses for us, not targets.
- **Email (Mailchimp):** "subscribers who got the PS link bought more" must be checked within the signup source (shop vs wiki vs Facebook), because shop signups already intend to buy.
- **What we take from the paper for Cedwyn:** domain strength and question-matching wording dominate. Page checklist items (FAQ, schema, speed) are small and partly confounded. This agrees with the C-SEO Bench original and the Hobo triage. No new page edits are proposed from it (page freeze holds).
- Internal analytics only; nothing public. Never name the project lead in any write-up that is published.

## Sources
- arxiv.org (v1, read 4 Nov 2026: abstract, section 5.2, section 7 Limitations, section 8)
- discoveredlabs.com (redirects to the arXiv record; this is the "technical PDF")
- Related skills: ai-citations-page-type-pricing-engine-freshness-discovered-labs-2026.md, cseo-bench-original-books-domain-rank-first-top-summary-test.md, geo-tactic-triage-retrieval-rerank-gate-isolation-filter-hobo-2026.md