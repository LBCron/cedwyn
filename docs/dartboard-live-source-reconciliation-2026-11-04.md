# Dartboard live-source reconciliation — 4 November 2026

**Branch:** audit/dartboard-routes-20261104 (unmerged)  
**Purpose:** correct the initial Phase 0 scope and record the multiple data models behind the Donkey Kong ramp. This is a read-only audit/design supplement; it does not change production or any existing route data.

## 1. Correction to the initial Phase 0 inventory

The earlier count of 47 institutions / 474 steps describes the older source on the Cedwyn dartboard branch (src/data/ramps.json, as-of 20 October 2026). It is not the whole current Dartboard application. The current application source is on the datro repository's dartboard branch, and the main app composes more than one data model.

A change to the older Cedwyn mirror alone would not correct the route-map UI, the Dates view, the correspondence marker feed or the separate Snakes & Ladders board.

## 2. Current application components and snapshots

| Component | Inspected source | Snapshot / volume | Meaning |
|---|---|---|---|
| Route map | datro@dartboard/public/data/ladders.json plus parts 1–2 | v0.5.1; 2 Nov; 58 recipients; 948 rungs | One institution-specific disclosure-route ladder per recipient |
| Dates view | datro@dartboard/public/data/roadmap.json plus parts 1–2 | generated 4 Nov 12:18Z; 76 lanes; declares 836 steps; 790 emails | Dated/projected interactions, clocks, failures and recipient lanes |
| Email display feed | datro@dartboard/public/data/snl-mail.json | generated 4 Nov 12:18Z; 71 lanes; 790 email items | Correspondence projection for the Snakes & Ladders visualiser |
| Snakes & Ladders board | datro@dartboard/public/data/snakes-ladders.json | generated 4 Nov 12:18Z; 36 squares, 7 ladders, 9 snakes | Broad route-family/game visualisation |
| Legacy institution ramps | datro@dartboard/src/data/ramps.json and src/data/avenues.ts | 19–20 Oct; 47 institutions / 474 route steps | Earlier per-recipient route and correspondence mapping |
| Cedwyn mirror | cedwyn@dartboard/src/data/ramps.json, compiled by tools/dartboard_options.py | 20 Oct; 47 / 474 | Separate static route view/mirror, not the full current app model |

The public release dartboard-v0.4.0 (2 November) says 55 recipients and 900 rungs. The inspected index is already v0.5.1 with 58 recipients and 948 rungs. The component src/components/route-map.tsx still labels itself v0.4.0 and appends v=0.4.0 to the fetch URL for /data/ladders.json. This is a cache/version-skew risk: the UI's source version and data index version are not tied together.

The current app therefore has multiple independently generated views rather than one clearly versioned canonical route/correspondence object. No stable ID/alias mapping has yet been demonstrated across all 58 recipient IDs, 76 lane IDs and 71 mail-feed lane IDs. Some obvious identities use different IDs (for example, HMLR has different IDs in the route-map and Dates views), so raw ID intersection is not a sound reconciliation method.

## 3. Reconciliation discrepancies

### 3.1 Dates view step-total mismatch

The Dates index declares 76 institution lanes, 836 total route steps, status totals of 78 done, 10 missed, 74 pending, 625 not yet reached and 49 not applicable, and 790 emails.

The two split part files contain additional lane-level email/request/failure arrays. The 76 lane records' actual steps arrays sum to 773, not 836. Their recorded statuses sum to 773: 70 done, 10 missed, 62 pending, 623 not yet reached and 8 not applicable.

That leaves a 63-step discrepancy, including mismatches in status totals. The split part files add email/request/failure arrays, not the missing route-step rows. No public index should describe 836 actual, retrievable lane-step records until the generator and its acceptance test reconcile this arithmetic.

### 3.2 Different lane counts for related datasets

- Route-map index: 58 recipients.
- Dates view: 76 lanes.
- Mail display index: 71 lanes.
- Dates view and mail index both report 790 email entries, but one has 76 route lanes and the other has 71 mail-feed lanes.

These counts may describe different scopes. They must not be compared as if they were identical populations. Reconcile by institution identity and request/thread ID, preserve aliases and multi-institution associations, and record unmatched or one-to-many mappings. Do not merge by name fragments alone.

### 3.3 Evidence coverage is concentrated in correspondence markers

For the 948 route-map rungs:

- all 948 have a legal-source description;
- 930 have a direct URL field and 18 do not;
- there are 221 correspondence markers in total: 126 chestnut, 48 policy-pointer and 47 disclosure markers;
- 200 markers have a direct URL, 160 have a quote, 126 have a citation list, and 13 have a correspondence-title field;
- those markers annotate only 46 distinct rung numbers (18 done, 25 current, 3 not-available).

This does not prove that other rungs lack evidence: material may exist in general institution records, the Dates view, an artifact ID or the legal-source register. It does show that the route map itself does not visibly establish a direct correspondence marker for most route rungs. Migration must bind each status to the particular message/artifact supporting it, not just link the institution to a correspondence archive.

For the Dates view, after joining the split files to the base lane index:

- 773 step rows are present, of which 67 have a link, 69 have an evidence ID and 592 have a date;
- 790 email rows are present, of which 662 have a URL, 658 have a Wayback URL, 690 have an evidence ID, 118 list attachments and 22 contain a fee field.

A stored email/evidence ID is not enough by itself: it must resolve to a provenance-bearing artifact, an accessible protected original and (for public rendering) a rights/privacy-reviewed derivative.

## 4. Specific route-state defect: HMLR OC1 / HC1 / OC2

The HMLR route-map rung for official copies, historical register editions and filed deeds is marked na. Its explanation says the route is fee-bearing and was not ordered because no spend is authorised.

The component maps na to the user-facing label “Not available here”. That is materially wrong for this case: the rung describes a route that exists, has an identified form/fee process and is deliberately not pursued under the current no-spend decision. It is not a route that is legally unavailable or not provided by HMLR.

The replacement model must separate:

- route availability: e.g. AVAILABLE or CONDITIONAL;
- case status: e.g. UNTRIED / HELD_PENDING_OWNER_DECISION (or an equivalent explicit state);
- cost state: statutory fee, optional copy/reproduction charge, optional search fee, unknown, waived/alternative route;
- authority: current form, rule and official fee schedule;
- decision gate: no expenditure until authorised.

Apply the same check to archive copying, paid digitisation and other fee-bearing rungs currently coded na. A decision not to incur a charge must not make the route disappear or tell the user it is unavailable.

## 5. Legacy data and legal status need controlled migration

The app has three status vocabularies:

1. Route map: done / current / next / remaining / na.
2. Dates: done / missed / pending / not yet reached / na.
3. Legacy ramps: done / pending / queued / overdue / open / na.

The same word can mean different things between views. Route-map done means “used”, not necessarily disclosure complete; Dates done means a timeline event occurred; legacy done is a rung marked complete. Do not copy strings directly between models.

Use the v2 taxonomy in src/data/route-taxonomy-v2.json for the new conceptual separation. Keep the original source status immutable in a legacy field; mapping must create a reviewed status event with its supporting artifact and rationale. Do not silently overwrite an old state or infer that one response closes every independent route.

The route map also contains a general rights-reservation statement. Its presence in a UI is not legal assurance that a reservation achieves any particular procedural result. Keep it descriptive and require solicitor review before relying on it in litigation.

## 6. Privacy and ingestion finding in datro bpvsbuckler

The public repository unclehowell/datro, branch bpvsbuckler, contains 28 .eml files beneath static/bpvsbuckler/evidence/emails/. The deployment workflow .github/workflows/deploy-bpvsbuckler.yml uses rsync to copy the static tree into dist/; its explicit exclusions include content/graph/raw, but not evidence/emails. Therefore the .eml directory is eligible for inclusion in deployment output. The public Git branch itself also exposes those files.

I attempted to retrieve a representative Pages URL through the available web reader, but it returned an access error; live Pages accessibility is not independently verified here. That does not remove the GitHub public-source exposure. No raw email or attachment has been copied into the new audit branch.

The Gmail importer static/bpvsbuckler/content/graph/ingest_gmail.py also sets FAMILY = '[redacted]' and uses that literal to determine whether a message was sent by the owner. Unless input records literally contain that placeholder, the sender-direction test cannot reliably identify the owner's mailbox. Party/domain mapping also needs review. The importer reads exported thread JSON and manual extracts from raw/gmail/; it is not a live, idempotent Gmail connector.

**Required safety action:** preserve source hashes and repository history, verify exactly which raw emails/attachments are in public GitHub and Pages, then move originals to an access-controlled store and serve only rights/privacy-reviewed derivatives. Do not delete the only copy, overwrite history, add more raw correspondence or assume a redacted subject makes an entire .eml safe.

## 7. Deployment and operational boundaries

- The v0.4.0 release note records a successful Worker deployment and a 390px visual check on 2 November. That is a release assertion, not a new independent check of the live site on 4 November.
- The current Worker JSON and the website's same-origin copy could not be fetched by the available web reader during this audit.
- Cedwyn's main site build and the Dartboard Worker are separate deployments. A Cedwyn main build is not proof of a Dartboard Worker update; a Dartboard Worker deployment is not proof the Cedwyn mirror is current.
- The current Gmail review was a paginated search and selected full-thread checks, not a complete message-by-message classification of all 608 matching threads.

Track separate release assertions for source commit, Worker deployment, Pages/main-site build and independent cache-busted HTTP verification. Do not call a change live until the corresponding URL and expected content have been fetched.

## 8. Updated implementation priority

1. **P0 — privacy containment:** verify and contain the raw .eml exposure while preserving immutable source copies and hashes.
2. **P1 — authoritative source map:** designate canonical IDs and writers for institutions, requests, messages, artifacts, route definitions, route instances, deadlines and fees across datro@dartboard, datro@bpvsbuckler and Cedwyn.
3. **P2 — reconcile generators:** resolve the 836 vs 773 step discrepancy; align recipient/lane identity across 58, 76 and 71; bind route status events to case artifact IDs.
4. **P3 — correct status vocabulary:** ensure fee-deferred routes remain visible as available but untried/not authorised, not “not available here”; distinguish not-held/search-completed/refusal/referral/acknowledgement.
5. **P4 — single versioned read layer:** create one reviewed migration path in Cedwyn; preserve legacy data, with versioned aliases and redirects. Keep the datro branch as read-only/source archive after cutover; do not force-delete it.
6. **P5 — release gate:** CI must validate lane and email counts, every route's legal authority, every case-status event's artifact link, no private originals in public output, all alias joins, and a cache-busted live fetch of the route map, Dates view and solicitor bundle.

## 9. Verification limitations

This supplement uses inspected GitHub source files and the repository's release/workflow declarations. It does not assert that the Worker/Pages endpoints currently serve the expected payload; the web reader could not independently fetch those endpoints. It does not claim that the 608 Gmail threads have all been classified, that every route deadline has been legally verified, or that an ECHR reopening test is met.

No external email was sent, no Gmail draft was created, no public site or production Worker was changed, no raw email was copied to the audit branch, and no branch was merged.
