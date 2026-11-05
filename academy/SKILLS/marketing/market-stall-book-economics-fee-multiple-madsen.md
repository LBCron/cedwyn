# Market stall / fair economics for a book table: the fee-multiple rule (Madsen data, 2026)

Topic: in-person selling at farmers' markets, Christmas fairs, book fairs and shows. When does a table pay, and what does it do besides sales?
Harvested 2026-11-05 (skills harvest). Words checked before writing: 'farmers market' 0, 'christmas market' 0, 'craft fair' 0 skill hits (QR payment at stalls is already in in-room-ebook-sales-qr-payment-link-vs-tap-to-pay-uk.md; Royal Welsh stand in royal-welsh-show-winter-fair-stand-vs-books-council-stall.md).

## The evidence (primary testimony with numbers)
- Jeremy P. Madsen, author newsletter, 15 Aug 2026 (read in full): 16 in-person events in 18 months (5 farmers' markets, 2 conferences, 7 book fairs, 1 bookshop signing, 1 school literacy night).
  - Sold 152 books + 2 t-shirts + 41 card games: ~16 items per event. 75% of sales came from the best 5 events (Pareto).
  - Gross $3,320, net profit $352.25 (~11%). Lost money on 3 events (sales below the venue fee).
  - Costs: card fees ~3%, print cost 35-45% of list price, venue fee $20-45 (markets, small fairs) or $100-500 (big fairs/conferences), market insurance ~$25/month, kit (canopy, tables, banner, stands, bookmarks) up front.
  - THE LEVER: the venue fee is the only flat cost. A well-priced event sells 5x-10x the fee. An overpriced one has the fee eating 1/3 to 1/2 of sales; one event with 4x the sales was LESS profitable than a cheap one.
  - Raising prices ($5->$7, $15->$20) took cost of goods from >50% to ~40% of gross with no visible drop in buyers (his note: hard to measure).
  - Genre: from talking to other vendors, "niche genres like regional histories or memoirs sell worse"; more titles on the table raises sales (5-8 products ~2x, 12+ ~3x, then a ceiling).
  - Side value: 97 email sign-ups across the 16 events (~6 per event, net of unsubscribes).
- r/selfpublish, "My experience selling my book at a local craft/farmers market" (search snippet, not opened): 9 books sold, ~30 bookmarks handed out.
- Lindsey Kinsella, author Facebook post (snippet): three craft fairs/farmers' markets "hit or miss"; the first sold 0 books.
- ALLi (Self-Publishing Advice), "How to Boost Print Sales with Christmas Fairs", 18 Nov 2017 (read; old, testimony only, no numbers): school Christmas fairs charge "single figures" for a table, city cabins hundreds or thousands; organisers earn from pitch fees, so their idea of success differs from yours; ask other stallholders which fairs pull buyers; signing with a message for the gift recipient + free bookmarks add value; book next year's fair as soon as this year's ends (lists fill early); share a table with another author to halve the fee.

## How to do it (checklist)
1. Before booking: fee multiple = expected gross / fee. Book only if >= 5. Expected gross for a niche regional title with 1-3 items: plan on Madsen's low end (under 16 items) or less.
2. Prefer cheap, well-attended pitches: school/church/community-hall fairs and small markets over prime-cost cabins and big shows.
3. Ask existing stallholders (in person, at the fair you are scouting) which events actually pull buyers. Scout this year, book next year.
4. More products on the table = more sales (gift-sized cheap item leads; Madsen's best seller was his cheapest, shortest title).
5. Price so cost of goods stays near 40% of gross; do not underprice to compete with the next table.
6. Count sign-ups as a result: a clipboard/QR for the free first edition is the second goal of every table.
7. Keep a per-event row: fee, gross, items, sign-ups, cost of goods, profit, fee multiple. Drop events that miss 5x twice.
8. Public liability insurance: many markets and agricultural shows require it (cost = spend -> proposal).

## Tool
tools/stall_breakeven.py (stdlib, written this run, 0 bytes installed): fee multiple, profit and break-even unit count for a planned table.
  python3 tools/stall_breakeven.py --fee 25 --items 4.99:0:12 --items 10:4:6 --card 0.015 --fixed 0.20
  (item = price:unit_cost:expected_units; card fee % + fixed per transaction)

## How we apply it to Cedwyn
- Today there is no print copy (paperback interior is still a prep step), so a table sells e-books by QR card (Stripe Payment Link QR, see in-room-ebook-sales-qr-payment-link-vs-tap-to-pay-uk.md), walk places/vouchers and sign-ups. Unit cost is ~0 but price is low (e-book ~£4.99), so the fee multiple rule bites hard: a £25 table needs ~£125-250 gross = 25-50 e-book sales. Madsen's data plus "regional histories sell worse" makes that unlikely.
- Verdict: no paid stall for e-books alone. Revisit when a printed copy exists (gift-able object, signing for the recipient: Christmas is the season). Until then the cheap route is sharing a heritage/civic-society or bookshop table at a free or single-figure community fair, aiming at sign-ups for the free first edition.
- Any fee or insurance is spend: write it as a PROPOSAL (the project workspace), never book. Booking a pitch is an outward step in the project lead's name and needs his yes.
- Track any table with the per-event row above so the meta flywheel can compare it with online channels.

## Sources
- jeremypmadsen.substack.com (15 Aug 2026, read)
- selfpublishingadvice.org (2017, read)
- reddit.com (snippet only, not checked)
- facebook.com (snippet only, not checked)