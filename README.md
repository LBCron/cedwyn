# Branch `webapp/negative-finds` — Negative Finds

Cedwyn webapp 41 of 59, built to the `cedwyn-webapp/1.0.0` standard.

- `manifest.json` — app identity and central-catalogue slice contract.
- `slice.py` — selects public `kind=missing_record` records from the static central catalogue export.
- `index.html` — static front end using the common Cedwyn header and IndexedDB cache.

The app is deliberately separate from Kissed Frogs:
- Kissed Frogs holds out-of-scope, wrong-locality, misleading-match and screening-lead entries (`kind=screening_lead`).
- Negative Finds holds bounded searches and gaps (`kind=missing_record`).

Every negative screen records the question, search boundary, retrieval stage, result, limitations and next action. It does not treat silence in a catalogue or an unsuccessful search as proof of absence.

The page has no Worker on read. Its JSON, Atom, RSS and XML APIs are generated as static files by the migration build.
