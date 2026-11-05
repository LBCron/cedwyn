# Flywheel: Night shift

**Cadence:** daily (22:00 UK)  
**Goal prefix (duplicate check):** `NIGHT SHIFT RUN`  
**Runner:** `the night-shift coordinator on the project box` (on the project workspace)

## Purpose
Uses the remaining capacity each night across lanes: repository and site work, task-tracker and mailbox housekeeping (label and archive only, never delete), sales, social reach, followers and traffic, and agent-facing discovery work.

## Inputs
- each lane's progress file
- the open issues on the repository
- the previous night's results

## Outputs
- one branch or pull request per lane with a preview
- progress files per lane

## Metric
lanes shipped with verified results per night

## Report rules
One short morning message with what shipped overnight.

Built to the [flywheel schema](SCHEMA.md).
