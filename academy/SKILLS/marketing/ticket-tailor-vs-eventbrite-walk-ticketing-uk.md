# Ticketing the pilot walk and talks: Ticket Tailor vs Eventbrite (UK, 2026)

Read 4 Nov 2026. Topic: funnel/checkout for paid places on the Llandough heritage walk and paid talks. ('ticket tailor' had 0 hits in INDEX.md; Eventbrite free-listing and listing-rule skills already exist: free-online-talk-listings-eventbrite-meetup.md, eventbrite-listing-rules-and-author-talks-sell-books.md, pilot-walk-presale-minimum-numbers-hold-then-charge.md.)

## The numbers (primary pages, read live 4 Nov 2026)
- Eventbrite UK organiser fee: 6.95% + £0.59 per paid ticket, payment processing "Not applicable" (rolled in); free tickets free. (Eventbrite Help 755615.)
- Ticket Tailor (GBP page): free tickets free up to 5,000/yr; pay-as-you-go £0.60 per paid ticket + VAT; prepaid credits from £0.22 + VAT; first 5 tickets free; 50% off for registered charities and some not-for-profits; reduced fee on very low-priced tickets. Payment is taken by OUR Stripe/PayPal/Square account (illustrative Stripe cost on a £20 ticket £0.40 -> we keep £19.60 on credits). Ticket Tailor never holds the money.
- Eventbrite holds ticket money and pays out by default 3 days after the event, then 3-7 business days to the bank (rework.com reading of Eventbrite Help; not re-checked).

Worked cost per £12 walk place (our arithmetic, VAT on TT fee at 20% included, Stripe UK standard card ~1.5% + 20p assumed, not checked against our Stripe account):
- Eventbrite: 0.0695*12 + 0.59 = £1.42 (11.8%).
- Ticket Tailor PAYG: 0.72 + Stripe ~0.38 = £1.10 (9.2%).
- Ticket Tailor credits: 0.26 + ~0.38 = £0.64 (5.4%).
- Gap grows with price: Eventbrite's % never stops; TT is flat (rework.com table: TT fee 6.0% of a £10 ticket PAYG, 1.2% of £50).

## What you buy with Eventbrite's extra fee
Reach. Eventbrite is a marketplace that surfaces events to strangers (its own search/app); Ticket Tailor is white-label and sends no buyers. Practitioner rule (rework.com 2026): pay the % only when buyers are strangers; when every attendee comes from your own list, that reach is "close to worthless". Eventbrite's own figure (in our existing skill): ~30% of literary-event tickets come from its discovery (vendor stat, not checked).

## How to decide (in this order)
1. Free event (talk, launch, online Q&A)? Eventbrite free listing: discovery at £0. Done.
2. Paid, and buyers mostly strangers (tourists, Cardiff day-trippers)? Eventbrite paid, accept ~12%. Its reach is the product.
3. Paid, and buyers mostly ours (newsletter, Facebook page, talk audiences, society members)? Ticket Tailor PAYG (no upfront spend), embedded box office on our own page, money lands in our Stripe at once, we own the attendee list (consent to email asked at checkout, PECR).
4. Can do both: list the same dated walk on Eventbrite for discovery AND sell from our page via Ticket Tailor, with one shared capacity counted by hand (small groups) - stop sales on both when full.
5. Re-read both fee pages before each season; the numbers above are 4 Nov 2026.

## Setup checklist (Ticket Tailor)
- Account free; connect the existing Stripe account (no new card, zero spend; fees only per sold ticket).
- Event: date, meeting point, capacity (walk safety cap), minimum numbers note and what happens if not met (refund rule from pilot-walk-presale skill), accessibility notes, weather policy.
- Ask: name, email, optional "how did you hear" (fixed list: newsletter / Facebook / talk / Eventbrite / friend / other) -> this is our channel attribution.
- Embed the box office on the walk page; add ?utm_ tags on every link pointing to it.
- Use the free check-in app on the day; export the list afterwards; HubSpot import only for those who ticked email consent.

## How we apply it to Cedwyn
- The pilot walk is our own audience (talks, newsletter, Facebook page, local societies): default route is Ticket Tailor PAYG on the /wales/ walk page, with a parallel Eventbrite listing only if a public, led date is set (Eventbrite rejects self-guided listings - see existing skill).
- Free talks stay on Eventbrite free listings (discovery at £0).
- Nothing is published or priced without the project lead: walk price, dates, capacity and refund rule are his decisions -> PROPOSED in the project workspace, not live. Account creation in his name needs his yes (it is a new public channel).
- Use tools/ticket_fees.py to show him the per-place cost at the price he picks.
- Public text: no banned words, never names the project lead; Argentina scope: no money words (ticketing is Wales-only).

## Sources
- eventbrite.com (read 4 Nov 2026)
- tickettailor.com (GBP, read 4 Nov 2026)
- help.tickettailor.com (snippet)
- resources.rework.com (read 4 Nov 2026: marketplace vs white-label, GBP fee table, payout timing)