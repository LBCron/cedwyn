# Christmas 2026 order cutoffs: Printful merch, Royal Mail, and the e-book as the last-minute gift

Harvested 2026-11-05. Topic: posting a clear "order by" date per product type, and switching the push to instant-delivery e-books once physical cutoffs pass ("last order" / "cutoff banner" had 0 hits in INDEX; ebook-gifting-gumroad-gift-toggle-stripe-gift-field-christmas.md covers the gift checkout itself, not the dates).

## The dates (read 5 Nov 2026)
**Printful, products made in the UK, shipping to the UK** (Printful's UK deadline PDF):
- The **2026** UK PDF downloaded on 5 Nov 2026 was the header only, with no table. The dates for this year are **not published yet**: re-check before posting any date.
- 2025 table (last year, use only to plan): Apparel Dec 16 standard / Dec 18 express; Home & Living and accessories (mugs, posters, totes) Dec 16 / Dec 18; warehoused products Dec 17 / Dec 19.
- 2025, made **outside** the UK and shipped to the UK: Apparel and Home & Living Dec 7 / Dec 15; knitwear Nov 15 (no express); warehoused Dec 10 / Dec 18.
- Printful's rule: an order with products from more than one category has to go in before the **earliest** category deadline. UK dates only apply to variants that are actually made in the UK (check each variant in the catalogue).
- Printful's own 2026 US page: made in the US, order by Dec 11 standard / Dec 16 express; made outside the US, by Nov 26 standard / Dec 14 express. This shows how much earlier the cross-border cutoffs fall.
- Express is only for manually placed orders and for stores with live rates turned on.

**Royal Mail inland last posting dates, Christmas 2026** (Post Office page):
- 2nd Class / 2nd Class Signed For: Fri 18 Dec
- Tracked 48: Sat 19 Dec
- 1st Class: Mon 21 Dec. Tracked 24: Mon 21 Dec
- Special Delivery: Wed 23 Dec

## What practitioners do
- Printful's 2027 holiday calendar (blog, 28 Oct 2026) tells sellers to "post a clear order cutoff" for each holiday, e.g. UK Mother's Day. Their readiness guide: share shipping and fulfilment cutoff dates with customers 1-3 weeks before the holiday, with Dec 9-20 as the "holiday shipping cutoffs" window.
- Printful's example banner (2025 guide): "Order by December 16 to get your gifts by Christmas Day with Priority Mail Delivery", made clickable and linking to the holiday shipping page.
- No published conversion figure for cutoff banners was found. The reason to do it is fewer late-delivery complaints and refunds, not a measured uplift.

## Playbook
1. **Dates table**: one row per product type we actually sell (mug, poster/print, tote, card). Use the earliest category date in Printful's UK table. Subtract one day as a buffer for our own approval/production check.
2. **Banner/strip on /shop/ and each merch page from ~1 Dec**: "Order by <date> for UK delivery before Christmas (standard)." One line, no countdown timer (a fake-urgency timer adds nothing, and the date is a real one).
3. **Product pages**: the same date beside the buy button; tell overseas buyers (Argentina/Chubut readers) plainly that physical items won't make Christmas and offer the e-book or a gift note.
4. **The switch**: from the day after the last standard cutoff, swap the shop strip to: "Too late for post? Give the e-book: instant delivery, with a gift message" → the e-book gift checkout (Gumroad 'give as a gift' / Stripe gift field, per the gifting skill). Keep it until 24 Dec. On 25-26 Dec the line becomes "for the new e-reader".
5. **Email/social**: one newsletter line in the early-Dec issue with the merch cutoff; one post the day before the cutoff; one "e-book still arrives in time" post on 21-22 Dec. No more than that.
6. **After**: log merch orders by day vs the cutoff in the project workspace to see whether anything sold after the strip went up.

## How we apply it to Cedwyn
- Merch is in progress, not live: the Tŷ Mawr Printful account exists, but sign-in is blocked (the project workspace, 5 Nov). Until a product is actually on sale, this file gives the e-book side only.
- E-books are the product that can still be bought on 24 Dec. The gift-switch strip (step 4) is the part to prepare now as a PROPOSED change for the shop theme (Cedwyn internal links only, purchases via /ebooks/).
- Dates to re-check: the Printful UK 2026 PDF (printful.com) at the start of each Monday visibility run until it has a table. Then write the real dates into the strip; never post the 2025 dates as this year's.
- Helper: tools/xmas_cutoffs.py prints the days left and the line to show for a given date (stdlib).
- Public wording rules apply (no banned words, never name the family member). No spend: the banner is a markup change.

## Sources
- printful.com (2026 UK, header only on 5 Nov 2026)
- printful.com (2025 UK table)
- printful.com (2026 US/outside-US dates)
- printful.com ; printful.com ; printful.com
- postoffice.co.uk (Royal Mail Christmas 2026, read 5 Nov 2026)


Re-check 2026-11-05 07:35Z (harvest): Printful UK 2026 table still not found; printful.com gives only "December 9–20: Holiday shipping cutoffs" (generic, not UK per product). Keep last year's UK dates as planning-only.