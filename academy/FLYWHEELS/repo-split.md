# Flywheel: Webapp repository split

**Cadence:** every 15 minutes until done  
**Goal prefix (duplicate check):** `REPO SPLIT FLYWHEEL RUN`  
**Runner:** `the repository split goal on the project box` (on the project workspace)

## Purpose
Move each of the 59 webapps (one per parcel slot) into its own dedicated repository that deploys and previews on its own, with the main repository keeping the central catalogue database, landing page, header and the navigator that loads each compiled webapp one at a time. A slot with no built webapp yet holds a blank coming-soon-NN repository until a real webapp replaces it.

## Inputs
- the main branch and existing section branches
- the parcel slot registry

## Outputs
- one dedicated repository and preview per webapp
- coming-soon-NN placeholders for empty slots
- the navigator (N of 59)
- a progress file counting webapps done of 59

## Metric
webapps split and previewing, of 59; navigator live

## Report rules
At milestones: navigator live, every ten webapps, all 59 done.

Built to the [flywheel schema](SCHEMA.md).
