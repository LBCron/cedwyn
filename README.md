# nft-art — The Garden Gallery (Cedwyn section branch)

Served at /nft-art/ on cedwyn.bucklerfamily.estate. themes.json on main lists it (id nft-art, branch nft-art, dir public), so the
build copies public/ to /nft-art/ and the shared header's ‹ › selector and menu reach it.

- public/index.html, garden.css, garden.js: layout only. No words or data live in them.
- public/_db/section.sqlite: this section's own database (table records(kind, id, seq, data JSON); one 'words' row, one 'artwork'
  row per piece). tools/build_db.py on main merges every <section>/_db/section.sqlite into the catalogue as section_records, and
  garden.js reads them from the catalogue (/_cedwyn/cat.js). The file itself is the section's export.
- public/art/: web images (WebP, under 300 KB) held in the catalogue as blobs like every other theme file.
- Each artwork record names the Wayback Vault artifact it was grown from ("src" = its path in the catalogue, "src_sha16").
- db/section.sql: a text dump of the same database for review.

To add or change a piece: edit the database (sqlite3 public/_db/section.sqlite), refresh db/section.sql, commit to this branch,
then run the build (workflow build.yml, workflow_dispatch).

## Versions (version standard)
Each piece's "Select a version" drop-down follows docs/VERSION-STANDARD.md on main: labels `v0.0.1 — free`, later versions at the
computed price (latest = the record's price_pence, £4.99 less per step back, floor £0; no stored price = free), and the (i) beside it
opens the version table (Version · Date · What changed · Size · Price). garden.js/css 1.3.4, 3 Nov 2026. — Sion's Tab agent
