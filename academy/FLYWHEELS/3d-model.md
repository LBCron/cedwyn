# Flywheel: 3D model loop

**Cadence:** every 2 hours  
**Goal prefix (duplicate check):** `3D MODEL LOOP RUN`  
**Runner:** `the 3D model loop runner on the project box` (on the project workspace)

## Purpose
Autoresearch loop that perfects the Tŷ Mawr 3D model: render fixed camera views, compare each with the reference photographs, log a per-view mismatch score, record each mismatch as a GitHub issue so other agents can help, redraw the model from the layout source, and repeat. Real irregularities are reproduced, never mirrored; the owner's written corrections outrank images, and paintings rank below real photographs as geometry evidence.

## Inputs
- the layout source on the revival branch
- written layout corrections
- reference photographs and their catalogue records

## Outputs
- a rebuilt model on the revival branch preview
- per-view mismatch scores before and after each cycle
- GitHub issues per mismatch
- camera tripods with field-of-view cones, each labelled with its catalogue id

## Metric
per-view mismatch score falling cycle on cycle

## Report rules
Only when a view's score rises notably or something only the owner can supply is named.

Built to the [flywheel schema](SCHEMA.md).
