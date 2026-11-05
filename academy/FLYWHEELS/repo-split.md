# Flywheel: Webapp branch split

**Cadence:** every 15 minutes until done  
**Goal prefix (duplicate check):** `REPO SPLIT FLYWHEEL RUN`  
**Runner:** `the repository split goal on the project box` (on the project workspace)

## Purpose
Migrate the site into 59 webapp branches, one per parcel slot, each compiled and previewed on its own, plus a 60th branch holding the central database, landing page and header, which becomes the landing page and navigator that loads each compiled webapp in a container one at a time.

## Inputs
- the main branch and existing section branches
- the parcel slot registry

## Outputs
- one branch and preview per webapp
- the navigator branch
- a progress file counting webapps done of 59

## Metric
webapps split and previewing, of 59; navigator live

## Report rules
At milestones: navigator live, every ten webapps, all 59 done.

Built to the [flywheel schema](SCHEMA.md).
