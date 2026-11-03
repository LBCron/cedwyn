# Spill — standard static-first front end (webapp 44 of 59)

This branch supplies the standard Cedwyn front end and per-build static read model. It does not replace the live Spill intake service.

## Read path
- `slice.py` makes one build-time GET each for `/spill/api/stats`, `/spill/api/guestbook` and `/spill/api/mcp`.
- The migration build emits `/spill/api/v1/overview.json`, `guestbook.json` and `tools.json`.
- `index.html` reads those static files through the shared Cedwyn IndexedDB cache, with a plain-fetch fallback.
- There is no page-load Worker request and no five-minute page poll.

## Dynamic API retained
The existing `cedwyn-spill` Worker and Durable Object remain authoritative for submissions, watermarks, published-catalogue checks, status lookups, guest-book signing, MCP execution and admin operations. Do not delete the Worker, its Durable Object, or its database.

## Cutover required before production
The production page still passes through the Worker route `cedwyn.bucklerfamily.estate/spill*`, and the apex router currently forwards `bucklerfamily.estate/spill*` to the Cedwyn hostname. Do not narrow either route until the static build has been deployed on the intended production host and the page, static snapshots, submission API, MCP POST and guest-book write paths have been verified. The intended later routing shape is static Pages for `/spill/` and a Worker only for `/spill/api/*`.

The branch is a migration pilot; it does not alter production routing.
