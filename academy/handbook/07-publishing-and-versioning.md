# 7. Publishing and versioning

Arcs A6 (present) and A7 (re-release) of the apex loop.

Publishing is a step in the flywheel, never the end of it. Every release can be superseded by a better one when the evidence improves.

## The content ladder

evidence page → blog post → e-book section → documentary scene brief → merchandise concept (draft only) → guided-tour stop → museum interpretation panel → map, game or webapp feature.

The **story engine** target: one confirmed finding yields all five of the first assets within 24 hours, each traceable to a catalogued evidence page.

## Semantic versions for e-books and reports

- **MAJOR**: a structural change or a reinterpretation that changes a conclusion (for example a title chain re-ordered because a new instrument was found).
- **MINOR**: new chapters, new evidence, new parcels covered.
- **PATCH**: corrections, transcription fixes, wording, links.
- Every release carries a **"What changed in the evidence"** note and a link to the correction log.
- Earlier versions stay available and are marked superseded, never deleted.
- Quality gates before any release: every sentence traces to a catalogued page; labels intact; public-text rules (page 8) satisfied; the privacy scrub passes; a second agent reads the diff.

## The site's version standard (LIVE)

Every versioned item on the site (e-books, documentary cuts, courses, any piece that gains versions) follows `docs/VERSION-STANDARD.md` on `main` (version 1.1.0, 2 Nov 2026):

- Versions are semantic and listed oldest first; the first is always `v0.0.1` and it is always free.
- Only the latest version's price is stored; each earlier version is £4.99 less per step back, never below £0.
- An (i) button beside every version drop-down opens a table of the changelog: version, date, what changed, pages or length, price.
- Data in `web/_cedwyn/version-gate.json`; behaviour in `web/_cedwyn/version-gate.js`; the audit `tools/version_audit.py` runs every six hours and corrects minor drift.
- Edition labels come from these data files, never typed by hand into pages.

## Documentary scenes (real time)

- Made scene by scene as each scene's evidence anchors are complete: one row per scene (anchors, languages with status per make, gate state, next no-spend step).
- **Period action only**: no narrator, no fourth wall; native Welsh, English and Spanish makes (not machine-translated overlays).
- **Gate before spend:** a render gate must pass before any paid render. The no-spend steps (script review, recut without captions, frame audit, dry run) are done first and count as progress.
- A scene never presents interpretation or a contested assertion as established fact; the scene brief names the evidence page behind each action.
- Scenes are re-cut and re-released when a source improves; the scene bible records which version each release used.

## E-books

A series, one chapter section per finding where it fits the story. Original art, own text or public-domain material only. Re-released under new semantic versions; the front matter lists the evidence cut-off date of that version.

## Guided tour in Wales

Each stop is tied to a parcel (parcel number and tithe or OS reference), a set of catalogued records, and a plain-language panel text. Stops are drafted from the reconstructed parcel chain, so they improve when the chain does. Public access, safety and landowner permissions are separate workstreams and need the owner's decisions.

## Museum in Argentina

A separate project from the evidence work: the proposed Great House Farm II replica and museum concept in Patagonia. It draws on the same central record for its interpretation panels and on shared artefacts where any can lawfully move. Keep it conceptually and legally separate from the historical Great House Farm in Wales. No land purchase, deposit, contract or funding representation without the owner's explicit approval and independent professional advice.

## Maps, games and webapps (the online dimension)

Each webapp holds one of the 59 planned slots ("NN of 59", page 2). Its primary purpose may be a game, a gallery, a map or a film; its secondary duty is to show its parcel's reconstructed title chain and activity from the central record. Build them so they improve automatically when the record improves (read through the API; never copy evidence in).

## Merchandise and partner shops

Original artwork, redrawn maps and own text, Welsh phrases and public-domain material only. Never reproduce newspaper cuttings, photographs or third-party works on products. Nothing is listed or sold until the owner agrees. Interpretation and contested assertion never appear as fact on a product. Partner plant links: link out only; no payments taken, no baskets held, on a partner's behalf.

## Transparency reporting

A weekly digest (draft for the owner to send, opt-in recipients only, an unsubscribe route in every email) and a public progress page built from the same figures: sent this week, replies received, replies overdue, new evidence pages, rung changes, next 14 days of deadlines, dead ends logged (honest misses), plant of the week, e-book and documentary updates.

## Corrections

A public correction log exists for every release. A correction is added, never silently edited in. Where a finding is withdrawn, the page states what was withdrawn, when, and why.

## Changelog (append only)

| Version | Date | Who | What changed |
|---|---|---|---|
| 0.1.0 | 3 Nov 2026 | Claude (Hive seat 4) | First publishing page. |
| 0.2.0 | 3 Nov 2026 | Deployer seat | Added the site's live version standard (v0.0.1 free, latest paid, £4.99 less per step back, (i) changelog table, data files, six-hourly audit); museum wording aligned with the Patagonia concept; webapp slots as "NN of 59"; arcs A6–A7 named. |
