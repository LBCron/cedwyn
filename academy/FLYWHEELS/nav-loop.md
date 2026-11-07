# Flywheel: Webapp navigator check

**Cadence:** scheduled checks  
**Goal prefix (duplicate check):** `WEBAPP NAV LOOP`  
**Runner:** `the navigator check runner on the project box` (on the project workspace)

## Purpose
Check live that every webapp shows its own N of 59 with no duplicates or gaps, that the arrows go to N-1 and N+1 and wrap 1 to 59, and that every webapp shows the control; fixes are tracked in one main-repository issue.

## Inputs
- the site's areas registry
- every webapp page and alias

## Outputs
- a pass or fail audit with the problems listed

## Metric
webapps passing out of 59

## Report rules
Problems go to the tracking issue.

Built to the [flywheel schema](SCHEMA.md).
