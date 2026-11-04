# Flywheel: E-book PR flywheel

**Cadence:** every 6 hours  
**Goal prefix (duplicate check):** `EBOOK PR RUN`  
**Runner:** `the e-book PR runner on the project box` (on the project workspace)

## Purpose
The off-site PR desk for the e-book collection: retail and library listings, free chapter-one samples on worldwide indexing sites, the printer and wholesaler route, and drafted book-signing and publisher enquiries. On-site funnel fixes stay with the sales-fix loop.

## Inputs
- a ranked channel tracker (the source of truth)
- terms and costs researched from each channel's own pages
- the clean release-candidate book files

## Outputs
- one material step per channel lane per run
- verified listing pages
- drafts only for venues and publishers

## Metric
channels live (verified URL) out of channels ranked

## Report rules
A message only when a listing goes live with its verified page, or a step only the project lead can take is newly ready.

Built to the [flywheel schema](SCHEMA.md).
