# 1. Purpose and the apex flywheel

## Purpose

BucklerFamily.Estate exists to establish, from originals, **one central chronological record** of:

- the Cedwyn estate (Leckwith and Llandough-juxta-Penarth), its parcels and how each changed hands;
- the former manorial house (the Great House, Tŷ Mawr) and its standing;
- the Williams families, their true history and heritage;
- the public history and heritage of the place.

It is the **LLM wiki / brain**: the place where evidence is collected and interpreted, and where ongoing research is reported in the public interest. The handbook you are reading is for its **maintenance and upkeep**: how to keep the brain accurate and the wheel turning.

## The apex flywheel (the uppermost loop)

One giant snowballing flywheel sits above everything. Every smaller flywheel, schedule, webapp and agent job exists to turn one of its arcs. Its programme name is the **Cedwyn Snowball** (master protocol: /academy/FLYWHEELS/snowball.md; human guide: /library/snowball/; Hive copy: hive/ARCHITECTURE.md on branch `hive`). This page is the architecture of that loop.

```
        A1 ASK ─────────► A2 RECEIVE ─────────► A3 CLARIFY
   research, FOI/EIR/SAR,   replies, disclosures,   new questions asked,
   archive, book and web    primary material,       clarification sought,
   searches                 silences recorded       contrary reading tested
          ▲                                               │
          │                                               ▼
   A8 LEARN AND RETURN                           A4 ORGANISE AND OFFICIATE
   every output, reply and                        answers organise the knowledge base:
   visitor response raises                        catalogue entry, transcript, parcel tag,
   the next questions                             chronology placement, label; records and
          ▲                                       findings made official (provenance, task
          │                                       register, central artifact database)
          │                                               │
   A7 RE-RELEASE                                          ▼
   every output re-released                      A5 RECONSTRUCT
   under a new semantic version                   the story, the estate, the family, the
   as information quality improves                public history and heritage, into ONE
          ▲                                       central chronological, accurate record of
          │                                       the Cedwyn estate, the former manorial
          │                                       house and the Williams families
          │                                               │
          └──────────── A6 PRESENT ◄──────────────────────┘
               the record feeds: the museum in Argentina · the guided tour in Wales ·
               the online dimension (maps, games, webapps) · the documentary (scenes made
               in real time) · e-books
```

| Arc | Name | What turns it | Done when |
|---|---|---|---|
| A1 | Ask | Research questions and records requests go out: FOI/EIR/SAR drafts (the owner sends), archive and catalogue searches, book and online searches. | The question is specific, names the likely holder and the record that would answer it. |
| A2 | Receive | Replies, disclosures and primary material arrive; refusals and silences are recorded as facts with dates. | The original is preserved once (headers, attachments, source reference, exact wording). |
| A3 | Clarify | Each answer raises more questions; clarification is sought; the best contrary reading is tested. | A follow-up question or a documented dead end exists. |
| A4 | Organise and officiate | Answers organise the knowledge base: one canonical catalogue entry (neutral description, verbatim transcript, label, parcel tag, date placement); the task register and the central artifact database are updated; findings become official records with provenance. | The record carries its catalogue number, label and parcel ("parcel not identified" if so). |
| A5 | Reconstruct | The story, the estate, the family and the public history and heritage are rebuilt from the organised records into one central chronological record. | Each line of the chronology names its source; gaps show as gaps. |
| A6 | Present | The record feeds every public form: the museum in Argentina, the guided tour in Wales, the online dimension (maps, games and other webapps that help people make sense of a huge, complex story), documentary scenes made in real time, and e-books. | Each output traces every statement to a catalogued page. |
| A7 | Re-release | Every output is re-released under a new semantic version when the quality of the information improves; earlier versions stay listed (page 7). | The new version has a changelog row naming what changed in the evidence. |
| A8 | Learn and return | Readers, replies, visitors and agents raise new questions; lessons go to the Agent Library; the next cycle starts at A1. | A real gap is fed back as the next question or job. |

**The axle (upkeep).** Under the wheel runs the upkeep that keeps it turning: the site build, Cloudflare, GitHub, HubSpot hygiene, the Hive, the version standard, the problems queue, the Agent Library. Upkeep is not an arc; it is what every arc rests on. This handbook is mainly about the axle.

## The measure

The Snowball counts progress per cycle as an operational learning measure, not a measure of historical truth:

`S(n+1) = S(n) + V + R + G + A + P + B − D − U − W`

V verified artifacts or propositions with provenance · R validated relationships · G gaps genuinely resolved · A follow-on leads with an owner and next action · P approved public outputs · B earned support reinvested through approved procurement · D duplicates removed · U unsupported statements quarantined or corrected · W avoidable rework. Report each term separately; copies, repeated statements, unanswered requests and raw pageviews do not count.

## How the Snowball's operating cycle fits

The Snowball's twelve-step cycle (observe, triage, preserve, canonicalise, relate, challenge, rank, assign, execute, review, release, learn) is **how one unit of work is run**. The eight arcs are **where that unit sits in the apex loop**. A reply to a records request, for example, enters at A2, is triaged and preserved (steps 1–3), canonicalised and related in A4 (steps 4–5), challenged in A3 (step 6), and its follow-up question is assigned back into A1 (steps 7–8).

## Rules that hold at the apex

1. **Originals first.** Catalogue before you interpret; keep description, transcript and interpretation apart (page 8).
2. **Every job leaves the wheel turning:** a follow-up question, a catalogued record, a published improvement or a documented dead end.
3. **Contrary evidence is recorded with the same care** as supporting evidence.
4. **One canonical record per fact.** Webapps, e-books, scenes, tour stops and museum panels read from the record; they never keep their own copies of facts.
5. **Release is never final.** Every output can be superseded by a better version (A7).
6. **The owner alone sends** external correspondence and decides spend, land, legal and publication questions.

## Changelog (append only)

| Version | Date | Who | What changed |
|---|---|---|---|
| 0.1.0 | 3 Nov 2026 | Claude (Hive seat 4) | First version of the purpose and a twelve-verb loop. |
| 0.2.0 | 3 Nov 2026 | Deployer seat | Rewritten as the top of the architecture: eight named arcs (ask, receive, clarify, organise and officiate, reconstruct, present, re-release, learn and return) with the five destinations of the record (Argentina museum, Wales tour, online dimension, documentary, e-books), the semantic re-release arc, and the upkeep axle; unified with the Cedwyn Snowball (same loop, one name; its twelve-step cycle and formula placed inside the arcs) instead of a parallel loop. |
