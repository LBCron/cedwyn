# Branch `catalogue-db` — central catalogue mirror (data only)

Static, serverless copy of the Cedwyn central catalogue for webapps to pull (raw GitHub or `/catalogue-db/` on the Pages
projects). Source of record: `main` → `data/core/records/*.json` (schema `data/core/schema/core-record.schema.json`).
This branch is a derived export: never edited by hand, rebuilt by the catalogue sync (see branch `migration`,
`migration/CENTRAL-DB.md`). The catalogue lock applies: existing records change only through owner-approved pull requests on main.
- `index.json` — files, record counts per kind, sha256 per file, source commit, rev
- `records/*.json` — the record files, byte for byte as on main at the source commit
- `core-record.schema.json` — the record schema at the same commit
