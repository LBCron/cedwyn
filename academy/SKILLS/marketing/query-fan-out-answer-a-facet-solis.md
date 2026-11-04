# Query fan-out: answer-a-facet pages (Aleyda Solís method)

Topic: SEO / AI visibility, content architecture. Harvested 2026-11-04. Source is May 2025 but the mechanism is current (Google AI Mode / AI Overviews; ChatGPT also fans out, see chatgpt-site-scoped-domain-retrieval-2026.md).

## The idea
Google's own description: AI Mode "breaks down your question into subtopics and issues a multitude of queries simultaneously". One prompt becomes many sub-queries run in parallel against the web, Knowledge Graph and Shopping graph; the answer is synthesised from the winners of each. Simple fact queries barely fan out; complex, comparative or multi-criteria ones fan out a lot. You don't need to rank for the prompt: you need to be the best answer to **one or more facets**.

## Worked example (Solís, real prompt from Similarweb's AI-traffic report)
Prompt: "Could you suggest Bluetooth headphones with a comfortable over-ear design and long-lasting battery?" -> 13 plausible sub-queries: general discovery, entity list, comfort, battery, comfort+battery, price (implicit), user reviews, brand comparison, build quality, battery tech, portability (implicit), noise isolation, charging time. Source types targeted: product listings, expert reviews, forums/user reviews, official spec pages. The AI Mode answer linked ~20 source pages in its sidebar. (Example is a reconstruction, not Google's logged queries.)

## How to do it
1. **Take one money prompt** (a real one: from Search Console queries, Similarweb/GA AI-referral landing pages, reader emails, comments).
2. **Explode it into facets**: explicit facets (words in the prompt), implicit facets (price, trust, "is it worth it", who wrote it, how long it is), synonyms, comparisons, user-experience angle, follow-up questions. Aim for 8-15. Free helpers: People Also Ask / AlsoAsked free tier, Google autocomplete, Reddit/forum question titles.
3. **Map each facet to one URL and one heading** that answers it in the first 1-2 sentences, in plain HTML, scannable (H2 = the facet phrased as a question, answer, then detail).
4. **Cluster and interlink**: a hub page for the broad topic, spokes for facets, links both ways with descriptive anchors.
5. **Cover the source types the fan-out looks for**: the official/spec layer (your page), the review/editorial layer (third-party write-ups), the experience layer (forums, reader comments). Your site can only own the first; the others come from outreach and community.
6. **Add what AI can't find elsewhere**: original research, first-hand records, unique data. Visible authorship/credentials, brand mentions elsewhere.
7. **Measure by facet**: for each sub-query, are we cited? Re-run the facet list monthly in the engines; note which facets cite a competitor and build that page next.

## How we apply it to Cedwyn
Money prompt (example): "Is there a good book on the history of Llandough and Great House Farm?" Facet list to build/check:
- what is Great House Farm / Ty Mawr Llandough (definition facet)
- history of Llandough village / Roman villa at Llandough (topic facets)
- the Williams family of Llandough (people facet)
- what the e-book covers / table of contents (product facet)
- how long is it, what format, price, free first version (v0.0.1) (implicit price/format facets)
- who researched it and from which records (trust facet)
- reviews / reader comments (experience facet — needs real readers; do not fabricate)
- "Llandough history book vs Cardiff local history books" (comparison facet)
- where to buy (/ebooks/) and "is there a free sample" (follow-up facets)
Actions: (1) add the facet list per e-book to the project workspace as fixed fan-out probes (also feeds Gate 4 in the 3-layers/4-gates skill); (2) for each e-book page, PROPOSE H2-as-question blocks for the product, format/price and trust facets (page freeze: PROPOSED only); (3) map existing /research/, /wiki/, /wales/ pages to the topic facets and add internal links to the e-book page — markup/link changes go through the onpage flywheel rules; (4) the experience facet comes from genuine reader replies only.

## Sources
- Aleyda Solís, "Google AI Mode's Query Fan-Out Technique: What is it and What Does it Mean for SEO?", 25 May 2025: aleydasolis.com
- Google, "AI in Search: going beyond information to intelligence" (I/O 2025): blog.google