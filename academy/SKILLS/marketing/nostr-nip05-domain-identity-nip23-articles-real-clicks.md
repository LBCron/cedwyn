# Nostr: domain identity (NIP-05), better long-form articles (NIP-23) and honest click counting

Harvested 2026-11-05 ~10:52Z. Topic: Nostr channel hygiene. ('nostr', 'nip-05', 'nip-23' 0 hits in this index before, although the traffic flywheel has posted to Nostr since 2 Nov via the project workspace)

## Facts (primary specs, read 5 Nov)
- NIP-05 (final): put `"nip05": "[address kept in the project workspace]"` in the kind-0 profile; clients GET `<domain/.well-known/nostr.json?name=_` and expect `{"names":{"_":"<hex pubkey, lowercase>"}}`, optionally `"relays":{"<hex>":["wss://..."]}`. `_@domain` is the root identifier and clients may display it as just the domain. Hex key, not npub.
- Hard rules in the spec: the endpoint MUST NOT redirect (fetchers ignore redirects) and should send `Access-Control-Allow-Origin: *` or browser clients cannot validate it.
- The spec calls it "identification, not verification", but notes organisations with a well-known domain can use it "as an attestation of their relationship with it" for trust. Block uses `[address kept in the project workspace]` for the Cash App account (Block Engineering, Terry Yiu, 5 May 2025).
- NIP-23 (draft): long-form = kind 30023, Markdown content, no HTML, no hard line-breaks; tags `d` (stable id, makes it editable), `title`, `summary`, `image`, `published_at` (first publish, unix seconds as string), `t` per topic hashtag. Link to it with an `naddr` (NIP-19); readers include Habla, YakiHonne, Highlighter.

## Practitioner evidence and our own numbers
- Our own measurement (traffic flywheel, 5 Nov 10:40Z): Nostr tracked links logged 4 clicks, but the site visitor counter showed 0 visits from them in 7 days. The clicks look like clients fetching link previews. 6 short posts + 1 article in 3 days; 2 of 5 relays accepted the article.
- Lesson that generalises (bot-click studies on email links, e.g. glueletter.com 2026, 105M clicks analysed, and Omnivery's 2026 bot report): a redirect hit is not a reader. Count a click only when the landing page beacon fires (JS executed) or a second page is viewed; ignore hits within ~2 s of posting and hits with no JS.
- No published Nostr referral numbers for heritage or book publishers found (not checked); keep the channel on the existing 14-day/10-post pause rule.

## How to do it
1. Serve `/.well-known/nostr.json` on the Cedwyn domain as a static JSON file (Cloudflare Pages `public/.well-known/nostr.json` plus `_headers`: `Content-Type: application/json` and `Access-Control-Allow-Origin: *`). Content: `{"names":{"_":"<hex>"},"relays":{"<hex>":["wss://relay.damus.io","wss://nos.lol","wss://relay.primal.net"]}}` using the relays that actually accepted our posts.
2. Republish the kind-0 profile with `nip05`, `website`, `about` (one neutral line), `picture`, `banner`.
3. Check: `curl -sI .../.well-known/nostr.json?name=_` shows 200, application/json, the CORS header and no 3xx; then open the profile in a web client and look for the domain badge.
4. Every kind-30023 article: `d` = site slug (re-publishing edits the same article), `title`, `summary` (<=200 chars), `image` = the page's OG image, `published_at`, 2-4 `t` tags (e.g. history, wales, archives, localhistory) and the canonical site URL with a tracked link as the last line.
5. Short notes that point to an article use its `nostr:naddr1...` link so Nostr readers open the article in-app; the site link stays for people who want the full page.
6. Counting: report Nostr as beacon-confirmed visits, not raw redirect hits.

## How we apply it to Cedwyn
- Live check 5 Nov 10:50Z: `cedwyn.bucklerfamily.estate/.well-known/nostr.json` = 404; the apex `bucklerfamily.estate/.well-known/nostr.json` returns 200 **HTML** (site fallback page). That apex answer would fail validation, so use the Cedwyn host only and leave the apex alone.
- Safe markup-level fix, no new account, no new public text: the onpage or traffic flywheel can ship the static file + headers on the Cedwyn branch it already deploys (gh.py, commit ends with the agent line, never dispatch/cancel build-cedwyn), then add `nip05` to the existing profile. The hex key comes from the traffic flywheel's own key file; never print the private key.
- Update tools/nostr.py's article builder to always set `d`, `summary`, `image`, `published_at` and `t` tags (check what it sets today first).
- Change the traffic flywheel's Nostr click metric to beacon-confirmed visits so the 14-day pause decision rests on real readers.

## Sources
- github.com
- github.com
- engineering.block.xyz (5 May 2025)
- glueletter.com ; omnivery.com (search snippets read, pages not opened)
- the project workspace run report 5 Nov 10:40Z (our own counts)