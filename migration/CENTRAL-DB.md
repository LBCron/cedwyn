# Central catalogue database — design (programme `migration`, standard cedwyn-webapp/1.0.0)

One central catalogue; every webapp's small database is a read-only slice of it, joined by catalogue UID.
Builds on the static-first plan (work note PLAN.md §6, task static-first) and the D1 core tables loaded since 27 Oct 2026.

## 1. Where the central DB lives (three copies, one writer path)
| copy | what | role | who reads it |
|---|---|---|---|
| **git: `main` → `data/core/records/*.json`** | the records, validated by `data/core/schema/core-record.schema.json` | the reviewed record of every change (the catalogue lock, PR #153, works on pull requests) | the sync job only |
| **Cloudflare D1 `cedwyn-apps` → `core_items`, `core_links`, `core_changes`** | the same records as rows (+ correspondence rows kept `public = 0`) | the central *query* database ("the D1 bucket"); loaded at sync time by `core_load.py` | sync job, agents' queries; never a page view |
| **git branch `catalogue-db`** (data-only, orphan) | JSON export per record file + `index.json` (files, counts, sha256, rev) + `uids.json`; SQLite export added by CI | the serverless static database every webapp pulls from (raw GitHub, and as plain files at `/catalogue-db/` on the Pages projects) | every webapp's build and client cache |

Why the writer path stays git: the owner-approval lock is a pull-request check, so an approved PR is the only door for a
change to an existing record. D1 and `catalogue-db` are rebuilt from it and are never edited by hand. The D1 account is at the
free plan's 10-database cap, so the core tables stay in `cedwyn-apps` with their `core_` prefix (no new database needed).

## 2. Sync, both ways
- **Down (catalogue → D1 → `catalogue-db` → webapps)**: `.github/workflows/catalogue-sync.yml` (planned main PR, after #153 and
  #143): on push to `data/core/**`, hourly, and on "Run workflow". Steps: validate every record; run the lock check (fail = stop);
  export JSON + SQLite to `catalogue-db`; load D1 through the Cloudflare API (`core_load.py`, idempotent upsert, one
  `core_changes` row per changed record); regenerate every webapp's `/_data/` slice and `/api/v1/`; bump each app's `rev`.
  Fallback if Actions is unavailable: one Worker cron an hour that only triggers the workflow (repository_dispatch).
- **Up (agents and flywheels → catalogue)**: a new record or a proposed change is written as a file on a branch
  (`core/<topic>` — the pattern PRs #140, #141, #143 already use) and opened as a PR. New records are additive; a change to an
  existing record waits for the owner's approval. A flywheel that writes to D1 directly (`POST /api/core`, planned in CORE-DB §3)
  writes to a `core_proposals` table only; the sync job turns proposals into a PR on `core/proposals-<date>` and never into a
  record. So D1 → git exists, but it always lands as a reviewable PR.
- **Never**: a webapp writes to the catalogue; a page view reads D1; a sync edits or deletes an existing record.

## 3. Catalogue UID scheme (checked 3 Nov 2026)
- Core schema 0.3.0 pattern `^(EV|MR|CC|KF|RET|PL|PE|EVT|AR|TS|OBS|TOC)-[A-Z0-9-]+$`.
  Checked: all 153 records in `data/core/records` (TOC 25, AR 69, PL 3, KF 50, RET 6), the 273 EV ids in the evidence register
  (EV-0001…EV-0679) and the 65 MR ids (MR-0001…) match. GHF-E… stays an alias, never a key.
- Two id families in use are **outside** the pattern today: correspondence threads `C<8 hex>` (D1 `core_items`, kept
  `public = 0`) and wayback copies `WB-NNNN` (range WB-0040…WB-0399 in the mail manifest). Proposal for schema 0.4.0 (a main
  PR for the owner's approval, no record edited): add `CO-<8 hex>` (alias of the `C…` thread id) and `WB-NNNN`.
- Webapps themselves get UIDs `APP-01` … `APP-59` (slot number); an app that moves slot keeps its UID.
- Files in the vault with no record yet carry a derived key `f-<sha1(path)[:10]>` and `uid: null` in every API — visibly
  "not yet catalogued", never passed off as a record.

## 4. How a webapp's own database works
- **Build/sync time**: the app's slice (`data.query`: kinds, UID prefixes, filter, public fields) is cut from `catalogue-db`
  and written as static JSON: `/<id>/_data/<slice>.json`, `/<id>/api/v1/index.json`, `items/<uid>.json`.
- **In the browser** (React-style client cache): `cw-cache.js` keeps each JSON in IndexedDB, shows the cached copy at once,
  revalidates in the background against the index `rev`, and pulls cold data from the static files — the same
  stale-while-revalidate pattern React data libraries use. Cross-app reads use the other app's static API, not its pages.
- **External data** (Cloudflare analytics, HubSpot, Gmail metadata, WhatDoTheyKnow, Internet Archive, Stripe catalogue):
  an adapter named in the manifest runs on its cadence (CI secret or the box's connected app), writes static files under the
  app, and is never called from a page view.

## 5. Requests
0 Worker invocations per page read for any migrated app; D1 reads/writes only inside the sync job (well inside D1's free
5M rows read / 100k written a day). GitHub Actions minutes are free on a public repo; Pages static requests are free.
