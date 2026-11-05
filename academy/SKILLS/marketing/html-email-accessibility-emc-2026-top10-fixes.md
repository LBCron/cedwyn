# HTML email accessibility: the 10 machine-checkable fixes (EMC 2026 report)

Harvested 2026-11-05. Topic: HTML email design / deliverability-adjacent quality. ("email markup consortium" had 1 passing mention in INDEX before; "lang attribute"/"role=presentation" 0.)

## The evidence (read on the primary page, 2026-11-05)
- Email Markup Consortium, Accessibility Report 2026 (last modified 21 May 2026): 376,348 HTML emails collected May 2025-May 2026, tested with Parcel's accessibility checker (Deque axe severity scale).
- 99.88% had a "Serious" or "Critical" issue; worst-issue split: Critical 57.97%, Serious 41.91%. Only 8 emails (0.002%) from 3 brands passed everything (Customer.io, NaomiWest.ca, Noble Panacea).
- Platforms: 10,566 emails sent via Substack, Shopify Email and Beehiiv audited; none passed (Substack 83.77% Critical).
- Clients: on 37 feature benchmarks Apple Mail macOS 34/37, Samsung Email 31/37, Proton Mail 29/37; none supports all.
- 2025 report (snippet, not re-read): 443,585 emails, 99.89% Serious/Critical, so a year of no movement.

## Top 10 issues and the exact fix (share of emails failing)
1. dir missing on body's direct children (97.41%) -> put `dir="ltr"` (or `dir="auto"` fallback) on the wrapper div/table directly under `<body>`.
2. lang missing on body's direct children (95.66%) -> `lang="en-GB"` (or `cy` for a Welsh-language block) on that same wrapper; many clients strip it from `<html>`.
3. Layout tables without `role="presentation"` (83.78%) -> add `role="presentation"` (or `none`) to every layout `<table>`.
4. No `<h1>` (74.23%, mild) -> wrap the main title in `<h1>`; skip only for 3-line plain notes.
5. Links with no discernible text (71.23%) -> linked images need alt text that names the destination ("Read the Tŷ Mawr e-book sample"); empty alt is only for decorative, unlinked images.
6. `<html>` without lang (62.16%) -> `<html lang="en-GB">`.
7. Colour contrast under 4.5:1 (58.48%) -> check grey-on-dark text; on our dark theme light grey (#999) on near-black often passes, mid-grey on dark green may not.
8. Images without alt (47.88%, critical) -> every `<img>` gets `alt=""` at minimum.
9. No `<title>` (45.21%) -> `<title>` = the subject line or a fixed "From the Cedwyn estate archive".
10. Non-descriptive link text (15.83%) -> no "click here"/"read more" alone.

## Why it matters for sales, not only compliance
- Screen-reader and large-text readers skew older; our buyers (local history, WI/u3a, genealogy audiences) skew older too (our inference, not measured).
- An image-only or alt-less email shows as a blank grid when images are off (Outlook desktop default in many UK councils and universities), so the call to action vanishes.
- The European Accessibility Act (in force June 2025) covers e-commerce for EU customers; UK sends to EU readers are in scope per vendor guides (customer.io page, snippet; not checked against the Act's text).

## How to run it (10 minutes per template)
1. Export the template HTML (Mailchimp: "Export as HTML"; HubSpot: preview > view source).
2. Run `python3 the project workspace template.html` (stdlib, box-tested 2026-11-05; checks items 1,2,3,4,5,6,8,9,10; contrast needs a manual check).
3. Fix in the template once (design-system rule from the report: fix the shared block, not each campaign).
4. Free cross-check: Parcel's accessibility checker on its free Community plan (the tool EMC used).
5. Send one test to a Gmail and an Outlook inbox with images off; read the alt text aloud as the only content.

## How we apply it to Cedwyn
- Mailchimp newsletter and e-book launch templates: add wrapper `lang="en-GB" dir="ltr"`, `role="presentation"` on layout tables, an `<h1>` naming the issue ("From Tŷ Mawr (Great House): the manorial house archive, November"), alt text on every cover image that names the book and destination.
- Welsh-language paragraphs (place names, Dwynwen/wassail lines) sit in their own block with `lang="cy"` so screen readers switch voice instead of mangling Welsh.
- Hive/HubSpot plain-text drafts to institutions are unaffected (plain text has no markup); this applies to HTML marketing sends only.
- Quote-card and carousel emails: never ship a quote as an image only; repeat the verbatim record line as live text under the image with its source line.
- Add "a11y lint passes" to the pre-send checklist the growth and e-book PR runs already use.

## Sources
- emailmarkup.org (read 2026-11-05)
- emailmarkup.org (snippet)
- customer.io (snippet)