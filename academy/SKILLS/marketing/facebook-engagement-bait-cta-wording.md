# Engagement bait: CTA wording that Facebook/Instagram will not demote

Harvested 2026-11-04 (skills harvest). Topic gap: 'engagement bait' had 0 hits in INDEX.md; originality rules are covered elsewhere (facebook-reels-originality-archive-clips.md, facebook-page-reach-limited-originality-triage.md) and are not repeated here.

## What the platform actually does (primary sources, read 2026-11-04)
- Meta Newsroom, "Fighting Engagement Bait on Facebook" (18 Dec 2017, updated to 2019): a machine-learning classifier trained on "hundreds of thousands" of hand-labelled posts demotes individual posts that goad likes, shares, comments, tags or votes. Pages that do it "systematically and repeatedly" get a **Page-level demotion** (all their posts reach fewer people). Expanded language by language (Spanish, French, German, Italian 4 Apr 2018; Portuguese, Dutch, Polish etc. later in 2018), to **comments** containing bait (13 Nov 2018) and to bait spoken in **video audio** (30 Jan 2019).
- Explicitly NOT penalised: posts that ask for help, advice or recommendations (missing person, fundraising, travel tips).
- Meta Transparency Centre, Content Distribution Guidelines > Engagement bait: "posts that explicitly request engagement (votes, shares, comments, tags, likes or other reactions) for purposes other than" genuine conversation are shown lower in Feed.
- Meta Business Help "How to avoid posting engagement bait" names five types: react baiting ("Like if..., love if..."), comment baiting ("Comment YES"), share baiting ("Share with 10 friends"), tag baiting ("Tag a friend who..."), vote baiting (reactions/comments as ballot options).
- Meta for Creators (14 Jul 2025): captions with **no links, minimal capital letters and no more than five hashtags** perform best; post-level insights in Professional Dashboard show why a post was not distributed; Support home shows whether the Page is "at risk" of recommendation penalties.

## Context numbers (Socialinsider 2026 Facebook benchmarks, 25M posts / 139k brand Pages)
- Average engagement by followers 0.15% (2025, flat YoY). Status (text) posts lead at 0.20%, albums 0.18%, Reels 0.15%, **link posts 0.05%**. Q3 2026: images 0.08%, links still 0.05%.
- Read: a genuine open question in a text post is the highest-engagement format we have, and it is not bait as long as it does not tell people which button to press.

## The rule of thumb
Ask for a real answer, never for a mechanical action.

| Demoted (bait) | Safe rewrite |
|---|---|
| "Like if you remember Llandough before the A4232!" | "What do you remember of Llandough before the A4232 went through?" |
| "Comment YES if you want part 2" | "Part 2 covers the 1897 railway plans. Which document should we read first?" |
| "Tag someone from Penarth" | "Anyone from Penarth know what stood at the farm gate in the 1950s?" |
| "Share this so the truth gets out" | (drop it; end on the source line) |
| "React heart for Welsh, thumbs for English" | "Which version should come first, Welsh or English, and why?" |

Also bait if spoken in a Reel's voice-over ("smash that like") or written in our own first comment.

## Checklist before any scripted or manual post/comment
1. No imperative engagement verbs aimed at the reader: like, react, comment, type, share, tag, vote, follow-for (in en/cy/es: hoffi, rhannu, tagio; dale like, comparte, etiqueta, comenta).
2. A question is fine if it asks for knowledge, memory, a source or an opinion with reasons.
3. Max 5 hashtags, sentence case, no link in the caption body on Facebook (link in first comment is what our pipeline already does; keep that comment free of bait too).
4. Check Professional Dashboard > post insights / Support home for "at risk" weekly; if flagged, pause scripted posting on that Page for a week and log it.

## How we apply it to Cedwyn
- the project workspace (daily auto-social) and the project workspace (comments) should run a bait-phrase gate before posting: a small regex list of the verbs above in en/cy/es, failing closed (hold + log), alongside the existing banned-words gate. Proposed as a patch idea only; this run changed no code.
- Quote-pack carousels and auto-blog posts: end on the record's source line plus one genuine question ("Which parish register should we read next?"), never "share".
- Facebook Group (see facebook-group-community-and-link-limits.md): welcome posts ask "what brought you here?" (a real answer), not "comment hi".
- Spanish/Welsh posts are classified too (Spanish since Apr 2018), so the gate must cover all three languages.

## Sources
- about.fb.com (read in full)
- transparency.meta.com (title + search snippet; page is script-rendered)
- facebook.com (snippet: five bait types)
- creators.facebook.com (read; caption best practice, dashboard)
- socialinsider.io (read; format engagement rates)