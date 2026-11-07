# Flywheel: Pull request shipping

**Cadence:** every 12 hours  
**Goal prefix (duplicate check):** `PR SHIPPING RUN`  
**Runner:** `the pull request shipping goal on the project box` (on the project workspace)

## Purpose
List the open pull requests on the main repository, check each preview at 390 px, conflicts with main and whether a merged change supersedes it, and rank a merge list by the north star (sales, then traffic, then reconstruction) so previewed work reaches the owner's review.

## Inputs
- open pull requests
- their preview links

## Outputs
- a ranked merge list with preview link, change and risk per pull request
- at most one preview-link comment where none exists

## Metric
pull requests ready / blocked / superseded

## Report rules
The top three ride the morning brief; nothing is merged or closed by agents.

Built to the [flywheel schema](SCHEMA.md).
