# Flywheel: Repository and project-board sync

**Cadence:** every 6 hours  
**Goal prefix (duplicate check):** `REPO-GITHUB SYNC RUN`  
**Runner:** `work/repo-hubspot-sync/RUNNER.md` (on the project workspace)

## Purpose
Keep the project board in step with the repository and the live site: what was done, and what still needs doing.

## Inputs
- new commits, pull requests and issues
- the academy work board
- the problems queue

## Outputs
- dated progress, decisions and verification comments on matching GitHub issues
- issues closed only when acceptance is independently verified
- new GitHub issues for verified, actionable outstanding work not already tracked

## Metric
open repository work with no matching canonical GitHub issue (target zero)

## Report rules
Nothing routine.

Built to the [flywheel schema](SCHEMA.md).
