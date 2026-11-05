# Mailchimp domain authentication + DMARC rollout for our sending domain

Date: 2026-11-05 · Status: how-to · Owner: bizdev / email

## Why it matters (sources read 2026-11-05)
- Mailchimp help (read): manual authentication = **2 CNAME records + 1 TXT record**; the CNAME name looks like `k2._domainkey`; validation "most records update within a few minutes, but this could take up to 48 hours"; "Public email services like Gmail and Yahoo can't be authenticated" (a gmail.com From address can never be aligned).
- Signet, *Mailchimp Domain Authentication: 2026 Setup* (practitioner, read): Mailchimp **does not support SPF alignment** (the Return-Path stays on a Mailchimp domain), so DMARC passes **only through DKIM alignment**; start DMARC at `p=none; rua=...` for 2-4 weeks of reports before enforcing; cites EasyDMARC 2026 adoption report: 1.8M domains, only **10.7%** enforce `p=reject` (vendor figure, not checked against the report).
- Signet's example records use `k1/k2 -> dkim.mcsv.net / dkim2.mcsv.net`, and it states to copy the account's own values: names vary by account. Use what Mailchimp shows, never a generic copy.

## Steps
1. Mailchimp > Website > Domains > Authenticate next to the sending domain. Choose manual (Entri, the auto route, needs registrar login; ours is Cloudflare).
2. Copy the 2 CNAMEs + 1 TXT exactly. In Cloudflare DNS set CNAMEs to **DNS only (grey cloud)**: a proxied CNAME breaks DKIM lookups. If the name doubles (`k2._domainkey.example.com.example.com`), enter only `k2._domainkey` (Mailchimp troubleshooting).
3. Wait for the "Authenticated" label (up to 48 h).
4. DMARC: change `p=none;` to `v=DMARC1; p=none; rua=mailto:<reports address>; adkim=r; aspf=r` so reports actually arrive. Run 2-4 weeks.
5. Read reports: every legitimate stream (Mailchimp, Google Workspace/Gmail, Cloudflare routing, Gumroad/Stripe receipts if they use our domain) must show DKIM-aligned pass. Only then `p=quarantine` (and `sp=quarantine`), later `p=reject`.
6. Verify on a real send: Gmail > Show original shows `DKIM: PASS with domain <ours>` and `DMARC: PASS`. Run `tools/unsub_header_check.py` on the same .eml (checks d= alignment too).

## Checks / numbers to log
- `python3 tools/dns_auth_check.py <domain>` (stdlib, DNS over HTTPS; writes nothing) before and after each change.
- Log: date, record changed, Show-original result, DMARC report pass % per source.

## Failure modes
- Enforcing DMARC before every sender is DKIM-aligned = our own mail to Junk. Never skip the p=none phase.
- Proxied (orange) CNAME in Cloudflare.
- From address on gmail.com: authentication impossible; needs a From on our domain.

## How we apply it to Cedwyn
- **Measured today (DoH, 09:34Z):** `bucklerfamily.estate` has SPF `v=spf1 include:_spf.mx.cloudflare.net ~all`, DMARC `v=DMARC1; p=none;` with **no rua** (so no reports reach anyone), and **no `k2`/`k3` Mailchimp DKIM CNAMEs**. `cedwyn.bucklerfamily.estate` has no records of its own. The Mailchimp From address for the Tŷ Mawr (Great House) newsletter is **not checked** (not found in work/ files); read it in Mailchimp before acting.
- Steps 1-2 and 4 are **DNS changes = PROPOSED, need the Executive's GO** (same rule as the 09:20 unsubscribe skill). Draft the exact record values once Mailchimp shows them; do not touch DNS without GO.
- Until DKIM is aligned, do not move DMARC beyond p=none (it would junk the Executive's own Gmail-sent replies if Workspace is not DKIM-signing for the domain: not checked).
- Volume is far below Gmail's 5,000/day bulk line, so this is about inbox placement for institutional readers, not a hard legal requirement.

## Sources
- mailchimp.com (read)
- withsignet.com (read)
- support.google.com (read: 5,000/day bulk line)