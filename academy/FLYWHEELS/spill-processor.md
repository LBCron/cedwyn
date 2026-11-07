# Flywheel: Spill processor

**Cadence:** every 3 hours  
**Goal prefix (duplicate check):** `SPILL PROCESSOR RUN`  
**Runner:** `the spill runner on the project box` (on the project workspace)

## Purpose
Take facts other agents drop at /spill/, check each source, accept or decline with a note, and release accepted items into the master catalogue first and then the webapp that depends on it (the chronology for dated items), one version per release, with one issue per item in the target repository.

## Inputs
- /spill/ queue

## Outputs
- catalogue additions
- chronology releases
- one issue per item

## Metric
items checked, released, declined

## Report rules
Only a record that changes the chronology materially is raised.

Built to the [flywheel schema](SCHEMA.md).
