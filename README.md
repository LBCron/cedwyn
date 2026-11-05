# Mr Wolf — webapp 40 of 59

"What's the time, Mr Wolf?" Served at /mr-wolf/ on cedwyn.bucklerfamily.estate from the snapshot branch `section/mr-wolf`
(pinned in `sections.lock` on main; themes.json id `mr-wolf`).

## Purpose

A cautious, lead-by-lead evidence-readiness index for possible challenge to *BP Properties Ltd v Buckler* (1987). It is not a finding of any court, legal advice, a probability estimate or a prediction of success.

## Four non-compensatory limbs

Each limb is scored 0–50:

1. Conscious, deliberate dishonesty attributable to the successful party (or a person for whom it is responsible).
2. Deception of the court and materiality: the fraud was an operative cause and would have changed how the original court approached the evidence.
3. Critical undermining of the earlier process and powerful probability of real injustice.
4. Admissible proof, provenance and particulars.

The internal minimum is 25/50 on **each** limb. The 100-point floor is met only when all four minima are met; a strong score on one limb cannot compensate for a missing one. `threshold_progress_percent` is the weakest limb divided by 25, capped at 100%. The raw sum remains out of 200.

## What 200 means

200/200 means 50/50 on all four limbs: twice the internal minimum on every limb. This is the owner's double-lock target, not a literal 200% probability or a guarantee. A final legal route review, independent counsel review, admissibility checks and adversarial testing remain mandatory.

## Separate case-wide procedural gateway

The 1987 decision is a final Court of Appeal determination. CPR 52.30 requires real injustice, exceptional circumstances and no alternative effective remedy. Authorities require the earlier process to have been critically undermined, a powerful probability of significant injustice and a powerful probability that the decision would have been different. Fresh evidence or a merely arguable error is not enough.

A freestanding *Takhar* fraud action is a separate cause of action, not the same as reopening the appeal. Its availability may affect the CPR 52.30 no-alternative-remedy question. The correct route, limitation, standing, parties, service and the application of current procedure to this historic appeal remain unresolved. The route gate therefore blocks filing regardless of any lead score.

Reasonable diligence is not a general prerequisite to a freestanding *Takhar* fraud action where fraud was not alleged at the original trial, although a deliberate decision not to investigate a known suspicion may be relevant to abuse of process. Diligence remains a separately tracked procedural/history issue, not one of the four score limbs.

## Data and maintenance

Data: `leaderboard.json` (schema `cedwyn_mr_wolf_leaderboard/v2`). `index.html` is rendered from it. When a score changes, update the JSON and rendered HTML, bump `VERSION`, update `CHANGELOG.md` and `lang.json`. Review the route gate separately; do not infer it from lead totals.

Our case, prospective, not a finding of any court. Background #f7f2e7 / #fbf8f1, mobile-first, scope tag `data-scope="online"`.
