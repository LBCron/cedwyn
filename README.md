# Branch `webapp/wayback` — Wayback Vault (standard cedwyn-webapp/1.0.0 pilot)

The standard package for this webapp: `manifest.json` (slot 3 of 59), `slice.py` (cuts the app's slice from the central catalogue mirror, branch `catalogue-db`, and returns API items keyed by catalogue UID), `index.html` (static front end: common header, client-side cache, reads its own API). Built and served by branch `migration` (`migration/tools/build_site.py`) at https://cedwyn-migration.pages.dev/wayback/. The live app keeps building from branch `wayback` until the cutover.
