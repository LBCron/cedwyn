# BucklerFamily.Estate / Cedwyn — Highest Flywheel Architecture

**Audience:** every agent interfacing with BucklerFamily.Estate, Hive, WebMCP, HubSpot, the cedwyn repo, Cloudflare or GitHub.  
**Status:** Standing architecture (owner direction 3 Nov 2026).  
**Read this before taking upkeep, research, FOI, catalogue, ebook, scene or public-output work.**

## 1. What BucklerFamily.Estate is

**BucklerFamily.Estate (and its Cedwyn layer) is the LLM-wiki / brain.**  
It holds the evidence collected, the neutral catalogue descriptions, the transcripts, and the versioned interpretations (“our reading”). It is the single organised knowledge base for the Cedwyn Estate, the manorial house (Tŷ Mawr / Great House Farm), and the Williams family’s true history and heritage. It is also the public research-reporting surface for public interest.

It is **not** a static brochure site. It is the living centre of a recursive snowball.

## 2. The giant snowball (uppermost flywheel)

One giant flywheel contains many smaller specialist flywheels. The core loop is continuous:

1. **Research & FOI / disclosure requests go out** (questions asked of archives, councils, HMLR, museums, press, private holders).
2. **Replies and primary material come back.**
3. **Clarifications are sought**; more precise questions are generated.
4. **Answers further organise the knowledge base** — neutral catalogue entries, transcripts, relationships, parcel tags, chronological placement.
5. **The research is officiated** — findings, gaps and contrary evidence are recorded with provenance; HubSpot tasks and leads are updated; the central artefact DB is fed.
6. **The story, the estate, the family and public history/heritage are reconstructed** into a central chronological accurate record.
7. **Public and educational outputs are produced and improved** from that record:
   - E-books (semantic-versioned; re-released when the quality of the underlying information improves).
   - Documentary scenes (written and packaged in real time as the evidence firms).
   - Maps, games and other webapps that help others understand a huge and complex story.
   - Guided tour material for Wales.
   - Better museum / heritage presentation (Great House II concept in Argentina / Patagonia).
8. **Every output raises new questions** → the loop turns again.

This is the **highest-level flywheel**. All smaller flywheels (research/title, FOI/email, missing-evidence recovery, evidence grading/red-team, documentary/script, e-books, social/editorial, website/WebMCP, e-commerce, community, Patagonia feasibility, Williams Thesis, etc.) exist to feed or extract value from this one loop.

Formula (operational learning measure, not a claim of historical truth):

`S(n+1) = S(n) + V + R + G + A + P + B − D − U − W`

(See `academy/FLYWHEELS/snowball.md` for the variable definitions and the full master protocol.)

## 3. Systems of record (do not invent parallel ones)

| System | Role |
|--------|------|
| **HubSpot** | Work queue, owners, due dates, correspondence follow-ups, organisations, contributors, procurement, decisions. Authoritative task bodies. |
| **GitHub `unclehowell/cedwyn`** | Version-controlled source, schemas, protocols, public-safe data, build rules. |
| **Canonical core / evidence catalogue** | Single writer for facts and provenance. Neutral description + transcript + separate versioned “our reading”. |
| **D1 / graph / search / app views** | Derived read models. |
| **Gmail** | Communication channel and original correspondence. No agent sends without applicable approval. |
| **Hive** | Agent coordination, claims, chat, handover. Not a second task database. |
| **Projects** | Public portfolio, milestones, workstreams, risks. |
| **Docs / Library / Agent Library** | Master protocol, skills, runners, machine-readable instructions. |
| **WebMCP / llms.txt / agent index / footer** | Entry points to the same rules and approved public read surfaces. |

## 4. Upkeep handbook — what every agent must follow

When interfacing with BucklerFamily.Estate, agents treat the following as the standing guide for maintenance and best practice:

- **Snowball master protocol** — https://cedwyn.bucklerfamily.estate/academy/FLYWHEELS/snowball.md  
- **This architecture page** — `hive/ARCHITECTURE.md` (and its live mirror when deployed).  
- **Library / Maintainer handbook** — https://library.bucklerfamily.estate/handbook.html and the site manuals under `/manual/`.  
- **BucklerFamily.Estate handbook v0.2.0** — https://cedwyn.bucklerfamily.estate/academy/handbook/ (agents; JSON index `webmcp-handbook.json`; one-file edition; WebMCP tool `get_cedwyn_handbook`). Page 1 writes this uppermost flywheel as eight arcs (ask, receive, clarify, organise and officiate, reconstruct, present, re-release, learn and return) and page 3 maps every running flywheel to its arc. Human overview: https://cedwyn.bucklerfamily.estate/library/.  
- **Research paradigm** — https://cedwyn.bucklerfamily.estate/academy/MEMORY/research-paradigm.md (Williams as Welsh gentry in a manorial house; tenancy narrative rejected as framework; Bute title under scrutiny; evidence catalogue is foundation).  
- **Be Ambitious skill** — `hive/BE-AMBITIOUS.md` (four questions + rewrite deeper before claiming or executing).  
- **Williams Thesis flywheel** (current high-altitude hypothesis register) — `hive/WILLIAMS-THESIS.md` + HubSpot master 537268777192.  
- **Hive join contract** — `hive/JOIN.md` / live Hive pages (no-idle job flywheel, claim/release, social engagement caps, APPROVE-without-edit, etc.).  
- **Change control & deploy** — Library standards: determinism/truth, content/public text, change classes, deploy-and-verify at 390 px.  
- **Flow watch** — anti-stagnation contract; every live item has timestamp, owner, last progress, blocker, next action.

**Practical upkeep rules for agents:**

1. Prefer primary sources. Catalogue first (neutral + transcript), interpret second (versioned “our reading”).  
2. One material step per turn; signed changelog line; outside evidence of completion (live URL, commit SHA, mailbox ref, surviving task id).  
3. Never create parallel task lists; HubSpot is the register.  
4. Never send email; owner alone sends.  
5. Never invent transcripts or claim findings that are still hypotheses.  
6. Preserve and surface contrary evidence.  
7. Public pages and e-books improve by semantic version when the underlying catalogue quality improves — re-release, do not overwrite history silently.  
8. Documentary scenes are produced in real time from the chronological record; they are not fiction.  
9. Webapps (maps, games, directories, terrain, virtual tour) exist to help others make sense of the same complex story the research is reconstructing.  
10. Free-tier constraints (Cloudflare, GitHub, agent seats) are real; finish small verified units rather than open unbounded work.

## 5. Downstream outcomes the flywheel is building toward

- A **central chronological accurate record** of the Cedwyn Estate, the manorial house, and the Williams family’s history and heritage.  
- **E-books** that can be re-released under new semantic versions as evidence quality rises.  
- **Documentary scenes** written and packaged as the record firms, ready for a full scene-by-scene documentary.  
- **Online dimension**: maps, games and other webapps that communicate the story.  
- **Guided tour** materials for Wales.  
- **Museum / heritage presentation** (Great House II concept, Argentina / Patagonia) informed by the same reconstructed record.  
- Full public transparency of the research process itself (approved correspondence, FOI trails, catalogue growth) so the public interest dimension is visible.

## 6. Agent entry points (WebMCP / Hive)

Any agent arriving via WebMCP, Hive, llms.txt, the agent footer, or a chat runner must:

1. Read this architecture document (or its live mirror).  
2. Read the Snowball master protocol.  
3. Apply Be Ambitious before claiming work.  
4. Prefer open HubSpot jobs from the Hive job index; claim, do one material step, release with evidence.  
5. Route every finding (supports or contradicts) into HubSpot leads and the central artefact catalogue.  
6. Treat BucklerFamily.Estate as the brain being continuously improved by the snowball, not as a static site to decorate.

Signed: Grok (Hive), 3 Nov 2026, under owner direction.
