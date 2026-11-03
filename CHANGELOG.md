# Changelog — Forensic Assessments (Cedwyn webapp 39 of 59)

## [1.1.0] - 2026-11-03
### Changed
- Reworked the index into a responsive institution directory with full-text search, assessment-status filters, reading-indicator filters and sorting by priority, latest contact, next deadline, name or indicator.
- Kept the at-a-glance table as a collapsible priority snapshot and made the 64 assessed / 17 not-yet-assessed distinction visible in the directory controls.
- Replaced the light-only page palette with a day/night palette driven by Cedwyn's shared theme setting; the shared header, banner, navigation and footer remain the single site-wide implementations.
- Improved mobile layout, focus states, filter feedback and reduced-motion behaviour.

### Preserved
- All carried-forward assessment text, institution pages, status wording, correspondence summaries, evidence links and source references.
- The app's existing theme-local, read-only SQLite slice generated from the central catalogue at build time.
- Slot 39 of 59 and its adjacent navigation positions.

## [1.0.0] - 2026-11-01
### Added
- New webapp at /forensic/ (branch section/forensic): index of 64 institutional forensic assessments plus 17 bodies with recent correspondence not yet assessed.
- Each assessment carried over unchanged from its Legal Wiki page (old version and date shown), with a dated "Since last assessment" section listing every email on file since that page's cut-off (205 in all), cited by date and reference.
- Response status re-read from the latest reply; where it changed the earlier value is shown struck through beside the new one (19 changes).
- "NN of 59" parcel link (slot 39), language switcher (English; Welsh and Spanish interface strings, assessment text translation pending), scope tag data-scope="online".
- Company pages (Mountjoy Ltd, Western Ground Rents Ltd) list enquiries about each company made to other bodies, each row naming the body.
- Case file on every institution page: conduct timeline with verbatim quotations, inconsistencies and gaps, quarantined-name links, duty and liability (our reading), evidence still needed.
- Index: at-a-glance table with the column "Liability indicators (our reading): none / some / strong"; data.json carries the same value.
