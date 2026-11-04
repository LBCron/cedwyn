# Email clicks by recipient domain: discount institutional clicks (2026 data)

Topic: reading click numbers when the list (or the outreach) reaches employer/institution mailboxes. Companion to email-metrics-mpp-bot-clicks-what-to-trust.md (what to trust overall) and tools/bot_click_flag.py (per-click timing rules). New here: the bot-click rate **by recipient domain class**, which is what makes institutional sends unreadable.

## The evidence
- GlueLetter, "Bot clicks in 2026" (vendor analysis, read in full 4 Nov 2026): 105,432,741 link clicks, 1 Jan to 31 May 2026, dozens of publishers on many ESPs; their own detector plus ESP flags (e.g. Sailthru). **56.0% of all clicks were automated** (security filters opening links), and bot clicks cluster on a few links per email, so "most-clicked link" rankings are distorted.
- Rate by domain class (same page, their table):
  - .us 95.8% · .org 92.7% · .gov 84.8% · .edu 79.7% · other .com 77.1% · other domains 70.7% · other .net 64.7%
  - outlook.com 28.3% · hotmail.com 22.6% · live.com 21.8%
  - gmail.com 7.0% · yahoo.com 5.8% · aol.com 5.0% · me.com 5.5%
- Jeff Sonderman (GlueLetter) LinkedIn post: "more than one-third" of newsletter clicks are bots in an earlier pull (snippet only, not read in full).
- Caveat: the data is US-weighted. UK classes (.gov.uk, .ac.uk, .org.uk, nhs.uk, police.uk) are not in the table. Treating them like .gov/.edu/.org is our inference, not measured. It is a reasonable guess because UK public bodies run the same kinds of link scanners (e.g. Microsoft Defender Safe Links), but it has not been checked.

## How to do it
1. **Split every click report by recipient domain class** before reading it: personal webmail (gmail/yahoo/icloud/aol), Microsoft consumer (outlook/hotmail/live), institutional (gov/ac/edu/org/nhs/police, and .com employer domains).
2. **Personal webmail clicks:** read as roughly human (5-7% noise).
3. **Microsoft consumer clicks:** discount about a quarter.
4. **Institutional clicks:** presume automated unless corroborated. Corroboration means one of:
   - a reply;
   - a site visit from that organisation's network shortly after the click (Cloudflare analytics, UTM landing);
   - a second click more than 10 minutes after the first;
   - a purchase or signup.
5. **Never A/B test subject lines or links on institutional clicks.** Pick winners on webmail-only clicks, or on replies.
6. **Never report institutional "clicks" as interest** in a brief or to a partner. Report replies and visits instead.
7. **Turn off link tracking on one-to-one institutional outreach** (already the rule in email-links-shorteners-tracking-safe-links-bot-clicks.md). The data is noise and the rewritten links look worse.
8. **Run the timing rules too** (tools/bot_click_flag.py): 2 clicks under 2 s, 10+ in 30 s, or every link within 60 s of the send.

## Tool
`tools/click_domain_class.py` (own, stdlib, ~2 KB, nothing installed). Input is a CSV with an `email` column (Mailchimp click export). It counts clicks per domain class, shows GlueLetter's bot share for each class, and gives a rough human-click estimate:
`python3 tools/click_domain_class.py clicks.csv`

## How we apply it to Cedwyn
- **Mailchimp newsletter:** when a campaign report shows clicks, run click_domain_class.py on the export. A spike from archive, council or university addresses is scanner traffic until a visit or reply backs it up. Webmail clicks are the real reader signal for which e-book link works.
- **Institution correspondence** (archives, councils, MOD, HMLR, universities): "clicked" from a .gov.uk or .ac.uk mailbox proves nothing. Evidence of reading is a reply or a logged visit to the page we linked.
- **Weekly growth report:** state signups and sales, not raw clicks. If clicks are quoted, quote webmail-only clicks and say so.
- **Funnel A/B:** decide on webmail-only clicks or on /ebooks/ visits with UTM, never on blended clicks.

## Sources
- glueletter.com (read in full, 4 Nov 2026; vendor data)
- linkedin.com (snippet only)
- related: omeda.com (already used by tools/bot_click_flag.py)