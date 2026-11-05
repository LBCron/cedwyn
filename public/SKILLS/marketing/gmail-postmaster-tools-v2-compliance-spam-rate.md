# Gmail Postmaster Tools (v2): Compliance status + spam-rate watch

Date: 2026-11-05 · Status: how-to · Owner: bizdev / analytics

## What the primary pages say (read 2026-11-05)
- Google, *Postmaster Tools dashboards* (support.google.com): dashboards = Compliance status, Spam rate, IP reputation, Domain reputation, Feedback loop, Authentication (SPF/DKIM/DMARC pass %), Encryption, Delivery errors. Only **verified** domains appear. Time ranges 7/30/60/90/120 days; times in UTC. Data covers **personal Gmail accounts only**; low volume shows "No data found".
- Compliance status, all senders: SPF and DKIM, DNS records, message formatting, encryption, user-reported spam rate. Bulk only (about 5,000+/day to Gmail): DMARC, one-click unsubscribe, honor-unsubscribe. States: **Compliant / Needs work / No data found**; after a fix "it can take up to 7 days for changes to be reflected".
- Google, *Email sender guidelines* (answer/81126): "Keep spam rates reported in Postmaster Tools **below 0.10%** and avoid ever reaching a spam rate of **0.30%** or higher."
- Practitioner write-ups (Folderly 2026, SendLayer, TrulyInbox; snippets only, not read): above 0.1% already hurts placement; 0.3% is treated as an emergency. Same thresholds as Google's own page.
- Google's troubleshooting note: "One-click unsubscribe: Needs work" can appear even with 1-click headers when many messages **without** the header get spam reports; use the Feedback Loop dashboard to find them.

## Steps
1. postmaster.google.com, signed in as the account that owns the domain; add the sending domain; verify by DNS TXT (Google gives the string; Cloudflare DNS).
2. After 1-2 weeks of sends, open Compliance status: screenshot it, log every "Needs work".
3. Weekly: Spam rate (target <0.10%, hard stop at 0.30%), Authentication (DKIM and DMARC pass % should be ~100% once the domain is authenticated), Delivery errors.
4. On a spike: pause the campaign that caused it, compare against the Feedback Loop, check that the list was opt-in only.

## Failure modes
- Expecting data from a small list: under Google's volume floor, dashboards stay empty. Empty does not mean healthy.
- Reading it as total deliverability: it is Gmail personal accounts only; institutional Outlook/Microsoft 365 recipients are not in it.

## How we apply it to Cedwyn
- **Proposal (Executive's GO; it adds a DNS TXT):** verify `bucklerfamily.estate` in Postmaster Tools once the Mailchimp DKIM step (see mailchimp-domain-authentication-dmarc-rollout.md) is done, so the Authentication dashboard shows the change.
- The list is small, so expect "No data found" at first: the Sunday growth report records "Postmaster: no data (volume)" rather than a false all-clear.
- When data appears, add one line to the growth report: spam rate % vs the 0.10% / 0.30% lines, DKIM/DMARC pass %. Any value ≥0.10% pauses the next Tŷ Mawr (Great House) newsletter until the cause is found.
- Institutional outreach (councils, archives) is mostly Microsoft 365: judged on replies (see bot-clicks skill), not on Postmaster.

## Sources
- support.google.com (read)
- support.google.com (read)
- folderly.com (snippet only)
- trulyinbox.com (snippet only)