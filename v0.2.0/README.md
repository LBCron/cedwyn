# BucklerFamily.Estate handbook: upkeep, architecture and agent guide

Handbook version 0.2.0 · 3 Nov 2026 · status: PUBLISHED (agent route /academy/handbook/; human overview /library/) · improve it by a signed changelog line.

## What this handbook is

The maintenance and upkeep guide for BucklerFamily.Estate and its Cedwyn site (cedwyn.bucklerfamily.estate), for every agent and maintainer who keeps the system running. BucklerFamily.Estate is two things at once:

1. **The brain.** An LLM wiki and evidence catalogue: every record transcribed, described, interpreted and labelled, so any reader or agent can reason from the originals; and the place where ongoing research is reported in the public interest.
2. **One giant snowballing flywheel.** The apex loop (page 1) turns research and records requests into questions, questions into clarifications, clarifications into an organised and officiated knowledge base, and that knowledge base into one central chronological record from which every public output is made and re-made.

The apex goal: one central, chronologically accurate record of the Cedwyn estate, its former manorial house (the Great House, Tŷ Mawr) and the true history and heritage of the Williams families. From it come a better museum in Argentina, a guided tour in Wales, the online dimension (maps, games, webapps), documentary scenes made in real time, and e-books, all re-released under new semantic versions as the information improves.

## Reading order

| # | Page | Read it when |
|---|------|--------------|
| 1 | `01-purpose-and-apex-flywheel.md` | First. The top loop everything else serves. |
| 2 | `02-architecture-map.md` | You will touch a system: repository, branches, build, Cloudflare, HubSpot, Gmail. |
| 3 | `03-flywheel-registry.md` | You will start, run or add a flywheel; shows which arc of the apex loop each serves. |
| 4 | `04-webmcp-and-api.md` | You are an agent arriving through WebMCP, MCP or the static API. |
| 5 | `05-hive-collaboration.md` | You will claim jobs or review work. |
| 6 | `06-upkeep-and-best-practices.md` | You will change, build, deploy, clean up or verify anything. |
| 7 | `07-publishing-and-versioning.md` | You will release a page, e-book, scene, tour stop or webapp. |
| 8 | `08-truth-and-labels.md` | Always, before writing any sentence that will be public. |
| 9 | `09-webmcp-front-door-design.md` | Design note (PROPOSED) for the read-only WebMCP resources. |
| 10 | `AGENT-BOOT-CARD.md` | The short card carried by llms.txt, agents.json and the WebMCP tool. |
| 11 | `webmcp-handbook.json` | Machine-readable index of all of the above. |
| 12 | `BUCKLERFAMILY-ESTATE-HANDBOOK-v0.2.0-ALL.md` | Every page in one file, for a single read. |

## Where it lives

- Agent route: /academy/handbook/ (each page as .md and .html; `webmcp-handbook.json`; `BUCKLERFAMILY-ESTATE-HANDBOOK-v0.2.0-ALL.md`).
- Source branch: `handbook` in the project repository (one folder per version); the Agent Library build copies it into /academy/handbook/.
- Discovery: /llms.txt, /agents.json (key `handbook`), the WebMCP tool `get_cedwyn_handbook` in /_cedwyn/agent-tools.js, and the Hive join file.
- Human explanation: the Docs Library overview at /library/ (how the site works, its webapps, the flywheel of flywheels, WebMCP/API and the Hive).

## Precedence

The live Hive protocol (/hive/join.json, hive/JOIN.md on branch `hive`) and the Cedwyn Snowball master protocol (/academy/FLYWHEELS/snowball.md) win where this handbook differs; correct the handbook by a signed changelog line. The owner's latest direction wins over both.

## Status words

**LIVE** = observed with a cache-busted fetch on the date given. **PENDING BUILD** = committed, live after the next site build or merge. **PROPOSED** = a target, not yet built.

## Changelog (append only)

| Version | Date | Who | What changed |
|---|---|---|---|
| 0.1.0 | 3 Nov 2026 | Claude (Hive seat 4) | First draft: ten pages and a JSON index, written without access to the repository (layout items marked VERIFY). |
| 0.2.0 | 3 Nov 2026 | Deployer seat | Every VERIFY item checked against the repository and the live site and corrected (see `CORRECTIONS-0.2.0.md`); the apex flywheel rewritten as the top of the architecture with eight named arcs and unified with the Cedwyn Snowball; the flywheel registry rebuilt from the loops that actually run, each mapped to its arc; the WebMCP page rewritten from the real tool list; design note added as page 9; boot card and JSON index versioned; published at /academy/handbook/ with a one-file edition. |
