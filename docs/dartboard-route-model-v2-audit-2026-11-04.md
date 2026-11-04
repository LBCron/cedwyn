# Dartboard routes: Phase 0 audit and v2 model

**Audit date:** 4 November 2026  
**Branch:** `audit/dartboard-routes-20261104` (based on `dartboard`)  
**Scope:** read-only inspection of the Cedwyn and datro source trees, the current route inventory and renderer, HubSpot programme records, and a focused Gmail search. This document is an engineering and research-control note, not legal advice or a finding about the conduct of any institution.

## Executive finding

The problem described in the route-map brief is real, but the current application is not a blank slate. The Dartboard branch already has an institution-by-institution route inventory, a separate legal-regime model, and a neutral response-assessment module. The main defect is that these layers are not yet joined by stable, evidence-backed records. The displayed state is therefore too easy to misread as a final legal position.

The recommended design is a **route graph with separately recorded route availability, case status, deadline state and evidence provenance**. An institution's response can change the status of one request or search, but must not automatically close sibling routes or independent remedies.

## 1. Phase 0: inspected source and current state

### 1.1 Existing Dartboard data

The source file `src/data/ramps.json` on branch `dartboard` declares an as-of date of **20 October 2026** and contains:

- 47 institution entries;
- 474 institution-specific route steps;
- 319 steps labelled `open`, 70 `pending`, 56 `done`, 25 `na`, 2 `queued` and 2 `overdue`;
- 474 steps with a legal/policy URL field;
- 99 steps with a policy URL;
- 14 steps with a direct `ev` evidence-reference array;
- 91 steps with an `em` correspondence-reference array;
- no structured due-date or deadline field.

These counts describe the current source file, not the true legal availability of each route or the completeness of the evidence.

### 1.2 Existing legal-regime and response-assessment modules

The branch also contains `src/data/legal-routes.ts`, which already separates legal regimes and labels steps as statutory, expected, optional or parallel. Its core design correctly warns against treating all routes as one compulsory ladder or waiting on one route where another has a limitation period.

The separate `src/data/response-assessments.ts` module contains neutral response-friction categories, confidence and source fields. Preserve and improve this module rather than creating a competing classification.

### 1.3 Current renderer limitations

The static mirror generator `tools/dartboard_options.py` on Cedwyn main reads `src/data/ramps.json` from the Dartboard branch. The renderer displays `url`, `polurl` and qualifying `ev` entries. It does not turn `em` references into direct correspondence links.

The present state labels are insufficient:

- `open` means an item is listed as available or not yet used; it does not establish case-specific legal availability.
- `done` can be read as a final outcome, although a completed enquiry may simply have produced a referral or a negative search.
- `na` combines unavailable, inapplicable and intentionally unpursued steps.
- `pending` does not distinguish a statutory clock from a service target or a voluntary reply date.
- `overdue` has no structured date, clock event or source from which to verify the calculation.

There is no explicit route-edge model joining prerequisites, alternative routes, reviews, appeals and independent parallel procedures. The current institution/rung sequence must not be treated as a legal sequence.

### 1.4 Build and source-of-truth gap

Cedwyn main assembles theme branches and builds a static SQLite catalogue. The main build workflow is triggered from changes on main in its configured paths; a change to the Dartboard branch alone does not automatically prove that the production site has rebuilt. The Dartboard static mirror is a derived view of the separate route source.

The `datro` `bpvsbuckler` branch has a separate correspondence/case graph, and its deploy workflow builds a Cloudflare Pages project. Its Gmail ingestion code consumes exported JSON/manual extracts, not a live Gmail API connection. The two graphs and Cedwyn's compiled SQLite catalogue therefore need an explicit reconciliation plan before any layer is described as the single source of truth.

**Privacy gate:** the public `datro` branch contains 28 `.eml` files under its evidence directory. Its deployment workflow copies static files while excluding the raw graph-input directory, not that evidence directory. This makes those files eligible for deployment. Live accessibility has not yet been tested. Do not add further raw correspondence or attachments to a public repository or site until the exposure has been checked and resolved.

## 2. Required conceptual model

Do not encode every fact in one `status` field. Each route record needs at least four independent dimensions.

### 2.1 Route availability

- `AVAILABLE`: the route appears to exist in law or the body's published procedure.
- `CONDITIONAL`: a prerequisite, jurisdictional fact, standing, deadline or other condition needs checking.
- `UNAVAILABLE`: a verified rule or decision establishes that this route does not apply.
- `UNVERIFIED`: the legal basis or applicability has not yet been checked.

Availability is not the same as whether the route has been used.

### 2.2 Case status (per request or route instance)

Use an explicit vocabulary, with no inference from silence:

- `UNTRIED`
- `IN_PROGRESS`
- `AWAITING_ACKNOWLEDGEMENT`
- `AWAITING_RESPONSE`
- `AWAITING_PREREQUISITE`
- `REFERRED_TO_ANOTHER_ROUTE_OR_HOLDER`
- `SEARCH_COMPLETED_NO_MATCH`
- `NOT_HELD_ASSERTED`
- `FORMAL_REFUSAL_RECEIVED`
- `INTERNAL_REVIEW_REQUESTED`
- `INTERNAL_REVIEW_PENDING`
- `INTERNAL_REVIEW_DECIDED`
- `REGULATOR_COMPLAINT_PENDING`
- `TRIBUNAL_OR_COURT_STEP_PENDING`
- `FEE_QUOTED`
- `TEMPORARILY_UNAVAILABLE`
- `COMPLETED_WITH_OUTPUT`
- `EXHAUSTED`
- `EXPIRED_OR_TIME_BARRED`
- `WITHDRAWN`
- `NOT_APPLICABLE`
- `UNCLEAR_REQUIRES_REVIEW`

A negative catalogue search is not the same as a formal statutory refusal. A referral is not a final decision. A fee-bearing search is not necessarily a refusal. An acknowledgement is not an answer.

### 2.3 Deadline state

Deadline state must be separate from route status:

- `NO_KNOWN_DEADLINE`
- `CLOCK_NOT_STARTED`
- `CLOCK_RUNNING`
- `CLOCK_PAUSED`
- `EXTENDED`
- `DUE_SOON`
- `OVERDUE_UNVERIFIED`
- `MISSED_ON_RECORDED_DATES`
- `EXPIRED_SUBJECT_TO_LEGAL_REVIEW`

Every deadline record must identify the clock type (statutory, tribunal/rules, published service standard, requested response date, or internal target), the start event, any pause/extension event, the calculation method, timezone, source and confidence. Never turn a requested reply date into a statutory deadline.

### 2.4 Neutral observations

Record observable facts only, such as:

- `ACKNOWLEDGEMENT_ONLY`
- `REFERRED_TO_NAMED_BODY`
- `SEARCH_SCOPE_STATED`
- `SEARCH_SCOPE_NOT_STATED`
- `NO_RECORDS_IDENTIFIED_IN_SEARCH`
- `NOT_HELD_ASSERTED`
- `LEGAL_BASIS_CITED`
- `LEGAL_BASIS_NOT_CITED_IN_REPLY`
- `FEE_OR_COPY_CHARGE_QUOTED`
- `FEE_ESTIMATE_NOT_SUPPLIED`
- `COPYRIGHT_OR_REUSE_LIMITATION_STATED`
- `ONLINE_ACCESS_LINK_UNAVAILABLE`
- `STATUTORY_CLOCK_OR_EXTENSION_STATED`
- `REVIEW_OR_APPEAL_ROUTE_STATED`
- `DELIVERY_FAILURE_RECORDED`

The UI should say what the record shows, not accuse the institution of motive or wrongdoing. A missing record, an unexplained search, or a delayed response is not by itself proof of fraud, concealment or government involvement.

## 3. Evidence and provenance requirements

A route definition and a case-status assertion require different sources:

1. **Legal authority source:** statute, regulation, procedural rule, official fee order or published institutional procedure supporting the existence, prerequisites, cost or deadline of the route.
2. **Case evidence source:** original email/letter, document, fee quotation, catalogue result, delivery receipt or verified call note supporting the case-specific status.
3. **Interpretation record:** the classification made from those sources, with author, timestamp, confidence, rationale and review state.

Every status event must cite one or more case evidence artifacts. Every route definition must cite its legal authority. A policy URL alone cannot substantiate an institution-specific outcome.

Use append-only status events. Corrections create a superseding event; they do not silently overwrite the earlier observation. Store the original wording separately from the neutral summary. Preserve contradictions, incomplete searches and unverified assertions.

## 4. Proposed central data objects

The following is the minimum logical model. It is not a direction to place raw email text in a public Git repository.

| Object | Key fields | Purpose |
|---|---|---|
| `institution` | `institution_id`, legal identity, body type, jurisdiction, statutory regimes | Canonical institution identity; aliases and shared mailboxes are separate identifiers |
| `contact_endpoint` | `endpoint_id`, institution ID, role, address/URL, validity dates | Departmental inboxes, archive catalogues and published procedures |
| `artifact` | `artifact_id`, SHA-256, MIME type, original/private URI, public derivative ID, rights, redaction state | Immutable source and safe derivative management |
| `correspondence_thread` | Gmail thread ID, participant refs, subject, message count, source artifact IDs | Thread grouping, held in protected storage |
| `correspondence_message` | Gmail message ID, thread ID, date, from/to refs, direction, body hash, attachment IDs, delivery state | Idempotent message-level ingestion |
| `request_instance` | request ID, institution ID, reference, scope, regime, sent date, clock events, current status | The particular FOI/EIR/SAR/enquiry/complaint, rather than the institution in general |
| `response_finding` | finding ID, request ID, quote span, neutral summary, classification, basis cited, scope and next route | What a reply actually says |
| `route_definition` | route ID, route family, availability, legal sources, prerequisites, cost basis, deadline basis, expected output | General legal/procedural route |
| `route_instance` | route-instance ID, route ID, request ID, case status, evidence references | Case-specific use of a general route |
| `route_edge` | from ID, to ID, relation type, condition, source | Alternatives, parallel routes, prerequisites, review/appeal links and route closures |
| `deadline_event` | event ID, route/request ID, clock type, date, pause/extension, calculation, source | Reproducible deadline arithmetic |
| `fee_quote` | fee ID, institution, route, amount, currency, basis, optional/mandatory, waiver or alternative | Fee ledger, distinguishing official copy costs from a charge for searches |
| `observation` | observation ID, type, date, artifact IDs, count grouping, confidence | Neutral pattern view |
| `status_event` | object ID, old/new state, actor, timestamp, source IDs, rationale | Append-only audit trail |

### 4.1 Private originals and public derivatives

- Keep original MIME content, headers, personal contact information and attachments in an access-controlled private store.
- Compute and preserve a cryptographic hash when ingested.
- Preserve original Gmail message and thread IDs for deduplication and audit.
- Keep copyright/reuse rights per artifact. Access to a catalogue record does not automatically permit republication.
- Publish only a reviewed excerpt, summary, redacted copy or metadata record when publication rights and privacy have been checked.
- Maintain a redaction record linking the public derivative to its private source, without exposing the protected source URL or personal identifiers.

The current public `datro` mail files must be treated as an exposure review, not as a safe ingestion template.

## 5. Route graph, not a single ladder

Use the following edge types:

- `ALTERNATIVE_TO`
- `PARALLEL_WITH`
- `REQUIRES_BEFORE`
- `REVIEW_OF`
- `APPEAL_OF`
- `REFERS_TO`
- `MAY_UNLOCK`
- `CLOSES_ONLY_THIS_INSTANCE`

A refusal or search result can close or exhaust only the route instance to which it applies. It must not close a sibling request to another body, a separate archive search, a different statutory regime, a review or appeal, or a distinct legal route unless an identified source establishes that consequence.

### 5.1 Initial route families to model

This is a starting inventory for legal verification, not a conclusion that every route applies:

1. **Land Registry records and title:** current official copies; copies of filed documents; historical register editions and removed information; inspection/search routes; complaint and review stages; rectification/alteration and indemnity routes.
2. **FOIA:** request, clarification, statutory response clock, refusal notice, advice/assistance, internal review where offered, ICO complaint and any applicable tribunal route.
3. **EIR:** request, exception/public-interest assessment, representations under regulation 11, regulator route and applicable tribunal appeal.
4. **Personal data:** UK GDPR subject access; identity/clarification pauses; separate DPA 2018 Part 3 routes where law-enforcement processing is actually involved; ICO complaint.
5. **Deceased health records:** Access to Health Records Act 1990 route, entitlement and documentary prerequisites, held/not-held outcome, review/complaint where applicable.
6. **Archives and catalogues:** free self-search, reader access, staff search, reprographic copy, copyright/re-use conditions, transfer/referral to other repositories, fee quote and lower-cost alternatives.
7. **Institution complaints and ombudsmen:** the institution's applicable complaint stages first, the relevant external reviewer only where jurisdiction and standing permit.
8. **Court records and litigation disclosure:** court-record retrieval; solicitor-led pre-action correspondence; CPR 31.16 and 31.17 only where their specific tests and procedural setting are met.
9. **Substantive property and succession issues:** Land Registration Act alteration/rectification and indemnity; adverse possession, prescription, trust and estate routes only where facts and legal tests support them.
10. **ECHR/procedural review:** preserve the historic procedural record and obtain specialist advice on jurisdiction, admissibility and any route to revision. Do not represent Rule 80 as a generic route to reopen a historical Commission inadmissibility decision.

All legal propositions, time limits, court tests and fee bases must be checked against current primary sources before the route is shown as verified. Any route with uncertain applicability must display **“verify with a solicitor”**.

## 6. UI requirements for the ramp

The new ramp should have these views, all generated from the same central route data:

1. **All routes:** graph and table views showing every route, including untried and parallel routes. Do not hide unexplored branches.
2. **Institution record:** request reference, actual request scope, exact response excerpt, date, evidence link, neutral response class and next route.
3. **Deadlines:** separate statutory limits, tribunal/court limits, service standards and requested dates; show calculation inputs and the source.
4. **Patterns:** counts and date ranges of neutral observations, each linked to the underlying artifacts; no motive or misconduct labels.
5. **Fees:** fee-demand/quotation ledger distinguishing lawful statutory fees, optional copying/search charges, unknown quotes and waiver/cheaper routes.
6. **What remains:** routes still untried, in progress, awaiting prerequisite, awaiting reply, referred elsewhere or subject to solicitor verification.
7. **Solicitor bundle:** printable/exportable chronology, route graph, source register, fee ledger, deadline table and list of unresolved legal questions. Private originals should only be included through an explicitly authorised secure bundle.

Mobile layout must retain route relationships and source links; colour must never be the only way to communicate status.

## 7. Implementation order and gates

### P0 — protect and verify source material

- Check live accessibility of the public `.eml` files and remove exposure through a reviewed, reversible change only after preserving hashes and provenance.
- Review the `datro` importer for message direction, sender normalisation, identity mapping, duplicate handling and attachment coverage.
- Do not import more raw correspondence into a public repository.
- Capture a baseline of current route file, renderer, build and live deployment commit.

**Exit test:** an approved private-original/public-derivative boundary exists; the exposure report states exactly what was tested and what remains unknown.

### P1 — formalise data schema and taxonomy

- Add versioned schema for institutions, requests, artifacts, response findings, route definitions, route instances, edges, deadline events, fee quotes and observations.
- Add migration mapping from each existing ramp row to a stable route ID and legacy reference.
- Keep original `ramps.json` intact until each record has been mapped and independently checked.
- Validate that every status event has case evidence, and every route definition has legal authority.

**Exit test:** all legacy records either map to the new model or are listed as unresolved; no existing record is deleted or silently overwritten.

### P2 — private, idempotent ingestion

- Read-only Gmail connector; preserve message and thread identity and attachment IDs.
- Use stable message IDs and hashes as idempotency keys.
- Record direction from authenticated mailbox identity, not a placeholder string.
- Keep retrieval/ingestion metadata, errors and last successful cursor.
- Require a privacy and rights check before generating a public derivative.

**Exit test:** replaying the same input produces no duplicate messages or changed hashes; no raw message or attachment is exposed publicly.

### P3 — graph and user interface

- Build graph rendering from central records.
- Expose exact excerpts and direct evidence links for each case status.
- Add the route, pattern, fee, deadline and solicitor-bundle views.
- Ensure independent routes remain visible after one request is refused, delayed or completed.

**Exit test:** every displayed case status resolves to an artifact and every legal route resolves to a current primary authority or is clearly marked unverified.

### P4 — deployment and regression verification

- Wire Dartboard source changes into the documented Cedwyn build trigger.
- Verify source commit, successful CI, deployment commit and public HTTP response as separate checkpoints.
- Test mobile width, printable output, link integrity, privacy scrub and central-catalogue parity.
- Do not merge this branch or publish sensitive case correspondence as part of this audit.

**Exit test:** exact source/commit/build/deployment identifiers and test results are recorded.

## 8. Current unresolved matters

- The live Dartboard UI and the live accessibility of the public correspondence files have not yet been independently fetched in this audit.
- The source-of-truth relationship between Cedwyn's compiled SQLite catalogue, the datro graph/D1 stores and the branch-local Dartboard data still needs a controlled migration.
- All 608 Gmail search results need entity normalisation and request-level classification before claiming an exhaustive institutional response inventory.
- A solicitor must verify the application of the legal routes to the facts, standing, limitation, jurisdiction and any ECHR procedural avenue.
- The current ramp's dated status must be reconciled with post-20-October correspondence before being represented as current.

## 9. Acceptance criteria

This work is not complete merely because a schema or page exists. Acceptance requires:

- stable identifiers for all migrated institutions, requests, artifacts and route nodes;
- source evidence for each case-specific status;
- current legal authority for each route and deadline, or an explicit unverified/solicitor flag;
- separate fields for route availability, case status and deadline state;
- full visibility of parallel and untried routes;
- no private originals or unlicensed material in public output;
- idempotent read-only Gmail ingestion;
- automated schema, provenance, privacy, link and route-edge tests;
- a successful build and an independently verified live deployment;
- a solicitor-ready export with a complete source manifest and unresolved questions.

---

**Change policy:** this is a design/audit commit only. No existing route data has been modified, no messages have been sent, no public page has been updated, and no branch has been merged.
