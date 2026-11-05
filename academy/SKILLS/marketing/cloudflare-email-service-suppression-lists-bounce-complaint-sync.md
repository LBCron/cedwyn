# Cloudflare Email Service suppression lists + bounce/complaint sync (read 5 Nov 2026)

Topic: email deliverability. What Cloudflare's own sender does with bounces and spam complaints, how a send fails when a recipient is suppressed, and the one switch to check before any Worker sends mail from bucklerfamily.estate. Pairs with cloudflare-email-service-free-verified-destination-alerts.md and gmail-send-as-custom-domain-dmarc-alignment.md (both 5 Nov).

## What the primary sources state (Cloudflare docs, read 5 Nov 2026)
- Suppression list = recipients Email Service will not contact. Cloudflare adds entries after eligible bounces and spam complaints; you can add manual ones. Applies to Email Sending only (not Email Routing).
- Scope: `account` (every sending domain and subdomain) or `sending_domain` (exact domain only: a suppression on example.com does NOT block mail.example.com and vice versa). Bounce/complaint suppressions take the sending domain of the message that bounced; a complaint whose domain can't be identified becomes `account`.
- Expiry rules (Suppression lists page, updated 25 Sep 2026):
  - manual: your choice or never; dashboard entries default to `account` scope
  - complaint (validated feedback report from the mailbox provider): never expires
  - hard bounce, mailbox/domain does not exist or persists across repeated attempts: never expires
  - other eligible hard bounce: 7 days
  - soft bounce (full mailbox, rate limit): 24 hours by default; sender-side auth/reputation failures do NOT create a suppression
  - `read_only: true` entries (incl. Cloudflare `policy` entries) can't be deleted; use the flag, not the reason, to decide.
- Enforcement ("Drop suppressed recipients" per sending domain, OFF by default):
  - OFF: REST API returns 400 and rejects the whole request if ANY recipient is suppressed; Workers binding throws `E_RECIPIENT_SUPPRESSED` and rejects the whole `send`; SMTP rejects the message.
  - ON: suppressed recipients are removed and the rest go out. SMTP edge case: if none remain it may answer `250 2.0.0 Ok` with no Message-ID and deliver nothing.
  - Suppressed recipients don't count toward quota/daily limits; they show as Rejected in sending logs.
- Import: paste or upload .csv/.txt (`email[,RFC3339 expiry[,scope]]`, no header) or .json.
- Deliverability page (updated 26 Oct 2026): hard bounces never retried; soft bounces retried with exponential backoff; Cloudflare handles ISP complaint feedback itself.
- Sync example (Email Sending event subscriptions -> Queue -> Worker -> KV): remove the app's own record on every `message.complained`; on `message.bounced` only when `payload.bounce.type == "hard"`; `message.deferred` = still retrying; exhausted soft retries can arrive as `message.bounced` with type `"soft"` (keep the record). KV deletions can take 60 s+ to propagate.
- Best practices (Cloudflare): add manual suppressions for unsubscribes; `account` scope when a person must get nothing from any of our domains; require a fresh opt-in before deleting a complaint suppression; let temporary ones expire.

## How to do it (checklist)
1. Before the first Worker send from a domain, decide the Drop switch. For one-recipient alerts leave it OFF (a suppressed address should fail loudly). For any multi-recipient send turn it ON, or one complaint blocks the whole batch.
2. Wrap every `send` in try/catch: on `E_RECIPIENT_SUPPRESSED` log the event id + "suppressed" and stop; never retry, never route the same mail through another sender (that dodges the provider's signal).
3. Mirror unsubscribes: when someone unsubscribes in Mailchimp or replies "stop", add a manual `account`-scope suppression with no expiry for any address our Workers might mail.
4. Monthly: export the Suppressions table (reason, scope, expiry) into the growth notes; a complaint entry on an alert address means our own alerts are being junked: fix content or frequency first.
5. Only if we ever mail more than verified destinations: subscribe a queue to `message.bounced` + `message.complained` and drop hard-bounced/complained addresses from our own lists (sync example).

## How we apply it to Cedwyn
- Today Cedwyn only has Email Routing; Email Sending to verified destination addresses (the Executive's own inbox for sale/signup alerts) is the free route PROPOSED in the 5 Nov alerts skill. When that Worker is built: Drop switch OFF (single recipient), try/catch on `E_RECIPIENT_SUPPRESSED`, write failures to the alert log, metric = alerts rejected per week (target 0).
- Never use Cloudflare sending for the newsletter or institution correspondence: the newsletter stays in Mailchimp (its own suppression handling), institution mail stays in Gmail. That keeps one complaint from blocking sale alerts.
- Nothing to change in the dashboard until the Executive's Worker exists. All DNS/Worker changes are PROPOSED on the Executive's GO; zero spend (verified-destination sends are free per the 5 Nov pricing read).
- Not checked: whether `read_only` policy entries can appear for verified destination addresses; whether the free plan shows the Suppressions page with Email Routing only.

## Sources
- developers.cloudflare.com (read, updated 2026-09-25)
- developers.cloudflare.com (read, updated 2026-09-25)
- developers.cloudflare.com (read, updated 2026-10-26)
- developers.cloudflare.com (read)