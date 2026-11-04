# Machine-readable content stack: JSON-LD fact graph + provenance (Forrester, 2026)

Source: Duane Forrester, "llms.txt Was Step One. Here's the Architecture That Comes Next", Duane Forrester Decodes, 29 Mar 2026 (read in full 4 Nov 2026). Forrester ran SEO for MSN, built Bing Webmaster Tools and helped launch Schema.org; he also sells a book on this (The Machine Layer). This is a practitioner framework, not a controlled study.
duaneforresterdecodes.substack.com

## The point
llms.txt is a flat list of Markdown links: no relationships, no dates, no provenance, and a second copy to keep in sync. When an AI answer engine compares sources and resolves contradictions, it prefers facts that are structured, linked to each other and dated/attributed. Build a machine-facing *fact layer* generated from the same source of truth as the human page, not a second hand-maintained layer.

Figures he cites (vendor/secondary, NOT CHECKED):
- An audit of CDN logs on 1,000 Adobe Experience Manager domains found LLM bots essentially absent from llms.txt requests; Googlebot made most fetches.
- Pages with valid structured data "2.3x more likely" to appear in AI Overviews; Princeton GEO paper "up to 40%" higher visibility with clear structure.
- MCP "97 million monthly SDK downloads by 2026".

## The four layers (build in order; stop where value runs out)
1. **JSON-LD fact sheets**: Organization, Product/Service, Review, FAQPage, treated as a precise fact layer (attributes, price state, availability), not a rich-snippet trick.
2. **Entity relationship graph**: connect nodes with the `@id` pattern (product -> family -> topic -> author -> organization) so a machine can traverse it like a catalogue.
3. **Content endpoint**: one versioned JSON endpoint for the most-compared facts (usually price + core features), generated from the CMS/data, timestamped and attributed. MCP is the direction; not needed today.
4. **Provenance metadata on every fact**: timestamp (`dateModified`), author/owner, version, source chain. His claim: when sources conflict, the dated, attributed fact wins the tiebreak.

## Minimum viable version (his "ship this quarter" list)
1. Audit + upgrade JSON-LD on core commercial pages; interlink with `@id`.
2. One structured endpoint for price + features, generated, never hand-edited.
3. Timestamp + author + version on each public fact you care about.

## Failure pattern he names
Pricing rendered by JavaScript, comparison tables in PDFs, case studies with no attribution -> the AI infers from crawled text and gets price and features wrong. (Pairs with the Vercel/MERJ "GPTBot does not run JS" point already in ai-visibility-3-layers-4-gates.)

## How we apply it to Cedwyn
Live check of cedwyn.bucklerfamily.estate on 4 Nov 2026 10:55Z (read-only): 3 JSON-LD blocks — Organization (`@id` .../dartboard/#org), WebSite (no `@id`), ItemList; a CreativeWork (academy protocol); FAQPage. **No Book/Product, no Offer, no price in markup, no `datePublished`/`dateModified`, no version.** So the price, format and free v0.0.1 an AI would quote must be inferred from body text.
Actions (all markup-only; PROPOSED while the page freeze holds; owner = CEDWYN ONPAGE run / VERSION STANDARD run):
1. Per e-book: one `Book` node (`@id` = book URL + `#book`) with `name`, `author`/`publisher` -> `@id` of the existing #org, `inLanguage`, `about` (Place: Llandough / Great House Farm), `bookFormat` EBook, `bookEdition` = current semver, `dateModified`, and `workExample`/`offers` listing each version: latest at its price (GBP), earlier versions at the £4.99-step prices, v0.0.1 `price: 0`. Generate it from the same data the version dropdown uses, so it never drifts (VERSION-STANDARD rule).
2. Give WebSite and ItemList `@id`s and make ItemList items point at each `#book` `@id` (the graph layer).
3. One static JSON file, e.g. /ebooks/catalogue.json, built at deploy from the same source: title, edition, price per version, free edition URL, dateModified, source count. Link it from llms.txt and /agents.json. (Layer 3, cheap: static file, no API.)
4. Provenance: visible "Edition vX.Y.Z · updated <date> · N sources" line on each book page, mirrored in `dateModified` (supports cutoff-aware calendaring and authority-without-disclosure skills).
5. Validate with validator.schema.org / Google Rich Results test after deploy; add "JSON-LD Book+Offer present" to the onpage audit score.
6. Measure: weekly visibility check asks "how much is the Great House Farm e-book and is there a free version?" with search ON; correct price/free-edition answer = pass. Before/after dates logged.
Do not: build an MCP server, hand-maintain a Markdown mirror, or spend anything.