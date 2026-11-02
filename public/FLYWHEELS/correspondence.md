# Flywheel: Correspondence flywheel

**Cadence:** every 2 hours at :30, 07:30–23:30 Europe/London  
**Goal prefix (duplicate check):** `CORRESPONDENCE FLYWHEEL RUN`  
**Runner:** `work/correspondence-flywheel/RUNNER.md` (on the project workspace)

## Purpose
Keep one canonical HubSpot draft task for each research or disclosure email that needs a reply, chase, escalation, forwarding or first contact. Reconcile existing tasks and Gmail drafts before creating anything; do not duplicate correspondence. Decide whether to email at all and complete the review gate before handoff to Gmail.

## Inputs
- Complete source-mail dialogue: inbound and sent messages, drafts, replies, delivery failures or bounces, and attachments
- Open HubSpot draft tasks and relevant Gmail drafts, with the current version and task history
- The active Hive roster and current task-specific review gate
- Current official primary legal and policy sources for the specific recipient
- Relevant Cedwyn chronology, evidence, institution lane, `/that-old-chestnut/` and `/dartboard/` overview pages

## Review procedure
For every exact frozen version, record whether to send, hold or drop it, and whether it is a new enquiry, reply in the existing thread or a follow-up. Confirm the actual thread before replying. Check the exact To and CC fields, explain whether a CC is needed, and check each proposed attachment for relevance, accuracy and sensitivity. Do not add recipients or attachments by default.

Read the complete available dialogue and project context. Check whether the questions are focused, useful and complete; what else should be asked; what wording is wise; what should be omitted and why; and whether a different route would work better. Mark material claims VERIFIED, REPORTED BY ANOTHER AGENT, INFERENCE or UNRESOLVED. Preserve contrary evidence and keep theories separate from established facts.

Check the recipient's current information-access law, statutory coverage and published policy in official primary sources. Do not assume FOIA or EIR applies because an organisation handles records or works with a public body. Distinguish FOI/EIR requests from ordinary archive or records enquiries, data-subject requests and complaints. Record uncertain coverage as unresolved rather than asserting a legal duty.

Read both project overview pages and the relevant institution lane in each substantive review. Record dated source links, the reviewer and active Hive seat, the exact version, review round, recipient/CC and attachment decisions, correspondence type, send/hold/drop rationale, useful questions, wording risks, unresolved defects and verdict in the private HubSpot task.

## Review and handoff gate
- Reviews count only when an actual active agent has read the exact current version and recorded a substantive review. A simulated lens, assignment, handoff, status check, routing action or review of an older version does not count.
- Apply the existing Gate B threshold: routine requests, chasers, acknowledgements and archive enquiries require at least 3 material reviews from 2 distinct actual reviewers; escalations and matters not clearly routine require at least 10 material reviews from 4 distinct actual reviewers. Follow any more stringent task-specific rule.
- Any material edit creates a new version and requires fresh reviews on that version. Missing thread, legal/policy, attachment or reviewer proof, or any open material defect, keeps the draft blocked.
- Only the permitted Hive seat may create one in-thread Gmail draft after all exact-version gates pass. The Gmail copy must match the approved HubSpot version and retain the correct thread, recipients, CC and verified attachments. The owner reviews the Gmail draft.
- Do not send or schedule an email until the owner has reviewed the exact Gmail draft and explicitly approved that send. Never infer approval from silence. If a schedule cannot be held safely until approval, leave the email unsent and report the blocker.

Public GitHub and Hive chat may carry workflow metadata only. Keep email bodies, private names, addresses and contact details in the authorised private HubSpot/mail records.

## Outputs
- One HubSpot draft task per actionable item, with dated changelog and exact-version review evidence
- A single Gmail in-thread draft only after the review gate passes, for the owner's review
- No automatic send or schedule without recorded owner review and explicit approval

## Metric
Actionable correspondence with no canonical HubSpot task (target zero); report duplicate candidates, pending reviews, open defects and owner-only decisions separately. A low task count is not evidence that an email should be sent.

## Report rules
Nothing routine; report only material findings, blockers, verified handoffs or decisions the project lead alone can supply.

Built to the [flywheel schema](SCHEMA.md).
