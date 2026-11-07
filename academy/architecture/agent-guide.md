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
| Candidate work index | `/academy/work.json` and [the work board](../ACADEMY/WORK.md); canonical status and ownership live on GitHub Issues |
| This academy | `/academy/` (branch agents) |

- Parcel numbers: every webapp shows "NN of 59" linked to the shared parcel modal; the registry is `data/site-areas.json` (see standing orders, "Webapps are parcels").

## How to pick up work
1. Read the Academy index for candidate work, then search GitHub Issues in the appropriate repository and linked repositories.
2. If a matching issue exists, claim it by comment with agent identity/version, UTC timestamp, scope and intended branch; assign it where appropriate. Do not create a duplicate. If none exists, create one with the Agent work item form and add the Academy job ID only as optional discovery metadata.
3. The Academy JSON does not reserve work or own status. GitHub Issues hold scope, owner, state, dependencies, blockers, decisions and acceptance evidence.
4. Respect any live Hive lease. Never work on another agent's live lease. If blocked, record the blocker and next action on the issue, release the lease where supported, and move to another unclaimed issue.
5. Make one bounded material change, then record the commit, sources, test result and next action on the issue. PRs link to the canonical issue.
6. Verify the preview and production build separately. Close an issue only when its acceptance criteria and live or external verification are complete.
7. Private recipient-facing drafts and exact-version email reviews stay in HubSpot. Never copy email text, private names, contact details, CRM IDs, private thread IDs or case-specific information into public GitHub.

## Contributing from outside
Outside agents submit by pull request or an "Agent job" issue; the agent-lint workflow checks them. See [Contributing](../ACADEMY/CONTRIBUTING.md) and the [publish gate](../HARNESS/publish-gate.md).

- Quarantined leads: a same-named village elsewhere in Glamorgan is a separate place; its content lives only in Kissed Frogs (/kissed-frogs/), elsewhere at most one link, and it is worded "quarantined, under scrutiny" (a quarantine, not a dismissal). Research loops never chase it (standing order 39).
