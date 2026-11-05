# How an agent works here

## Read first
[SOUL](../SOUL.md), [standing orders](../MEMORY/standing-orders.md), the [chronology](../MEMORY/chronology.md) and [boundaries](../ACADEMY/BOUNDARIES.md); then pass the [self-test](../ACADEMY/CHECK.md).

## Scope
- The subject is **Great House Farm / Tŷ Mawr / Cydfin Farm** (the property), Llandough-juxta-Penarth, its records and the Williams–Buckler family's history of it, and this site.
- **Llandough Farm is not the farm.** It is a separate farm (NLW D 219/9–13) and lives in Kissed Frogs. Other same-name places (other "Great House Farm"s in the county) are not the farm either.
- Before treating a record as the farm, confirm the location (parish, grid reference, parcel). Name the parcel, or write "parcel not identified". Anything that fails the check goes to Kissed Frogs through its scope tag.

## Editorial rules (public text)
- Present ingredients, never conclusions: link the catalogued evidence page (`/research/evidence/ev-…/`) rather than writing a verdict or an inline citation.
- Neutral third person. Never name the project lead. No private individuals.
- The banned public words are listed base64-encoded in [agents.json](../agents.json) (`rules.banned_public_words_b64_json`); where something has not been checked, write "not checked".
- No insignia, no outbound links, nothing about family holdings or addresses.
- Interpretation is labelled as interpretation; competing readings are ranked, and what cuts against a reading is shown beside it.
- Nothing machine-facing on human pages.

## Versions
- Library, protocols and drafts use semantic versions (MAJOR.MINOR.PATCH); every material change bumps the version and leaves a signed changelog line.
- Products (e-books, documentary scenes) follow `/_cedwyn/versions.json`: newest v0.0.2, then v0.0.1, then -v0.0.2, -v0.0.3 (no -v0.0.1). Labels come from that file.

## Where things live
| Thing | Where |
|---|---|
| The records (master) | `data/core/` on main |
| A webapp's data | `data/views/<app>.view.json` → `/<app>/_db/view.json` |
| A webapp's layout | its theme branch: CSS, JS, images, `_ui/*.a2ui.json` (no record text) |
| Shared header and menu | `web/_cedwyn/ghf/sites/*.json`, `themes.json`, `data/site-areas.json` |
| Versions | `/_cedwyn/versions.json` |
| The catalogue | `/db/` (SQLite chunks), `/api/catalogue` (read API) |
| Research pages | `/research/` (branch section/research) |
| Programme and plans | `/projects/`, including `/projects/data-architecture/` |
| Draft review | `/hive/` (contract `/hive/join.json`) |
| Work discovery index | `/academy/work.json` and [the work index](../ACADEMY/WORK.md); GitHub Issues are the canonical project ledger |
| This academy | `/academy/` (branch agents) |

- Parcel numbers: every webapp shows "NN of 59" linked to the shared parcel modal; the registry is `data/site-areas.json` (see standing orders, "Webapps are parcels").

## How to pick up work
1. Read the Academy work index for candidate jobs, then search GitHub Issues in the relevant repository and linked repositories for the matching deliverable.
2. If an issue exists, claim it with a comment recording agent identity/version, UTC timestamp, scope and planned branch; assign it where appropriate. If no issue exists, create one using the Agent work item form and include the Academy job ID only as an optional discovery reference. The JSON work feed does not reserve jobs or own status.
3. One material change per turn, the smallest that meets the issue's acceptance criteria; then record a meaningful progress comment and signed changelog line with sources.
4. Commit to the branch that owns the files (theme branch, `section/research`, `agents`, `hive`); main only for site-wide changes by labelled pull request. No force-push; re-fetch the head before each commit; commit messages end with the agent's signature.
5. If a branch is owned by another running worker that day, leave a proposed patch instead of committing.
6. Verify live after the build with a cache-busted fetch at 390 px and desktop. Keep the GitHub issue open until the result is verified and all acceptance criteria are met.
7. Blocked? Record the blocker, next action and what would unblock it on the issue, then move to another unclaimed issue. Problems go to the problems flywheel.
8. Private recipient correspondence stays in the private correspondence system. Public issues must not contain email text, private names, contact details, personal data, confidential source material or case-specific facts.

## Contributing from outside
Outside agents submit by pull request linked to a canonical GitHub issue, or create a new item with the "Agent work item" form when no matching issue exists; the agent-lint workflow checks them. See [Contributing](../ACADEMY/CONTRIBUTING.md) and the [publish gate](../HARNESS/publish-gate.md).

- Quarantined leads: a same-named village elsewhere in Glamorgan is a separate place; its content lives only in Kissed Frogs (/kissed-frogs/), elsewhere at most one link, and it is worded "quarantined, under scrutiny" (a quarantine, not a dismissal). Research loops never chase it (standing order 39).
