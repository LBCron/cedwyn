# 3. Flywheel registry: the smaller wheels and the arc each turns

Every smaller flywheel hangs off the apex loop (page 1). The table lists the loops that actually run on 3 Nov 2026, from the Agent Library's architecture file (/academy/architecture/architecture.json, `loops`) and the live schedule list, sorted by the arc of the apex loop each mainly turns. "Axle" means upkeep: it keeps every arc running rather than turning one.

Arcs: **A1** ask · **A2** receive · **A3** clarify · **A4** organise and officiate · **A5** reconstruct · **A6** present (museum, tour, online dimension, documentary, e-books) · **A7** re-release · **A8** learn and return.

| Arc | Flywheel | Cadence | What it does |
|---|---|---|---|
| A1 + A3 | Correspondence flywheel | every 2 hours at :30, 07:30–23:30 UK | Works out who needs a reply, a chaser, an escalation, a forward or a first contact, and writes one hive draft task per item on the project board; between items it does … |
| A1 + A3 | Hive drafts and review gates | every 5 minutes per seat | The multi-agent review room at /hive/ (the old hive host forwards there). Each seat takes its turns on draft letters: one material review per turn, a semantic version … |
| A1 + A4 | Online gap finder | every 6 hours | Searches public archives, catalogues, newspapers, registers and books for material about the farm that is not yet on Cedwyn, and turns each genuine gap into a task … |
| A1 | Book search | search every 59 minutes; findings table every 3 hours | Searches published books for passages overlapping what the site carries about the farm, its families and places, under every name variant, and records each passage with … |
| A1 | Contacts flywheel | daily 03:30 UK | Finds institutions and groups not yet contacted that are likely to hold information, records or artefacts, works out what each may hold, and writes a draft for the hive. |
| A1 | Nightly drafts engine | daily 05:30 UK | Keeps every due information-request draft and chaser written, in the thread it belongs to, ready for review; a chaser only the day after a deadline lapses and only when … |
| A2 + A4 | Email ingest | every 2 hours, 07:00–23:00 UK | Reads new project mail (read-only), classifies it, reads attachments, and feeds the record: the disclosure manifest, the roadmap and dartboard, candidate catalogue … |
| A2 | First-seen detector | every 6 hours | Compares a baseline of known farm records online against the latest crawl; a record that quietly appears is verified against its live page and dated captures and … |
| A2 | Farm page recapture (Watchtower) | every 5 days | Recaptures outside pages about the farm's history and heritage and records before and after copies, so any change made by an outside site is caught. |
| A2 + A4 | Disclosure results flywheel | proposed: every 6 hours after email ingest | Reads the dartboard outcomes as performance data, learns which request features draw answers, audits unsent drafts for a preservation-first opener and adds new ideas … |
| A3 | Reopen loop | every 4 hours | Small one-hypothesis experiments against a fixed metric (the three limbs of the legal test for reopening a judgment) to rank grounds for reopening the 1987 judgment. |
| A4 (axle) | Repository and project-board sync | every 6 hours | Studies new commits, pull requests and issues and the live work board, notes them on matching tasks, closes tasks only when verified live, and opens tasks for … |
| A4 + A3 | Intel flywheel | daily 04:15 UK | Reviews everything known, plots it many ways (periodicity, sequences, who answered and who stayed silent), and publishes blank evidence pages with catalogue ids for … |
| A4 (axle) | Task backlog burndown | every 2 hours | Counts the open project-board tasks and closes those whose work is done, each with a dated evidence line; creates nothing. |
| A5 + A1 | Parcel dispossession flywheel | twice daily, 06:20 and 18:20 UK | Traces every Leckwith and Llandough parcel from the 1824 plan and the c.1841 tithe forward: holder, date, mechanism, source and the record that would fill each gap; … |
| A5 + A3 | Great House Farm research cycle | every 6 hours | Starts with a change-check of the live sections, then follows the most promising untried route to evidence and artefacts not yet in Cedwyn. |
| A5 + A6 | Webapp migration flywheel | one webapp at a time, per the programme plan | Moves one webapp at a time to pages generated from its own view of the central catalogue, keeping the existing design. Six steps per webapp (below). |
| A6 + A8 | Sales fix | every 3 hours | Checks e-book sales; with none, diagnoses why along the funnel (traffic, reach, sign-ups, the buy path walked at phone width) and does the one highest-leverage fix it … |
| A6 | Business development | plan daily 09:00 UK; execute every 2 hours 10:00–22:00 | Writes the next 24 hours' weighted plan on the project board before any work, then executes the tasks in weight order with care, recording outcomes and lessons in the … |
| A6 | Daily auto-social | daily 08:15 UK | Wakes the blog's daily post and posts at most one new item per channel, only once the page and image are live, each linking back to Cedwyn. |
| A6 | Short videos to YouTube Shorts | with each new short story clip; uploads within the daily quota, queued past it | Every short story clip made for the series goes to YouTube Shorts as well as the photo channel: one important moment of the story per clip, a search-friendly title, a … |
| A6 + A7 | Documentary scenes | every 6 hours; one new scene goes live every day (from 2 Nov 2026) | Takes the next item in the re-render queue or the next unfilled frame of the chronology and produces one short scene: one dated moment, who was there, what was most … |
| A6 + A8 | Programme office review | weekly, Monday 06:00 UK | Refreshes the inputs for each major objective, advances the cheapest next action that needs no sign-off, scores and rates each objective, and republishes the programme … |
| A6 (axle) | On-page flywheel | weekly, Wednesday 13:30 UK | Audits every section for page titles and descriptions, share cards, sitemap, robots and llms files, structured data, the buy path and the sign-up strip; fixes markup … |
| A6 | Quote pack | weekly, Tuesday 19:00 UK | Makes three quote cards from verbatim period-record lines with their source lines, plus a cover, posts them as one carousel and adds them to the quotes page linking each … |
| A6 + A8 | Social engagement | three runs a day | Short quoted comments on public heritage posts and follows of related channels, within daily caps and a safety gate. |
| A6 | Social follows | three short runs a day | Follows relevant heritage, Welsh, local-area and genealogy accounts from a curated list on the project's Instagram account, and tops the list up from heritage seed … |
| A7 (axle) | Version standard | every 6 hours | Audits every webapp and the live site against the version ladder and version picker rule (standing order 47) and fixes small drift: wording, a missing (i) changelog … |
| A7 | Releases | after every change that goes live | Cuts a tagged release with a new semantic version for every branch or webapp change, at the commit that is actually live (standing order 44). |
| A8 | Skills harvest | every 15 minutes | Finds new practitioner playbooks for online sales and marketing (deliverability, testing, search and AI visibility, social growth, launches) and writes each as a short … |
| A8 (axle) | Agent library cycle | every 6 hours at 00:40, 06:40, 12:40, 18:40 UK | Reads what agents learned since the last cycle, distils only durable public-safe facts into the academy, regenerates the work board from real gaps, refreshes this … |
| A8 | Growth report | weekly, Sunday 18:00 UK | Measures the week: visitors, followers per channel, sign-ups and sales, search coverage; answers public questions; picks next week's one priority. |
| A8 | Visibility check | weekly, Monday 07:30 UK | Ranks the site for a fixed query set, asks a fixed set of questions of an AI assistant and counts mentions of the site, checks that AI crawlers reach it and notes three … |
| Axle | Daily site flywheel | daily 12:00 UK | Measures every farm site (status, phone-width render, score), then works each site's own program file in priority order: safe automatic fixes only, everything else … |
| Axle | Hive board sync | every 4 hours | Rebuilds the hive board (review counts, seats, percentage to ready, synced time) from the project board, read-only, and commits it only if something changed. |
| Axle | Problems flywheel | every 30 minutes | Every blocker or problem goes into one queue instead of to a person. Each open problem gets autoresearch cycles (hypothesis, smallest real test, result logged, keep or … |
| Axle | Academy member sync | every 10 minutes | Keeps the membership list of the human learning area at /learn/ in step with the checkout records. |

## Reading the registry

- **A1 to A3 are the research half** (asking, receiving, clarifying): drafts, correspondence, contacts, gap and book searches, ingest, first-seen and recapture, reopen and parcel work.
- **A4 and A5 build the brain**: one canonical record per fact, one central chronology. The intel flywheel, the research cycle, the parcel flywheel and webapp migration all write into the core catalogue and views, never into private copies.
- **A6 and A7 make and re-make the outputs**: documentary scenes, programme office (e-book pipeline, the Wales tour and the Argentina museum objectives), social and growth loops, the version standard and releases.
- **A8 closes the loop**: the Agent Library, skills harvest, growth and visibility reports turn what was learned into the next questions and better agents.

## Adding a flywheel

Copy the template at /academy/FLYWHEELS/SCHEMA.md. A new wheel must state: its arc (A1–A8 or axle); trigger and cadence; inputs; outputs and where they land (task register, core record, branch, page); the metric (which Snowball term it moves); the stop rule; what it never does (send, spend, contact, publish private material). Register it in /academy/FLYWHEELS/flywheels.json and here in the same batch. Never change an existing wheel's cadence without the owner's word.

## Changelog (append only)

| Version | Date | Who | What changed |
|---|---|---|---|
| 0.1.0 | 3 Nov 2026 | Claude (Hive seat 4) | First registry, written from tracker texts. |
| 0.2.0 | 3 Nov 2026 | Deployer seat | Rebuilt from the loops that actually run (37 rows, cadences as scheduled) and each mapped to the arc of the apex loop it serves; added the parcel flywheel and social engagement (3 Nov); template rule for new wheels. |
