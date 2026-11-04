# YouTube Studio draft feedback, dynamic thumbnails and hook (video-cut) A/B tests (Made on YouTube, 23 Sep 2026)

Date: 2026-11-04 · Topic: YouTube growth / pre-publish QA / A/B testing · Sources at foot.

## What changed (primary + one trade source)
- **Draft feedback in Studio**: upload a video as a draft and Ask Studio gives personalised advice on pacing, structure and storytelling *before* it is published (YouTube blog, Aparna Pappu, VP YouTube, 23 Sep 2026; TechCrunch same day).
- **Channel-matched thumbnails and titles**: Studio generates thumbnail/title options from the video content in the channel's own style.
- **Dynamic thumbnails**: generate three options and YouTube shows each to a different audience segment, then recommends the best (blog: "recommend the best of three options to different segments of your audience").
- **Scale of the existing A/B tool**: creators have run 40M+ title/thumbnail experiments since Test & Compare launched in 2024 (YouTube's own number).
- **Coming soon, video A/B**: test up to **three video cuts** to see which opening hook performs best. Not live at writing (not checked on our channel).
- **Background refresh**: Ask Studio can review older videos and suggest/test refreshed thumbnails; TechCrunch reports that later in 2026 Studio will monitor thumbnail performance and swap one proactively if it underperforms.
- **Analytics that explain why**: Insights now explain why a video performed and give advice (complements the Research tab skill already indexed).
- **AI comment moderation (test, opt-in)**: learns the channel's moderation style.
- Rollout, eligibility and UK availability for each item: not checked; open YouTube Studio > Ask Studio to see which appear.

## How to do it (checklist)
1. Upload every new Short/scene as **Private/draft first**; open Ask Studio > draft feedback; record the advice in the video's log line; fix at most the top 2 pacing/structure notes, re-render only if cheap.
2. Thumbnails: use Test & Compare (3 options) on every long-form upload; when dynamic thumbnails appear on the channel, prefer it for evergreen videos. Keep our own hand-made option as one of the three so the test is "ours vs generated".
3. Hooks: when video-cut A/B arrives, cut 3 openings (0-5 s): (a) the strongest period-record line on screen, (b) the place shot + date caption, (c) a question. Same body. Run one test at a time per video; read watch-time-weighted winner after the tool declares it.
4. Older videos: let Ask Studio *suggest* refreshed thumbnails, but keep automatic swaps OFF until a human-rule check (no text that breaks our editorial rules) is possible; approve each manually.
5. Log every test (video id, variants, winner, watch-time share) in the project workspace so the next run reads it.

## Numbers to judge it
- Test & Compare winner reports watch-time share, not CTR alone; treat <55/45 as "no clear winner".
- Draft-feedback success = average view duration of next 5 uploads vs previous 5 (same format).

## How we apply it to Cedwyn
- Documentary scenes and the daily Shorts (YOUTUBE SHORTS DAILY and CEDWYN MOVIE runners): add a draft-feedback pass before publish; the upload.py flow already uploads, so the proposal is: upload Private, read feedback in Studio, then publish. PROPOSAL for the runners (Studio feedback is a UI feature; API access not checked).
- Generated thumbnails/titles must still pass our rules: never name the owner, banned words list, no insignia, title < 60 chars; the shop line + documentary line in the description stay as they are.
- Hook test candidates for the scene clips: native cy/en/es makes each get their own test; never mix languages in one test.
- Auto thumbnail swap: OFF (editorial safety), suggestions only.

## Sources
- blog.youtube (read 2026-11-04)
- techcrunch.com (read 2026-11-04)
- Related indexed skill: youtube-studio-research-tab-outlier-multiplier-topic-choice.md