# Webapp API standard (`cedwyn-webapp-api/1`)

Each webapp publishes its own view of the catalogue as static files at `/<id>/api/v1/`:
| file | format | content |
|---|---|---|
| `index.json` | JSON | `schema, app, uid (APP-NN), slot, version, rev, generated_at, count, uids, slice, query, views, items[]` (light rows: key, uid, kind, title, date, url, …) |
| `items/<key>.json` | JSON | one item in the app's presentation + `catalogue` (kind/title of the central record); key = catalogue UID, or `f-…` for an uncatalogued file |
| `<view>.json` | JSON | named views (dartboard: `roadmap.json`, `institutions.json`; wayback: `kinds/<kind>.json`) |
| `feed.json` | JSON Feed 1.1 | newest 100 |
| `feed.xml` | Atom 1.0 | newest 100; entry id `tag:cedwyn.bucklerfamily.estate,2026:<app>/<key>`; the UID as `<category>` |
| `rss.xml` | RSS 2.0 | newest 100 |
| `data.xml` | XML | the whole slice: `<slice app rev generated count><item uid key kind>…` |
Rules: read-only; `rev` = sha256 of the slice (first 12 hex) so a consumer can revalidate cheaply; `v1` stays until no consumer
reads it (a breaking change becomes `v2` beside it); CORS `*` and `Cache-Control: public, max-age=300` via `_headers`;
paths sit outside every Worker route so no read runs code. `/api/index.json` lists every webapp's API (59 rows: live or planned,
formats, kinds, UID prefixes, who reads it and what it reads). The central export is at `/catalogue-db/index.json` and
`/catalogue-db/uids.json`.
