# Bot clicks from security scanners: read B2B/institutional click data honestly

Harvested 2026-11-05. Topic: analytics + email outreach to UK institutions. ("link scan", "click tracking", "non-human" 0 hits in INDEX before; "bot click" 5 passing mentions.)

## The evidence
- M3AAWG (anti-abuse industry body), Non-Human Interactions document (Nov 2020, PDF; figures via two 2026 vendor write-ups, PDF not re-read): automated activity can be 20%-80% of recorded clicks on B2B email, under 10% on large consumer mailbox providers (Gmail/Yahoo/Outlook.com).
- Scanners that pre-click every link: Microsoft Defender for Office 365 Safe Links, Proofpoint URL Defense, Mimecast URL Protect, Barracuda Link Protection (emailcalculator.com blog, 22 Aug 2026, read).
- Practitioner tell (r/email thread, 2026, snippet): a "click" within ~3 seconds of delivery is a gateway pre-scan, not a reader.
- HubSpot KB "Understand bot filtering in marketing email analytics" (updated 19 Oct 2026, read): when bot filtering is on, HubSpot excludes suspected bots (IP blocklists + speed patterns), explicitly including security scanners, Apple MPP and corporate screeners such as Mimecast; the email performance page shows opens/clicks with and without bots.
- Mailchimp Help "About Bot Activity and Bot Filtering" (read): filtering is ON by default, account-wide; filtered history exists from 10 Jul 2024 (MPP opens) and 10 Aug 2025 (email clicks); "your open and click metrics will drop significantly" when it is on; use bounces, unsubscribes and conversions alongside.

## Signals a click was a machine
1. Seconds after delivery, before any open.
2. Every link in the email clicked at once by one recipient (including footer, unsubscribe-adjacent and image links).
3. Datacentre/vendor IP ranges, odd user agents, no page view after the click in site analytics.
4. Click with no session on the site (Cloudflare/analytics shows no matching visit) -> treat as unread.

## The rules
1. Never treat an institutional click as interest. A council, university, museum or police address clicking = "delivered past the gateway", nothing more.
2. Keep bot filtering ON in Mailchimp (default) and turn it ON in HubSpot; compare the with/without figures once and record the gap.
3. Judge institutional outreach on replies and on-site actions (sample download, signup, purchase), never opens or clicks.
4. A/B tests on institutional lists: use replies or conversions as the metric; click-based winners on these lists are noise.
5. For one-to-one emails to institutions, send plain text with untracked links (Gmail personal send has no tracking); tracked redirect links in cold mail also look phishing-like to the same scanners.
6. Optional honeypot: a 1x1 hidden link at the top of an HTML campaign; anyone "clicking" it is a bot. Exclude those contacts' clicks for that send. (Common practitioner tactic; not tested by us.)

## How we apply it to Cedwyn
- Hive/HubSpot drafts to councils, Land Registry, archives and museums go from the connected Gmail as plain text: no tracking to misread. Keep it that way; never move them to a tracked tool.
- Mailchimp newsletter: confirm bot filtering is on (Analytics > Analytics settings) before the Sunday growth report reads click numbers; note in weekly.csv whether figures are filtered.
- Growth report and traffic flywheel: for any send that went to .gov.uk / .ac.uk / museum addresses, report clicks only where the site analytics shows a matching visit to the tracked UTM page; otherwise "delivered".
- The e-book PR and WI/u3a speaker-secretary mailings: success = reply or booking, never click rate.
- Tŷ Mawr (Great House) campaign links carry UTMs already; match utm_campaign visits in Cloudflare against Mailchimp clicks for one send to measure our own bot gap (one-off, 10 minutes).

## Sources
- knowledge.hubspot.com (read 2026-11-05)
- mailchimp.com (read 2026-11-05)
- emailcalculator.com (read 2026-11-05)
- clearout.io (read 2026-11-05)
- m3aawg.org (primary; figures via the two pages above, not re-read)
- reddit.com (snippet)