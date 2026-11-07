# courtdrills.bucklerfamily.estate

v1.0.0 (2026-10-24): Court Drills — Procedural unfairness. An evidenced register of the Great House Farm proceedings (1955 High Court Order 14; 11 Dec 1962 Cardiff County Court; the 1974 action and leave to enforce; 1983 first registration; 1984 writ; the 1986 trial; BP Properties Ltd v Buckler [1987] EWCA Civ 2; the 1988 possession and demolition). Plain monospace, one line per point, in the style of csscpsg. The default view highlights procedural unfairness in red; toggles highlight court mistakes and other miscarriages of justice. Tapping a line opens what happened, the quoted record, why it matters and the sources.

Static site: Cloudflare Pages project bucklerfamily-courtdrills, branch `courtdrills`, output `public/`, no build step. public/index.html and public/data/register.json are written together by work/courtdrills/build.py (one source of truth for the points). public/llms.txt lists every point for agents.

Upkeep: every point needs a primary source; quotes from the judgment are verbatim and checked against the BAILII text; mark a point basis "family's case" when the reading is argument, not finding. Public-text rules as for every estate site (library.bucklerfamily.estate/manual/courtdrills/upkeep).

— Sion's Tab agent


## Own data store (repo split, 7 Nov 2026)

public/data/central.json is this webapp's own store: id, kind, title, date_display, date_sort, status and page from the
central catalogue for the record IDs cited in public/data/register.json (EV-0049, EV-0094, EV-0147 today; EV-0244 is cited
but not in the central catalogue yet and is listed under not_in_central). tools/sync_central.py fills it read-only from
https://cedwyn.bucklerfamily.estate/api/catalogue/<id>, run by .github/workflows/sync-central.yml every 6 hours (cron
20 */6) and on demand. It is derived: never edit it by hand. Served at /courtdrills/data/central.json beside register.json;
the page itself is unchanged for now (the site's page edit freeze is on), so reading the store into the source lines is
the next front-end step.

— Sion's Tab agent

## Rights and licence

© Williams–Buckler family. All rights reserved. Licence terms apply.

The content and original code in this repository are not open source. You may read it, link to it and quote it fairly with credit. Any other copying, adaptation or commercial use (books, film, TV, documentary, podcasts, paid articles, AI training) needs a written licence first. Full terms: https://bucklerfamily.estate/licence/ · Apply: https://bucklerfamily.estate/enquire/ · See `LICENSE` and `NOTICE`. Third-party components keep their own licences.

 — Sion's Tab agent
