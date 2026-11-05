# BIMI (logo in the inbox): eligibility check, verdict for now

Date: 2026-11-05 · Status: verdict + checklist · Owner: bizdev / email

## What the primary page states (BIMI Group implementation guide, read 2026-11-05)
1. SPF, DKIM and DMARC aligned; DMARC **must be at enforcement** on the organisational domain and subdomains: `p=quarantine; sp=quarantine` or `p=reject; sp=reject`. "'None' policies or 'pct' less than 100 percent are not accepted."
2. Logo as **SVG Tiny PS**.
3. VMC (Verified Mark Certificate, needs a **registered trademark** of the logo) or CMC (Common Mark Certificate, no trademark; the BIMI Group states it allows some flexibility in display) — "highly recommended, but optional"; "Self-Asserted BIMI records have limited support".
4. DNS: `default._bimi.<domain> TXT "v=BIMI1; l=<SVG URL>; a=<PEM URL>"`.
- Practitioner/vendor pages (Mailpro 2026, EncryptionConsulting; snippets only, not read): Gmail needs a VMC or CMC; a VMC adds the blue check; DMARC p=none = no logo.
- VMC/CMC are issued by Mark Verifying Authorities for a fee (paid; prices not checked).

## Checklist (run before ever proposing BIMI)
- `python3 tools/dns_auth_check.py <domain>` shows DMARC p=quarantine/reject, sp set, no pct<100, DKIM aligned for every stream.
- SVG Tiny PS file validated with the free BIMI Group validator (web tool, nothing installed).
- A certificate decision: VMC (trademark + fee) / CMC (fee) / none.

## How we apply it to Cedwyn
- **Verdict: not now.** Measured 09:34Z: `bucklerfamily.estate` DMARC is `p=none`, no Mailchimp DKIM, no `default._bimi` record. BIMI cannot show until the DMARC rollout (mailchimp-domain-authentication-dmarc-rollout.md) reaches quarantine, which needs weeks of reports first.
- Gmail logo display needs a VMC or CMC = **spend**; our rule is zero spend, so any certificate is a PROPOSAL for the Executive, not an action.
- Free part we can prepare later without risk: an SVG Tiny PS version of the Tŷ Mawr (Great House) mark, checked in the free validator; publish nothing in DNS.
- Revisit when DMARC has been at quarantine for 30 days with ~100% aligned pass.

## Sources
- bimigroup.org (read)
- mailpro.com (snippet only)
- encryptionconsulting.com (snippet only)