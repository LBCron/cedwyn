# Skill: GEO tactic triage: retrieval and rerank gate first, then the "is it just SEO?" filter (Hobo forensic audit, Oct 2026)
Written 4 Nov 2026 (skills harvest). Topic: a gate for deciding whether a proposed "AI visibility" tactic is worth doing, using which pipeline stage it acts on and whether it has replicated.
Not a duplicate of: google-top-20 retrieval pool (Indig: the pool AI picks from), ai-visibility 3 layers/4 gates (stages of being found), consensus-plus-information-gain (what cited passages say). This file is a **decision filter for tactics**, including the reranking step, plus the replication record of the best-known GEO assertions.

## Source and how far to trust it
- Shaun Anderson (Hobo Web, Greenock, UK practitioner since 2006), "Retrieval Governs Synthesis: A Forensic Audit of GEO Benchmarks, Replication Failures, and Provenance in RAG Pipelines", 23 Oct 2026, DOI 10.5281/zenodo.23605043 (read 4 Nov 2026, main sections). Self-published on Zenodo, not peer reviewed; he sells SEO e-books and audits and argues one side ("GEO is SEO"). He mostly summarises other studies; every figure below is his report of them and **not checked** against the original papers.
- Studies he leans on (titles as he gives them, not read by us): Aggarwal et al. GEO, KDD 2024; C-SEO Bench, Puerto et al., NeurIPS 2025 (arXiv 2506.11097); SAGEO Arena, Kim et al., KDD 2026 (arXiv 2602.12187); Koudas, Oct 2026 (arXiv 2610.15033); Ray, Feb 2026 core-update telemetry.
- Where it agrees with other skills: Discovered Labs (ai-citations-page-type-pricing-engine-freshness-discovered-labs-2026.md) also finds page formatting small and domain/retrieval strength dominant. Two vendors with opposite commercial interests landing on the same direction is the useful signal.

## The pipeline, in one line
Query rewrite / fan-out -> **stage 1 retrieval** (a search index picks candidates) -> **reranking** (a cross-encoder reads query and each candidate passage together and keeps the top K) -> generation (the model writes and cites from those K). A page outside the top K after reranking gets zero visibility, whatever its prose.

## What the audit reports (not checked)
1. The famous "GEO gives 30-40% more visibility" (KDD 2024) came from a frozen five-document sandbox, rewrites by gpt-3.5 that were allowed to invent data and sources, and the same model family judging them.
2. C-SEO Bench (NeurIPS 2025): with Claude-3.5-Haiku as the judge, 0 of 10 rewrite methods gained; rank fell in 26 of 30 product cases; "add statistics" *lowered* rank; with several competing sites all rewriting, gains converged to ~0 (+0.04); plain search position 1 (+2.77) beat rewrites (+0.36) about 7.7x.
3. SAGEO Arena (KDD 2026), live 171,003-document retriever -> reranker -> generator: body-only rewrites degraded stage-1 retrieval; title, meta description, headings and JSON-LD drove retrieval.
4. Koudas (Oct 2026), 158,099 AI answers, 468,037 citations, within-site comparisons: retrieval explained 32% of citation variance vs 2.8% for page properties (11.4x). Schema, FAQ blocks and summary boxes failed within-site controls; `<title>` match (+14.1%) and paragraph-level query match (+15.5%) held.
5. Ray (Feb 2026): 11 of 11 domains that lost Google traffic in the Jan 2026 core update (avg -26.7%) lost AI citations too (avg -22.5%; ChatGPT -27.8%).
6. "Isolation filter" over 7 GEO guides plus a 28-signal commercial protocol (56 signals): after removing technical SEO, entity SEO, answer/snippet formatting and digital PR, 0% of tactics were left that were unique to GEO.
7. Provenance warning: some open-access "GEO" papers cite invented practitioner terms, i.e. citations copied without being read. Check a study exists and states what is quoted before relying on it.

## The triage (use before adopting any AI-visibility tactic)
Ask four questions; write the answers next to the proposal.
1. **Stage:** which stage does it act on: retrieval (indexing, title, headings, links, being ranked in search), rerank (the passage directly answers the query in its own words), or generation (wording of the prose)? Generation-only tactics have the weakest record; deprioritise.
2. **Is it just SEO?** Name the older equivalent (technical SEO, entity/structured data, featured-snippet formatting, PR). If one exists, do it under that name and its known best practice; don't pay a "GEO" premium or build a new process.
3. **Has it replicated** on more than one judge model and on live retrieval (not a frozen sandbox, not the same model judging itself)? If no, run it only as a small test.
4. **Integrity:** does it need anything invented (stats, quotes, sources)? If yes, reject: it is the tactic that backfired in C-SEO Bench, and it breaks our editorial rules.
Rerank-stage writing that does survive: each section opens with one or two sentences that answer the likely question in plain words, using the same nouns the question uses, with the fact (date, name, catalogue ID) inside that passage rather than in a caption or table elsewhere.

## How we apply it to Cedwyn
Live check of cedwyn.bucklerfamily.estate at ~11:46Z 4 Nov:
- `<title>`: "Great House Farm (Tŷ Mawr) e-books · Llandough, Penarth · Welsh history". H1: "E-books". Meta description names the place, the Williams–Buckler family, BP Properties v Buckler [1987], "PDF, instant download".
- Retrieval stage reads mostly sound. Gap: the H1 is the bare word "E-books" and nothing in title or H1 carries a buyer word (price / free edition).
PROPOSED (page freeze holds; nothing committed):
1. H1 to "Great House Farm (Tŷ Mawr) e-books: free first edition, updated editions from £4.99" (markup-level; check the version-standard prices first, never invent a price).
2. Add the triage as a required line in every future skills-harvest and on-page proposal: "Stage: retrieval/rerank/generation · SEO equivalent: … · Replicated: yes/no · Needs invented data: no". Proposals marked generation-only + not replicated go to the bottom of the queue.
3. Since retrieval is the gate, Search Console indexing (2 of 5,150 sitemap URLs indexed in the page-indexing-triage skill's Oct 2026 check; not re-checked today) outranks any AI-specific copy edit; keep that first in the on-page flywheel.
4. Watch for a traffic drop in Search Console as an early warning for AI citations (Ray: they fall together).
5. The existing skills built on vendor checklists (FAQ, summary boxes, schema "for AI") stay useful for Google and readers, but don't count them as AI-citation levers in reports.
Public text rules apply to any page copy: never name the project lead, banned words, no outbound links.

## Sources
- hobo-web.co.uk (read 4 Nov 2026)
- zenodo.org (listed, not read)
- arXiv 2506.11097, 2602.12187, 2610.15033 (named in the audit, not read)