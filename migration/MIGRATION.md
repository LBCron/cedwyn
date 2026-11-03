# Webapp migration programme — 59 webapps to one standard

Branch `migration` of unclehowell/cedwyn. Programme board for moving every tour webapp (slots 1–59, the "N of 59" header)
onto one standard. Read-only status page: https://cedwyn-migration.pages.dev/ (rebuilt from this branch).

## The standard (schema `cedwyn-webapp/1.0.0`, file `schema/webapp.schema.json`)
Every webapp has:
1. **A static front end** — plain files on a Pages project; a page view runs no Worker (`front_end.worker_on_read = false`).
2. **The common header** (contract `cedwyn-header/1`) — the same header everywhere: site name, the app's title, "N of 59",
   Back / Next in the one tour order read from `/areas.json` `nav`. This is the header the shared site chrome already
   draws (`/_cedwyn/ghf/ghf-boot.js`, e.g. "WAYBACK VAULT · 3 OF 59" with ‹ ›); a migrated app keeps that chrome as it is.
   `std/cw-header.js` is only for the API browser pages, never for a visitor-facing page.
3. **Its own branch** — `webapp/<id>` (today many apps still build from older theme branches; `branch.name` records that).
4. **Its own small database** — only the data it cares about: a *slice* of the central catalogue chosen by catalogue
   UID kind/prefix (`data.query`), published as static JSON (`/<id>/_data/<slice>.json`), plus an optional client-side
   cache (IndexedDB, stale-while-revalidate; `std/cw-cache.js`) that pulls from the static catalogue export, never a Worker.
5. **Its own API** — `/<id>/api/v1/`: `index.json`, `items/<uid>.json`, `feed.json` (JSON Feed), `feed.xml` (Atom), `rss.xml`
   (RSS 2.0), `data.xml` (XML) and named views; CORS open; listed in `/api/index.json`. Other webapps read each other here
   (`consumes` / `consumed_by`), e.g. the dashboard and the forensic assessments both read the emails API.
6. **External sources** declared, not hidden — apps such as Cloudflare, HubSpot, Analytics, Gmail, WhatDoTheyKnow pull from
   third parties through a named adapter on a cadence, writing static files (`external_sources`).
7. **Dynamic endpoints listed** — the only paths allowed to run code (payments, hive job sign-ups, chat, posting): `dynamic_endpoints`.
8. **Version + changelog** — semver per manifest.
9. **The original design, unchanged** — see the Design preservation rule below. A migration changes where an app's data
   comes from, never how the app looks or behaves.

## DESIGN PRESERVATION RULE (owner, 3 Nov 2026; overrides anything above that would change a page's look)
The user experience and design of every webapp stay exactly as they are. Making the front end data-driven (content read
from the app's JSON / API v1 instead of hardcoded text) is the goal; re-skinning it is not.
1. **Start from the original front end.** The page visitors get today (its HTML structure, CSS, layout, fonts, colours,
   navigation, interactions and the shared site chrome) is the template. Find it in the app's own branch / source, git
   history before any migration commit, the static Pages project (cedwyn-274.pages.dev) or Wayback Machine captures.
   Never write a new page, a new stylesheet or a "standard" layout for a visitor-facing path.
2. **Change data reads only.** Point the original page's data loads at `api/v1/` (or publish the API in the exact shape the
   original already reads). Edits are exact, minimal text replacements recorded in the app's `frontend.py` (anchors that
   fail are logged, and the original line is kept). Hardcoded text becomes data by filling the same element from JSON,
   with the same markup and classes.
3. **Shared chrome stays shared.** The "N of 59" header, menu, Garden banner and language switch come from the site chrome
   (`chrome.json` lists what the pilot build mirrors). An app never adds its own header strip on top.
4. **Prove it before calling it done.** Side-by-side screenshots, original vs migrated, at 390 px and 1280 px, saved with the
   app's migration notes, plus a written list of every visible difference that remains (with why). Any difference not
   caused by data timing (an animation frame, a newer record) blocks the switch until fixed or approved by the owner.
5. **Same check on every later change.** A migration commit that touches a visitor-facing file carries the before/after
   pair in its PR or notes.
How the pilots do it: `webapp/<id>/frontend.py` (`build_front(ctx)`) takes the original page and assets from the static
Pages project at build time, applies the data-read patches and serves media/other apps by redirect; the 1.0 standard page
lives on as the API browser at `/<id>/api/v1/index.html`. Before/after shots: `design-restore/` in the programme notes.

## Phases (tracked per webapp)
inventory → manifest → branch → static front end → data slice → API → header → live verified.

## Phase 2 plan (the other 57 apps), with the design gate
For each app, in slot order: (a) branch `webapp/<id>` with `slice.py` (its data) and `frontend.py` (the ORIGINAL front end
plus data-read patches, per the Design preservation rule); (b) build on the pilot project and take the 390 px / 1280 px
before/after pair; (c) list remaining differences; (d) only an app whose pair shows no unexplained difference moves to
"live verified" and may be switched. The "static front end" and "header" phases are met by keeping the original page and the
shared chrome, not by replacing them.
`migration.json` and the table below are generated from the manifests by `tools/tracker.py`; `tools/validate.py` checks all 59.

## Rules that hold throughout
- Catalogue lock: existing evidence and artifact records change only with the owner's approval (PR #153's check). The sync
  job and every builder here only read; new records are additive and go through review.
- Public records and public fields only; correspondence bodies, private persons, addresses and holdings never enter a slice.
- No Worker on any read; D1 is touched only at sync time.
- Vacant slots carry a *proposed* occupant taken from existing pages or open PRs; nothing is published in a vacant slot
  until the owner decides.

## Decisions waiting on the owner
- Fill the 15 empty slots (41, 46–59) with the proposed occupants? (see each `manifests/NN-slot-NN.json` → `vacant`).
- Slot 46 is asked for by two open PRs (#132 garden-store, #156 chubut-h3); proposal: garden-store 46, chubut-h3 49.
- Title chains: the existing /title-chain/ page and the infographic (slot 5) show the same data; one app or two?

## Pilots (design restored 3 Nov 2026, cedwyn-webapp/1.1.0)
- Wayback Vault (slot 3) — the original Vault page (tabs, gallery, filter tags, Websites tab, shared chrome), its gallery and
  Websites tab now read `api/v1/category/<cat>.json` and `api/v1/websites.json`, built from the app's own branch data plus
  catalogue UIDs. https://cedwyn-migration.pages.dev/wayback/ (API browser: /wayback/api/v1/index.html).
- Disclosure Dartboard (slot 27) — the original Disclosure Rings app, unchanged; its data files are published by the slice
  in `api/v1/data/` and served where the original reads them; the catalogue-built roadmap stays in `api/v1/roadmap.json`.
  https://cedwyn-migration.pages.dev/dartboard/

## Tracker

<!-- TRACKER:START -->
Updated 2026-11-03T20:49Z. Counts by last completed phase: manifest 18, branch 39, header 2. RAG: green 2, amber 39, red 3, grey 15.

| # | webapp | section | status | phase | RAG | next action |
|---|---|---|---|---|---|---|
| 1 | wiki | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /wiki/api/v1/ |
| 2 | docs | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /docs/api/v1/ |
| 3 | wayback | Wales | live | header | green | switch the live /wayback/ to the standard build, then verify live (phase live_verified) |
| 4 | maps | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /maps/api/v1/ |
| 5 | infographic | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /infographic/api/v1/ |
| 6 | ebooks | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /ebooks/api/v1/ |
| 7 | story | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /story/api/v1/ |
| 8 | thousand-cuts | Wales | live | manifest | red | create branch webapp/thousand-cuts and move the app source there |
| 9 | fb | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /fb/api/v1/ |
| 10 | arcade | Online | live | manifest | red | create branch webapp/arcade and move the app source there |
| 11 | chess | Online | live | branch | amber | write the slice entry in data/core/slices.json and generate /chess/api/v1/ |
| 12 | csscpsg | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /csscpsg/api/v1/ |
| 13 | courtdrills | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /courtdrills/api/v1/ |
| 14 | fcg | Online | live | branch | amber | write the slice entry in data/core/slices.json and generate /fcg/api/v1/ |
| 15 | oldbill | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /oldbill/api/v1/ |
| 16 | accounts | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /accounts/api/v1/ |
| 17 | authorities | Online | live | branch | amber | write the slice entry in data/core/slices.json and generate /authorities/api/v1/ |
| 18 | wdtk | Online | live | branch | amber | write the slice entry in data/core/slices.json and generate /wdtk/api/v1/ |
| 19 | review | Online | live | branch | amber | write the slice entry in data/core/slices.json and generate /review/api/v1/ |
| 20 | research | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /research/api/v1/ |
| 21 | qa | Online | live | branch | amber | write the slice entry in data/core/slices.json and generate /qa/api/v1/ |
| 22 | projects | Online | live | branch | amber | write the slice entry in data/core/slices.json and generate /projects/api/v1/ |
| 23 | app | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /app/api/v1/ |
| 24 | chat | Online | live | branch | amber | write the slice entry in data/core/slices.json and generate /chat/api/v1/ |
| 25 | watchtower | Online | live | branch | amber | write the slice entry in data/core/slices.json and generate /watchtower/api/v1/ |
| 26 | email | Online | live | branch | amber | write the slice entry in data/core/slices.json and generate /email/api/v1/ |
| 27 | dartboard | Online | live | header | green | switch the live /dartboard/ to the standard build, then verify live (phase live_verified) |
| 28 | estate | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /estate/api/v1/ |
| 29 | directory | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /directory/api/v1/ |
| 30 | patagonia | Argentina | live | branch | amber | write the slice entry in data/core/slices.json and generate /patagonia/api/v1/ |
| 31 | wales | Wales | live | manifest | red | create branch webapp/wales and move the app source there |
| 32 | shop | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /shop/api/v1/ |
| 33 | familytree | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /familytree/api/v1/ |
| 34 | kissed-frogs | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /kissed-frogs/api/v1/ |
| 35 | whattheydontsay | Online | live | branch | amber | write the slice entry in data/core/slices.json and generate /whattheydontsay/api/v1/ |
| 36 | blog | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /blog/api/v1/ |
| 37 | hubspot | Online | live | branch | amber | write the slice entry in data/core/slices.json and generate /hubspot/api/v1/ |
| 38 | that-old-chestnut | Online | live | branch | amber | write the slice entry in data/core/slices.json and generate /that-old-chestnut/api/v1/ |
| 39 | forensic | Online | live | branch | amber | write the slice entry in data/core/slices.json and generate /forensic/api/v1/ |
| 40 | mr-wolf | Online | live | branch | amber | write the slice entry in data/core/slices.json and generate /mr-wolf/api/v1/ |
| 41 | slot-41 (→ title-chain) | Wales | vacant | manifest | grey | owner decides the occupant; then a full manifest replaces this one |
| 42 | tithe-h3 | Wales | live | branch | amber | write the slice entry in data/core/slices.json and generate /tithe-h3/api/v1/ |
| 43 | cloudflare | Online | live | branch | amber | write the slice entry in data/core/slices.json and generate /cloudflare/api/v1/ |
| 44 | spill | Online | live | branch | amber | write the slice entry in data/core/slices.json and generate /spill/api/v1/ |
| 45 | analytics | Online | live | branch | amber | write the slice entry in data/core/slices.json and generate /analytics/api/v1/ |
| 46 | slot-46 (→ garden-store) | Wales | pending_pr | manifest | grey | owner decides the occupant; then a full manifest replaces this one |
| 47 | slot-47 (→ peekaboo) | Wales | pending_pr | manifest | grey | owner decides the occupant; then a full manifest replaces this one |
| 48 | slot-48 (→ theories) | Wales | pending_pr | manifest | grey | owner decides the occupant; then a full manifest replaces this one |
| 49 | slot-49 (→ chubut-h3) | Argentina | vacant | manifest | grey | owner decides the occupant; then a full manifest replaces this one |
| 50 | slot-50 (→ parcels) | Wales | vacant | manifest | grey | owner decides the occupant; then a full manifest replaces this one |
| 51 | slot-51 (→ catalogue) | Online | vacant | manifest | grey | owner decides the occupant; then a full manifest replaces this one |
| 52 | slot-52 (→ documentary) | Wales | vacant | manifest | grey | owner decides the occupant; then a full manifest replaces this one |
| 53 | slot-53 (→ nomenclature) | Wales | vacant | manifest | grey | owner decides the occupant; then a full manifest replaces this one |
| 54 | slot-54 (→ records) | Wales | vacant | manifest | grey | owner decides the occupant; then a full manifest replaces this one |
| 55 | slot-55 (→ meeting) | Wales | vacant | manifest | grey | owner decides the occupant; then a full manifest replaces this one |
| 56 | slot-56 (→ hive) | Online | vacant | manifest | grey | owner decides the occupant; then a full manifest replaces this one |
| 57 | slot-57 (→ academy) | Online | vacant | manifest | grey | owner decides the occupant; then a full manifest replaces this one |
| 58 | slot-58 (→ settings) | Online | vacant | manifest | grey | owner decides the occupant; then a full manifest replaces this one |
| 59 | slot-59 (→ bloculous) | Online | vacant | manifest | grey | owner decides the occupant; then a full manifest replaces this one |
<!-- TRACKER:END -->
