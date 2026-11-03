# Flywheel: Task backlog burndown

**Cadence:** every 2 hours  
**Goal prefix (duplicate check):** `HUBSPOT BACKLOG BURNDOWN RUN`  
**Runner:** `the backlog burndown runner on the project box` (on the project workspace)

## Purpose
Keep every outstanding project-board task in view and bring the open count down: close tasks only with evidence, never create new ones in the same run.

## Inputs
- open project-board tasks (subject, status, last change)
- the mail record
- the live site crawl

## Outputs
- tasks closed with a dated evidence line
- one ledger row per run (open count before and after)
- items only the project lead can decide

## Metric
tasks completed with evidence per run (target 30) and the open count, which must fall run on run

## Report rules
Nothing routine; a message only if the open count rises two runs in a row.

Built to the [flywheel schema](SCHEMA.md).
