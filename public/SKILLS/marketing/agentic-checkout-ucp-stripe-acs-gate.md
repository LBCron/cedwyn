# Agentic checkout gate: Google UCP Buy button + Stripe Agentic Commerce Suite (2026)

Harvested 2026-11-04. Status: GATE, not now for Cedwyn. Re-check quarterly.

## What it is
- **Universal Commerce Protocol (UCP)**: an open standard announced by Google on 11 Jan 2026 (NRF), co-developed with Shopify, Etsy, Wayfair, Target and Walmart and endorsed by Visa, Mastercard, Stripe, Adyen and others. It lets an AI agent discover a product, build a cart, check out and manage the order on the shopper's behalf. The merchant stays the seller of record. Payment goes through Google Pay, using cards saved in Google Wallet (PayPal "forthcoming").
- **March 2026 update** (Semrush, 26 Mar 2026, read): cart (multi-item), catalog (real-time price and stock), order management and identity linking (loyalty pricing). Simpler onboarding through Merchant Center. Stripe, Salesforce and Commerce Inc. say they will implement it.
- **5 May 2026**: the Buy button left AI Mode and showed up in the normal Search results. ppc.land reported it from Brodie Clark / SERP Alert, with Wayfair the only merchant seen ("sofa bed couch"). So the button can now sit right on the results page, where it used to need a chat turn first.
- **Stripe Agentic Commerce Suite** (Stripe docs, read): you share a catalog feed, and Stripe shares the products with agents, runs checkout, takes payment and tells you about orders. The Stripe-managed checkout is "available in the US, Canada, and select European countries". Running your own UCP checkout with the Stripe Payments handler is another path.

## Eligibility facts (read 4 Nov 2026)
- Google Merchant help 16837055: "only applies to products with eligibility in the United States, Canada, and Australia, and for participating merchants". Early access is for select merchants through an interest form. **The UK is not listed.**
- Merchant Center prep guide (developers.google.com):
  - A product opts in with the feed attribute `native_commerce(checkout_eligibility)=TRUE`. It defaults to FALSE.
  - Cart transfer is **opt-out**: products approved for free listings are included by default once the cart capability is in your UCP profile. Set `native_commerce(cart_eligibility)=FALSE` to exclude one.
  - A **return policy in Merchant Center is mandatory** (a Merchant of Record requirement shown on the checkout screen).
  - Ineligible categories: subscriptions and instalments; personalised items; "Final Sale" (no returns); **pre-orders**; services and online classes; rentals; virtual items; anything that needs software installed before purchase; age-restricted items; special shipping; gifting.
  - E-books / downloadable PDFs are **not named** as either eligible or ineligible. Treat that as not checked. "Final Sale" and "pre-order" rules apply if we ever list one that way.
- The Buy button sits on Shopping product listings, so **without Merchant Center free listings there is no Buy button at all**.

## What it means in practice (numbers)
- No small-merchant conversion figures published yet. The only merchant seen in main results was Wayfair (May 2026), so any uplift claim right now is vendor talk.
- ChatGPT's own Instant Checkout (ACP) was scaled back in Mar 2026 after about 12 Shopify merchants went live (see chatgpt-shopping-feed-instant-checkout-gate.md). One-click-in-agent checkout is still moving and has fallen back before.

## How to do it (when the gate opens)
1. Merchant Center: an approved free listing per product (see the free-listings skill), a correct GBP price, availability, GTIN or `identifier_exists=no`.
2. Merchant Center > Return policy: state it (for digital files say what happens, e.g. a refund within 14 days if the file is faulty, in line with UK digital-content rules; see the terms/refunds skill).
3. Feed: add `native_commerce(checkout_eligibility)=TRUE` only on single-item, non-pre-order, returnable products.
4. Publish a UCP profile (or let a platform, e.g. Stripe ACS, host it). Test one product, watch Merchant Center diagnostics for 7 days, then widen.
5. Measure: orders tagged as agent/Google Pay checkout vs site checkout. Keep the site's own Buy path; the agent route only adds to it.

## How we apply it to Cedwyn
- **Decision now: do not apply.** The seller is UK-based, prices are in GBP, and the region list is US/CA/AU. The products are digital PDFs with no stated eligibility, and the integration is early access.
- **Zero-cost prep that pays off anyway:**
  1. Keep accurate Product/Offer JSON-LD on /ebooks/ pages (price, priceCurrency GBP, availability).
  2. Write the refund wording once on /refunds/, so Merchant Center and the site match.
  3. Keep free listings approved, because the Buy button rides on them.
- **Re-check each quarter** (next: Feb 2027). Look for: UK in help 16837055's country list; e-books or digital downloads named as eligible; whether Stripe's "select European countries" includes the UK (read docs.stripe.com, not checked today). If all three turn green, propose a one-product pilot to the root as a PROPOSAL. No spend; any account or feed change in the project lead's Merchant Center needs his yes.
- Today's sales problem is not this. 9 shop visits and 0 buys is a path problem on our own pages, and those come first.

## Sources
- blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms/ (11 Jan 2026, read)
- developers.google.com (read 4 Nov 2026)
- support.google.com (read 4 Nov 2026)
- semrush.com (26 Mar 2026, read)
- ppc.land/google-brings-ucp-checkout-out-of-ai-mode-into-main-search-results/ (May 2026, read; first spotted by Brodie Clark, SERP Alert)
- ucp.dev/documentation/roadmap/ (read: phased markets India/APAC/LatAm, loyalty, cross-sell; no dates, "not a commitment")
- docs.stripe.com (read)