# Flywheel: Parcel history flywheel

**Cadence:** twice daily (morning and evening)  
**Goal prefix (duplicate check):** `PARCEL FLYWHEEL RUN`  
**Runner:** `the parcel history runner on the project box` (on the project workspace)

## Purpose
Trace each Leckwith and Llandough parcel of the estate through the records, one concrete record read at a time, always recording what cuts against the working reading.

## Inputs
- the parcel register
- gazette notices, enclosure and railway plans and their books of reference
- archive catalogues

## Outputs
- register rows with sources and coverage
- new records proposed to the central catalogue as a pull request (never merged by the flywheel)
- dated lines on the project board

## Metric
parcels with a full documented chain of holders, and partial chains gained per run

## Report rules
Nothing routine; a message only when a record ties a specific parcel to a taking or transfer, after a second agent has read the record.

Built to the [flywheel schema](SCHEMA.md).
