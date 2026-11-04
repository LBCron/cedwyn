# AI visibility diagnostic: 3 layers and 4 gates (AWR / Fiorelli, Oct 2026)

Source type: practitioner framework from a consultant's client audits (Gianluca Fiorelli, Advanced Web Ranking blog, 15 Oct 2026). It is a method, not a study. The only figures in it are third-party (Vercel + MERJ crawler analysis) and are **not checked**. AWR sells AI-visibility tracking.

## The idea in one line
Stop asking "how do we rank in AI search". Ask which of four gates is shut, because each gate has a different fix and a different clock.

## Three layers (where visibility is decided)
1. **Parametric**: what the model already knows from training (Common Crawl, books, papers, transcripts, Wikipedia/Wikidata as disambiguation anchors). No write access; moves over model generations. Consistency and breadth of mentions likely matter more than recency (author's stated assumption).
2. **Retrieval**: what gets fetched while the user waits: crawler access, query fan-out (one prompt split into many sub-queries; Google patent US11663201B2 "query variant generation"), raw-HTML extraction.
3. **Synthesis**: what the answer states. Score each prompt in one of four states: own-page citation / third-party citation / unlinked mention / full absence.

## The four gates (run in order, but more than one can fail at once)
| Gate | Test | If it fails | Fix | Clock |
|---|---|---|---|---|
| 1 Access | Can GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot fetch the page and see the content in **raw HTML**? Check robots per agent, WAF/CDN 429s, consent walls, tabs/accordions | Plumbing | Server-rendered HTML for anything you want cited; separate rules for training vs search bots; audit CDN bot rules | days |
| 2 Parametric | Grounding OFF: ask cold "name the leading X" then "what do you know about [brand]?" across several models and phrasings | Parametric absence | One canonical entity home; full Organization/Person schema with sameAs, foundingDate, knowsAbout; identical naming everywhere; sourced Wikidata item; presence in directories, press, datasets | model generations |
| 3 Category binding | Model knows you but does not name you for "who does this?" | Weak binding | Co-occurrence of your name with the category's vocabulary **on pages that are not yours** (roundups, review sites, community threads); on-site comparison/use-case/definition pages. More articles does not fix this | months to generations |
| 4 Grounding | Test the **fan-out set**, not just the head prompt (head prompt is ~a tenth of the surface) | Grounding gap | Split it: fetched-but-losing = chunkability (self-contained passages, headings in fan-out phrasing, answer-first paragraphs, specs in HTML not images); absent = placement on the pages that are actually cited (PR/partnerships) | weeks to months |

Key crawler fact (Vercel + MERJ, >500M GPTBot fetches, **not checked**): GPTBot downloaded JS in ~11.5% of requests, ClaudeBot ~24%, neither executed it; same for PerplexityBot, CCBot, Bytespider, Meta. Google's AI surfaces and AppleBot do render JS. So a client-rendered page can rank #1 in Google and be an empty shell to every other answer engine.

Myth flagged: Organization schema does not "get you into the Knowledge Graph"; it only disambiguates. Entities are resolved from independent sources agreeing, not submitted.

Reporting rule: never put all four gates on one quarterly timeline; gates 2-3 will look like failures and get cut before they could work. Label gate-2 probing as a proxy.

## Do this (checklist)
1. Gate 1: `curl -A "GPTBot"` (and OAI-SearchBot, ClaudeBot, PerplexityBot) each money page; grep the raw HTML for the title, price and first answer paragraph. Any 403/429 or missing text = fix first.
2. Gate 2: 3 models x 2 phrasings, search/grounding off, 2 questions each. Log named / not named.
3. Gate 3: "best/recommended [category] for [use]" prompts; log whether named and who is named instead.
4. Gate 4: write 6-10 likely fan-out sub-queries per head prompt; log the four-state outcome and the cited URLs (these are your placement targets).
5. One sheet, one row per prompt, columns: gate, state, cited URL, next action, expected clock.

## How we apply it to Cedwyn
- **Gate 1 (do now, days):** fetch cedwyn.bucklerfamily.estate `/ebooks/`, each e-book page, `/learn/` and `/academy/` with the four bot user agents; confirm title, price/free edition and the answer-first paragraph are in raw HTML (not injected by JS) and that Cloudflare bot rules do not 403/429 them. Log in the weekly visibility check (the project workspace).
- **Gate 2:** add two grounding-off probes to the 5 fixed Grok questions: "What is Great House Farm (Ty Mawr), Llandough?" and "What do you know about Cedwyn Estate?". Report as a proxy, never as fact.
- **Gate 3:** category = Welsh local / farm history, Vale of Glamorgan heritage. Binding comes from Cedwyn being named on others' pages (local-history societies, heritage directories, Wikidata). Any outreach or new listing stays a PROPOSAL per existing rules (press only on the project lead's GO).
- **Gate 4:** for each e-book, list fan-out questions a reader asks (when was it built, who lived there, what records survive, tithe map) and check each has a self-contained, dated passage with the catalogue ID in HTML.
- Keep the clocks apart in the Sunday growth report: gate 1 weekly, gate 4 monthly, gates 2-3 quarterly.
- Entity hygiene: one canonical name form for Cedwyn and Great House Farm / Ty Mawr across footer, schema and social profiles; no change to public wording without the usual editorial rules (never name the project lead, banned words).

## Sources
- advancedwebranking.com (Fiorelli, 15 Oct 2026; read 4 Nov 2026)
- Vercel + MERJ crawler figures as cited there (not checked)