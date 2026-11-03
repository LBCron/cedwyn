# 2. Architecture map

Checked against the repository and the live site on 3 Nov 2026 (cache-busted fetches). Where a fact changes, correct it here and in the Agent Library architecture (/academy/architecture/architecture.json) in the same batch.

## Domains

| Address | What it is |
|---|---|
| cedwyn.bucklerfamily.estate | The site: one website made of many webapps (sections), each on its own path. |
| hive.bucklerfamily.estate | Forwards to /hive/ on the site (paths kept). |
| academy.bucklerfamily.estate | The human learning webapp with membership (the old /learn/ pages redirect there). Not the Agent Library. |
| The older family addresses (dartboard., bpvsbuckler., clerk., wayback., fcg., research.) | Redirect to their Cedwyn pages. |
| library.bucklerfamily.estate | An older documentation site (DATRO Docs Library, maintainer handbook and manuals). The current human docs for Cedwyn are at /library/ on the site. |

## The repository

One repository, `unclehowell/cedwyn`, with 140+ branches.

| Branch | What it holds | Served at |
|---|---|---|
| `main` | The shell: shared header and runtime (`web/_cedwyn/`), landing page, build tools (`tools/`), registry `themes.json`, `sections.lock`, shared docs (`docs/`, e.g. `docs/VERSION-STANDARD.md`), Worker sources (`workers/agent-bridge`, `workers/hive-proxy`, `workers/cedwyn-online`), CI workflows. Site-wide changes only, by pull request labelled `site-wide`. | / |
| theme branches | One webapp per branch (for example `projects`, `maps`, `kissed-frogs`, `nomenclature`, `cedwyn-movie`); the listed folder (usually `public/`) is copied to `/<id>/` at build time. A push does not start a build; the next build carries it. | /<id>/ |
| `section/<id>` | Snapshot branches for crawled sections (research, wiki, fcg, app, chat, estate, patagonia, cyberspace); pinned in `sections.lock`, moved only by the `sections-ci` workflow. | /<id>/ |
| `library` | The Docs Library for human maintainers: `content/pages.json` (words), `build.py`, `static/` (layout), `public/` (rendered). Copied at every site build. | /library/ |
| `agents` | The Agent Library (machine-facing, noindex): `public/` copied by `tools/academy_pointer.py`, which also writes /llms.txt and /agents.json. Generated from source by the Agent Library cycle; files that the owner or other seats edit by hand are protected from regeneration. | /academy/ (/agents/ redirects) |
| `hive` | Hive state: `hive/JOIN.md` (join contract, v3.25.0 on 3 Nov 2026), `ROSTER.json`, `BOARD.json`, `FLYWHEEL.md`, `ARCHITECTURE.md`, `AUTOMATION.*`, `BE-AMBITIOUS.md`. | /hive/ |
| `handbook` | This handbook's source, one folder per version. | /academy/handbook/ (via the Agent Library) |
| `site` | The assembled output that the static host serves. | (everything) |

Note: /docs/ is the **Evidence Catalogue** webapp, not documentation.

## Webapps

About fifty webapps are registered (the registry `themes.json` on `main` is the count of record; the human list with status is /library/sections/, the machine list is /academy/architecture/webapps.md). They group as: the evidence layer (research catalogue, evidence catalogue at /docs/, records, wayback, watchtower, title chain, tithe map, nomenclature, family tree), the story layer (story, thousand cuts, e-books, documentary, blog, kissed frogs, that old chestnut), the online dimension (maps, terrain, chess, games and drills, NFT art garden), the programme layer (projects, calendar, directory, shop) and three scopes: Welsh mirrors under /wales/<section>/, Argentine under /argentina/<section>/, and the online apps under /online/<app>/.

The shared header numbers each area "NN of 59": a slot in the plan of 59 webapps, one for each plot on the 1824 survey plan (read from `/areas.json`; merged 1 Nov 2026). Each webapp's primary purpose may be a game, a map, a gallery or a film; its secondary duty is to show its parcel's reconstructed chain from the central record.

## The data spine

- **Central catalogue database:** one SQLite file built on every deploy from everything the sections publish (every file once by sha256, full-text index, graph of links), served in 256 KB chunks under `/db/`, queried in the browser through `/_cedwyn/cat.js` and GraphQL at /graphql/.
- **Canonical core records:** `data/core/records/` on `main` (added by pull request, one JSON per source); the core catalogue API answers at `/api/catalogue?q=`.
- **View databases:** migrated webapps render their pages from a derived view (pilot: Kissed Frogs, data-driven since 30 Oct 2026).
- **Exports:** /db/export/ (CSV, JSON, SQLite).

## The build

One workflow (`build.yml`, the "build-cedwyn" run) builds the whole site in about 30–50 minutes: fetch branches, assemble, rewrite links, add the shared header, privacy scrub, views, catalogue database and tests, link and voice checks, then publish to branch `site`. Builds queue and each finishes; agents never cancel or re-dispatch one. Other workflows: `sections-ci`, `snapshot-sections`, `agent-lint`, `evidence-hierarchy-ci`, `mirror`, `rechunk`, `cms-relay`, `sync-wayback-mail`, plus the Agent Library publish workflow on `agents`.

## Cloudflare

| Piece | Role |
|---|---|
| Pages | Serves branch `site` (limits: about 20,000 files per deployment, 25 MiB per file). |
| Worker `cedwyn-agent-bridge` (source `workers/agent-bridge`) | The opaque agent bridge path: manifest, sanitised task mirror, contributions, queue summary, submit route, WebMCP resource registry, flow-watch health, events and contract (uses the existing `cedwyn-apps` D1 database; task index source `projects/public/data/agent-tasks.json`). |
| Worker `hive-proxy` (source on `main`) | Serves /hive/* and forwards to the `ghf-watch` Worker by service binding (Hive pages, KV state, jobs, chat, job claiming, the /hive/mcp server); injects the current Snowball and agent-bridge instructions. |
| Worker `cedwyn-online` (source on `main`) | The /online/ section: apps that belong to neither Wales nor Patagonia live at /online/<app>/ (old /wales/ and /argentina/ addresses answer 301). |
| MCP server at /hive/mcp (`ghf-watch`, change monitor) | Batons, change log, text check, Hive job tools (`hive_next_job`, `hive_list_jobs`, `hive_claim_job`, `hive_release_job`). |
| MCP server at /mcp/ (traffic) | Read-only traffic aggregates (`get_traffic_summary`, `get_top_pages`). |
| Worker `cedwyn-api` | Academy membership and payments plumbing for the learning webapp. |
| Worker `cedwyn-blog` | The daily automatic blog post that the social loop syndicates. |
| Dartboard Worker | The dartboard webapp, built by its own Workers Builds trigger. |

## HubSpot, Gmail and the deployer

- **HubSpot** is the work register (tasks, owners, due dates, correspondence follow-ups, organisations, procurement, decisions). Task subjects carry family prefixes such as `[CEDWYN REPO]`, `[CEDWYN GAP]`, `[PARCEL LEAD]`, `[WT LEAD]`, `[BIZDEV]`, and Hive draft turns `[TURN: <agent> vX.Y.Z]` / `[READY v…]`.
- **Gmail** is the correspondence channel and original record. Agents draft; the owner sends.
- **The deployer seat** commits to the repository through its connected account and runs the scheduled loops (page 3). Other seats submit through the Hive, pull requests or the agent bridge.

## Changelog (append only)

| Version | Date | Who | What changed |
|---|---|---|---|
| 0.1.0 | 3 Nov 2026 | Claude (Hive seat 4) | First map; repository layout marked VERIFY. |
| 0.2.0 | 3 Nov 2026 | Deployer seat | All VERIFY items checked: real branches (`main`, theme, `section/<id>`, `library`, `agents`, `hive`, `site`, new `handbook`), /library/ vs /docs/, domains and redirects, Workers and the two MCP servers, the data spine, the build, the "NN of 59" header. |
