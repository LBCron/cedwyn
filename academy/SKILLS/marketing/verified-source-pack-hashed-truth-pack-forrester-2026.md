# Verified Source Pack: one hashed, versioned "official truth" pack for agents

Source: Duane Forrester, "The Verified Source Pack Agents Trust First", Duane Forrester Decodes (Substack), 1 Mar 2026, read in full 4 Nov 2026:
duaneforresterdecodes.substack.com
Status: a consultant's framework (he sells a book), no study, no numbers. Nobody has shown an AI engine fetching such a pack; treat it as cheap insurance, not a proven ranking lever.
Related, NOT duplicated: machine-readable-content-stack-jsonld-graph-provenance-forrester-2026.md (his follow-up: JSON-LD graph + one JSON endpoint). This skill is the pack itself: what goes in, the hashed index, constraints, freshness.

## The idea in one line
Pages persuade humans, schema clarifies pages, a Verified Source Pack packages the facts an agent needs to recommend or buy (products, prices, rules, policies, constraints) with version, timestamp, hashes and a stable discovery path. Without it an agent hedges, copies a third party, or leaves you out.

## Four parts (each answers one agent question)
1. Content - "what is true?" Operational facts the business would defend: catalogue, pricing rules, availability, delivery/refund terms, guarantees, support route, and CONSTRAINTS as a first-class file (exclusions, eligibility, limits). Missing constraints = the model guesses.
2. Structure - "can I parse it?" Dataset mode: plain JSON (CSV for bulk) + a changelog. Contract mode, only for fast-changing facts: one endpoint returning the pack index, described with OpenAPI.
3. Provenance - "is it yours and unmodified?" Version the pack, timestamp it, sha256 every file, sign the index (a detached signature is enough; C2PA is the reference pattern, full C2PA not needed).
4. Discoverability - "can I find it?" Stable boring path on your own domain, linked from a policy/help page, in the sitemap, optionally pointed at from llms.txt (a hint only: no major LLM provider has committed to reading llms.txt).

## Build flow (one afternoon for a small site)
1. Inventory truth domains; write down which page is canonical for each. Where pages disagree, pick one and fix the others over time.
2. Write the dataset files (one per domain) from the site's own source data, never by hand-copying pages.
3. Generate pack-index.json: pack_version, generated_at, review_by, and per file url + sha256 + bytes. Tool here: tools/source_pack_index.py (stdlib only, box-tested 4 Nov 2026).
4. Optional: detached signature over pack-index.json.
5. Link the index from one human page, add to sitemap, mention in llms.txt and agents.json.
6. Freshness: review_by date on the index, changelog line per change, an owner. Prices regenerate on every release; policies on change.

## Checks
- Every price in the pack equals the price on the page and in checkout (one mismatch costs more trust than no pack).
- Hashes in the index match the served files (re-download and sha256).
- The index returns 200 with application/json, not the site's HTML 404 page.

## How we apply it to Cedwyn
Checked live 4 Nov 2026 11:13Z: /llms.txt 200 (19 KB), /agents.json 200 (288 KB, agent-facing), /ebooks/catalogue.json 404 (serves the HTML 404 page), /.well-known/ 404. So there is an agent map but no buyer-facts pack.
PROPOSED (page freeze holds; data files only, no page edits; owner: the version-standard flywheel):
1. /pack/ebooks.json - each e-book: title, edition list (v0.0.1 free, each later version GBP 4.99 more per step, per the version standard), current price, format, length, buy URL (/ebooks/ only), sample URL.
2. /pack/constraints.json - what a buyer gets and does not: digital download only, no print, which version is free, refund route as published on the checkout page. Only facts already public on the site.
3. /pack/changelog.json - generated from the existing version changelog modal data, so it cannot drift.
4. /pack/pack-index.json via tools/source_pack_index.py, review_by 30 days, linked from /ebooks/ footer, sitemap, llms.txt, agents.json.
5. Add one probe to the weekly visibility check: "How much is the Cedwyn e-book and is there a free edition?" Score: right price + free v0.0.1 named = pass.
Rules: public text never names the project lead; banned words apply to every field; nothing about holdings or addresses; no outbound links.