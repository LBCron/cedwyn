# Kissed Frogs — Cedwyn theme (branch `kissed-frogs`, dir `public`)
The screening register of leads checked and found not to be Great House Farm / Tŷ Mawr, Llandough-juxta-Penarth, or out of scope.
- `index.html`: the filterable register (search, status, origin); `kf-NN-*/index.html`: one page per entry; `data/register.json`: the same data.
- Sources: the wiki's Kissed Frogs register (anomalies-register/bpvsbuckler-archive-research-leads/#kissed-frogs-register, v1.0.2, 24 rows) and "Excluded: not our farm" (9 rows), kept whole apart from a few words reworded under EDITORIAL.md; 15 entries added 25 Oct 2026.
- Links are internal only (evidence pages under /wiki/). The shared header and the agent footer are added by the Cedwyn build and edge, as for every theme.
- Version 1.0.0, 25 Oct 2026 — Sion's Tab agent

## Data store (7 Nov 2026)
- `public/data/central.json`: this webapp's own store — the central-catalogue fields (id, kind, title, date, status, page) for the record IDs cited on these pages. Derived, read-only, never edited by hand.
- `tools/sync_central.py` fills it from `/api/catalogue/<id>`; `.github/workflows/sync-central.yml` runs it every 6 hours (cron `40 */6 * * *`) and on demand. See #2.
