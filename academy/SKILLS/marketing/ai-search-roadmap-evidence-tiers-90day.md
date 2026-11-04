# Evidence-sorted AI search roadmap: 90-day cycles, tier every tactic, retrieval before markup

Date harvested: 2026-11-04 (skills harvest). Topic: SEO / AI visibility planning, analytics.

## The evidence
- **Similarweb, Limor Barenholtz, "How to Build an AI Search Optimization Roadmap" (2 Nov 2026)**, method: the "Evidence-Sorted Roadmap".
- **SEOFOMO 2026 State of AI Search Optimization survey** (Aleyda Solis, 171 search professionals): 57% have a dedicated AI search strategy for all/most sites (35% a year earlier); top challenges are measuring visibility and knowing what drives it; **35% cannot say what AI search contributes to revenue**. Cyrus Shepard: "very few people know what they should be doing with AI."
- **Toronto study (Chen & Koudas, University of Toronto, arXiv preprint, Oct 2026)**, compared pages within the same site, which removes site popularity as a factor:
  - Pages whose **title and best paragraph matched the questions people ask** earned **14.1% and 15.5% more citations per standard deviation** of match. For ChatGPT only the paragraph effect held; titles helped Gemini and Perplexity.
  - FAQ blocks, structured data and summary boxes looked effective only across sites, with no within-site lift.
  - Replaying questions through ChatGPT search: **retrieval (whether the page is pulled up at all) explained 32%** of which page got cited vs **2.8% for page properties** (structure, markup). Construction-software market: 30% vs 10% (not significant).
  - Caveat: English commercial questions in two markets; associations from a preprint.
- Short windows mislead: OpenAI example, ChatGPT appearance rate **4.4% over 28 days vs 7.5% over the latest 2 days**.

## The how-to (one 90-day cycle)
1. **Baseline (days 1-7)**: a fixed set of 30-50 prompts, each mapped to a real journey and tagged by stage; experimental prompts in a separate list. Record per run: platform, appeared, recommended, linked, described accurately, competitors, cited sources. Minimum 3 runs per prompt; better one run a day for 4 weeks.
2. **Diagnose (days 8-10)**: one hypothesis per gap, labelled with one of Solis's 10 readiness traits (accessible, extractable, useful, fresh, differentiated, recognizable, consistent, corroborated, credible, transactable). Rank gaps by severity x importance / effort.
3. **Sort (days 11-13)**: give every action an evidence tier.
   - **Do**: question-matching titles and best paragraph; coverage on the third-party sites AI cites; crawlable, indexed, key facts in HTML (not loaded by JavaScript).
   - **Only if** (nearly free): sourced stats, answer-first openers, visible dates, author/summary boxes.
   - **Good to have**: FAQ blocks, schema, heading/list structure, llms.txt, chunking. Never let these displace a Do action.
   - **Skip**: bought or faked mentions.
   - **Parked**: no clear next step; monitor only.
   Then score impact 1-3 and effort 1-3; priority = impact / effort. Override: a **Do action with effort 3 starts in block 1** because third-party coverage has long lead times.
4. **Sequence (days 14-15)**: two 30-day build blocks (days 16-45, 46-75).
5. **Assign**: one owner, one KPI, one re-test date per action.
6. **Re-test (days 76-90)**: same prompts, same protocol; keep, change or drop. Commit only to the next cycle; four stacked cycles make the yearly view.

## How we apply it to Cedwyn
- Our weekly visibility check asks Grok **5** fixed questions. That's too few to read an average (see ai-visibility-lag-correlation-null-test.md). PROPOSED for the visibility RUNNER: grow to 30 journey-tagged prompts (research / walk / e-book buy) with daily runs where cheap, and report the 28-day rate, not the latest run.
- **Re-tier our own backlog**: llms.txt, agents.json, JSON-LD and FAQ work on Cedwyn are **Good to have**, already done and kept, but no more run time goes into them as AI-visibility levers. Run time goes first to:
  1. **Accessible**: many Cedwyn pages are JS webapps (tour runtime, H3 maps). Check that each key page's facts (dates, names, the e-book offer) are in the server HTML. Test: curl the page and grep for the fact.
  2. **Useful**: rewrite titles and first paragraphs of the top 10 research pages to match the questions people actually ask ("Who owned Great House Farm Llandough?", "What was BP Properties v Buckler 1987?"). Editorial rules apply: neutral wording, banned words.
  3. **Corroborated**: third-party coverage (Wikipedia gate skill, review profiles skill, heritage directories). This is effort 3, so it starts in block 1.
- Cycle 1 start: the next Monday visibility run (9 Nov) = day 1 baseline; re-test due ~2 Feb 2027. Owner per action = the named flywheel (onpage, visibility, ebook-pr). KPI = appearance rate on the tracked prompts.

## Sources
- aisearch.similarweb.com (2 Nov 2026; includes the Google Sheet template and two fill prompts)
- Secondary, cited there: SEOFOMO 2026 State of AI Search Optimization (Aleyda Solis); Aleyda Solis AI search optimization checklist; Chen & Koudas, University of Toronto arXiv preprint (Oct 2026); Google's 2026 guide to generative AI search; iPullRank strategic roadmap.