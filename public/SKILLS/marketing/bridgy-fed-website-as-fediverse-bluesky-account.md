# Bridgy Fed: make the Cedwyn site itself a followable account on Mastodon and Bluesky

Harvested 2026-11-05 (skills harvest). Status for Cedwyn: PROPOSAL (new public channel = the Executive's GO); one safe markup prerequisite can ship now.

## What it is (primary source: fed.brid.gy/docs, read 5 Nov 2026)
- Bridgy Fed is a free, non-commercial, open-source (CC0) bridge between the web, the fediverse (Mastodon etc.) and the Atmosphere (Bluesky). Launched 22 Oct 2017 by Ryan Barrett; "entirely free to use" (donations on Patreon).
- Different from Bridgy *classic*: classic cross-posts your site into accounts you already own. Bridgy Fed makes **the web site its own account**: `@[address kept in the project workspace]` on the fediverse and `yourdomain.web.brid.gy` on Bluesky. People follow the site directly; no Mastodon/Bluesky account to run.
- Opt-in only: nothing is bridged until the site owner enters the domain on fed.brid.gy. Only fully public content is bridged.
- Discovery: people can type the domain in most fediverse/Bluesky search boxes; failing that, the full handles above. The user page has a remote-follow form and a followers list.
- Indexing: sites come from the indexable web, so Bridgy Fed sets the fediverse `discoverable` and `indexable` flags true (shows in fediverse search).

## Requirements (docs, verbatim facts)
1. Either microformats2 + webmention support, **or an Atom/RSS feed discoverable from the home page**. On first follow it reads the feed, bridges those posts and polls for new ones.
2. Sending Bridgy Fed any webmention switches it from feed polling to webmention-only (lets you pick posts one by one). Do not send one unless that is wanted.
3. Profile comes from, in order: a representative h-card on the home page, then Twitter card / Open Graph meta tags.
4. If the site already answers WebFinger itself, Bridgy Fed will not work (conflict with an existing ActivityPub server).
5. Own-domain handle (`@[address kept in the project workspace]`) is optional: redirect `/.well-known/host-meta*` and `/.well-known/webfinger*` (with query string) to the same paths on fed.brid.gy (302). On Cloudflare Pages that is two `_redirects` lines.
6. Replies/likes come back as a notifications feed on the Bridgy Fed user page; getting them onto the site needs webmention support (not needed for reach).
7. Caveats: deletes propagate slowly (cached copies linger); Mastodon orders bridged posts by arrival, not timestamp.

## Evidence / numbers
- No usage or referral figures are published by the service (searched 5 Nov; none found = not checked). Treat as a cheap reach experiment, not a proven channel. Fediverse reach numbers for heritage accounts are already in `bluesky-mastodon-fediverse-heritage.md` (starter packs up to 43% of daily follows).
- EFF Deeplinks, Apr 2026 ("A Bridge to Somewhere"): practitioner how-to for bridging Mastodon/Bluesky/Threads accounts; confirms the bot-follow opt-in flow and that some Mastodon instances block the bridge.

## Live checks on our side (5 Nov 2026, cache-busted)
- `cedwyn.bucklerfamily.estate = 200, Atom, 14 entries, last updated 2026-10-30 (e-book pages).
- Home page: **no `<link rel="alternate" type="application/atom+xml">`** → Bridgy Fed would not find the feed. No h-card / h-entry.
- `cedwyn…/.well-known/webfinger` = 404 (good, no conflict). Apex `bucklerfamily.estate/.well-known/webfinger` returns the HTML catch-all with 200 (not real WebFinger; harmless, but do not bridge the apex without checking).

## How we apply it to Cedwyn
1. **Safe now (markup only, onpage flywheel):** add to every Cedwyn page head
   `<link rel="alternate" type="application/atom+xml" title="Cedwyn Estate" href="/feed.xml">`. Helps feed readers too (see `rss-atom-feed-websub-static-site.md`).
2. **Feed hygiene before bridging:** each entry needs a real title, summary and image; entries become public posts verbatim, so run the editorial scan on feed text (never names the Executive, banned words, no family holdings). Keep the feed curated (e-books, new evidence pages, film doors), not the whole sitemap.
3. **PROPOSAL for the Executive (one line):** "Turn the Cedwyn site into its own Mastodon/Bluesky account (free, opt-in, can be switched off): yes/no?" On yes: enter `cedwyn.bucklerfamily.estate` at fed.brid.gy, follow it from a test account, check the profile picture/name came from OG tags, then optionally add the two `_redirects` lines for an own-domain handle.
4. Do **not** send webmentions to fed.brid.gy (keeps feed polling; also our zero-outbound-links rule means posts carry no fed.brid.gy link).
5. Measure: followers on the Bridgy Fed user page weekly + Cloudflare referrers from mastodon/bsky hosts; drop it after 8 weeks if under 10 followers and 0 referrals.

## Sources
- fed.brid.gy (read 5 Nov 2026: setup, feed discovery, profile, own-domain handle, cost, history, indexing)
- brid.gy (Bridgy classic vs Fed)
- fed.brid.gy (service home)
- eff.org
- snarfed.org (opt-in design)