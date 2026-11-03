# Flywheel: Task mirror refresh

**Cadence:** hourly  
**Goal prefix (duplicate check):** `HUBSPOT MIRROR REFRESH`  
**Runner:** `the task mirror runner on the project box` (on the project workspace)

## Purpose
Keep the public mirror of the project board's tasks fresh: re-read tasks changed since the newest row and publish the mirror file with its generated time.

## Inputs
- project-board tasks changed since the last refresh (metadata only)

## Outputs
- the mirror file on the projects branch, live within about a minute
- one log line per run

## Metric
age of the mirror's generated time (never more than six hours)

## Report rules
Nothing routine; a message only after three failed runs in a row.

Built to the [flywheel schema](SCHEMA.md).
