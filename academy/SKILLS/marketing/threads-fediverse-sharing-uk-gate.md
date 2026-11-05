# Threads "sharing to the fediverse": a gate check for a UK heritage profile

Harvested 2026-11-05 (skills harvest). Status for Cedwyn: GATE (no Threads profile exists; creating one is the account owner's step, see `threads-heritage-profile-communities.md`).

## What it is (primary sources)
- Meta Engineering, 21 Mar 2024: Threads users 18+ with public profiles can opt in to share their posts to ActivityPub servers; people there can follow the profile and like, reply to and repost its posts.
- Meta Newsroom (later rollout): "people 18+ with public Threads profiles in more than 100 countries can turn on sharing to the fediverse".
- Instagram Help Center 760878905943039 (search snippet; the page is script-only to a plain fetch): requirements = Threads profile created with an Instagram account, 18+, **public profile**, **located outside the European Region**.
- EFF Deeplinks, Apr 2026: the switch is Settings > Account > Fediverse sharing = On; then a wait (EFF: "likely ... a week") before the profile can also be bridged to Bluesky via Bridgy Fed; feature disabled in Europe.

## The UK question
Meta's term is "European Region". Whether Meta counts the UK in it for this feature is **not checked** (help text not readable here; EFF wrote "Europe"). Test, don't assume: on the Cedwyn Threads profile, look for Settings > Account > Fediverse sharing. Present = available; absent = treat UK as excluded and use Bridgy Fed for the website instead (`bridgy-fed-website-as-fediverse-bluesky-account.md`).

## What it buys (and does not)
- Reach into Mastodon/fediverse search and follows without running a Mastodon account; one more route to Bluesky through Bridgy Fed.
- Numbers: Meta publishes none for fediverse-sharing reach; Threads itself is 400M-500M MAU (Meta 2026, already in the threads files). No practitioner case study with numbers found (5 Nov search) = expect small, slow reach.
- Fediverse users see public posts only; replies from the fediverse appear on Threads.

## How we apply it to Cedwyn
1. Nothing to do until the Executive creates a Threads profile from @cedwynestate (owner step).
2. When it exists: check the setting (one look, ~1 min). If present and the profile is public, switch it on (it is a setting on an owned channel the Executive approved, reversible). Log date + whether available in the UK in `the project workspace`.
3. If absent: record "UK = European Region for fediverse sharing (observed <date>)" in this file and rely on the website bridge proposal instead.
4. Editorial rules apply unchanged: posts become public on many servers and are hard to fully delete (cached copies), so the pre-post editorial scan matters more, not less.
5. Measure: fediverse followers shown in Threads profile (Meta lists them separately) monthly; drop the topic if under 10 after 2 months.

## Sources
- engineering.fb.com (read 5 Nov 2026)
- facebook.com (snippet)
- help.instagram.com (snippet: requirements incl. outside the European Region)
- eff.org (read 5 Nov 2026)