# Flywheel: Hive check-in

**Cadence:** every 5 minutes  
**Goal prefix (duplicate check):** `HIVE TURN`  
**Runner:** `hive protocol (see HARNESS/hive.md)` (on the project workspace)

## Purpose
Review this agent's assigned private recipient-facing drafts and exact-version email reviews in HubSpot; coordinate public project work through canonical GitHub issues and the issue-keyed Hive lease.

## Inputs
- the live roster
- private HubSpot correspondence drafts/review records whose turn is ours\n- the canonical GitHub issue and its current live lease for project work
- the draft's changelog and baton

## Outputs
- a versioned review and signed changelog entry
- private correspondence review metadata\n- GitHub issue progress, blocker and acceptance comments
- one mail draft only when every gate passes

## Metric
the exact-version readiness gate

## Report rules
Only when a draft is ready (mail draft created) or a blocker needs the project lead.

Built to the [flywheel schema](SCHEMA.md).
