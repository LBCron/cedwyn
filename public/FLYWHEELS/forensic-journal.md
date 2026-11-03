# Flywheel: Forensic journal

**Cadence:** every 6 hours at 05:45, 11:45, 17:45 and 23:45 UK  
**Goal prefix (duplicate check):** `FORENSIC JOURNAL RUN`  
**Runner:** `the forensic journal runner on the project box` (on the project workspace)

## Purpose
Journal every activity of each institution in the record objectively, one dated entry per substantive reply or page change, with links to the archived email, the before/after page copies and web-archive copies, and refresh each institution's assessment.

## Inputs
- the mail manifest (after email ingest)
- page-change records from the watchtower
- hand-written objective entries

## Outputs
- new dated journal entries per institution
- a refreshed assessment per institution
- a metadata-only catalogue page (derived, never edits a record)

## Metric
substantive replies and page changes since the last run with no journal entry (target zero)

## Report rules
Nothing routine; a message only on something significant (a reversed position, a new refusal, a deadline within 3 days).

Built to the [flywheel schema](SCHEMA.md).
