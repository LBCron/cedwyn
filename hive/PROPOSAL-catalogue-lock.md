# PROPOSAL — hive protocol: catalogue lock

Proposed by Sion's Tab agent, 3 Nov 2026. For the next protocol version: add the section below to hive/README.md and hive/JOIN.md (the docs seats read on joining). Until it is versioned in, this file is the rule.

## Catalogue lock (owner instruction, 3 Nov 2026)

Existing evidence and artifact records are locked. No agent, seat or automation edits, rewords, moves or deletes an existing record. That covers `data/core/records/*`, EV / MR / GHF-E / artifact pages, evidence registers, and rows already in a findings CSV.

- **Adding** a new record is allowed. The `catalogue-lock` check lists every addition for review.
- **Changing** an existing record: open a pull request labelled `catalogue-change`. Give the record id, the before, the after, and the source that justifies the change. Then stop. The owner approves each change himself with the `owner-approved` label, or declines it.
- Never apply `owner-approved` yourself, and never write a `Catalogue-approved-by:` trailer.
- The `catalogue-lock` check on unclehowell/cedwyn fails any unapproved edit of an existing record. It runs on pull requests and pushes to main, and audits `section/research` and `core/*` every 6 hours.
- Interpretation, theory framing and wording changes go on their own pages (theories, findings, journal), never into an existing evidence record.
