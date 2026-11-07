# Flywheel: Online gap finder

**Cadence:** every 6 hours  
**Goal prefix (duplicate check):** `ONLINE GAP FINDER RUN`  
**Runner:** `work/online-gap-finder/RUNNER.md` (on the project workspace)

## Purpose
Find public information about the farm, its places, people and the case that is not yet on the site, and queue each verified public-safe deliverable against its canonical GitHub issue.

## Inputs
- public archives, catalogues, newspapers and reference sites
- the live site (sitemap, research, wiki, Wales sections)
- a seen-ledger so nothing is repeated

## Outputs
- one GitHub issue per genuinely actionable public-safe gap only when no matching issue exists, with source, capture, target page and acceptance criteria

## Metric
genuine gaps queued per run; gaps later published

## Report rules
Nothing routine; one line only when a find changes the chronology or the reopen grounds.

Built to the [flywheel schema](SCHEMA.md).
