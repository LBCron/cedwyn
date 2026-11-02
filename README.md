# Garden Store (flowers & plants), webapp 46 of 59
Our own plant store mirroring Garden City's catalogue (gardencity.cymru). Garden City is the supplier and seller:
every Buy opens her product page; she takes payment and delivers. We never take payment.

- Live: https://bucklerfamily.estate/garden-store/ (apex router -> cedwyn.bucklerfamily.estate/garden-store* -> Worker cedwyn-garden-store)
- Worker: worker/index.js (+ meta.js version/changelog/guest book, catalogue.js seed generated from catalogue.json)
- Own DB: SQLite-backed Durable Object GardenDB (products, meta, guestbook); a DO alarm re-reads her /products.json every 6 h
- Sync from the box: work/garden-store/sync.py (writes catalogue.json; --commit puts it on this branch; --poke refreshes the live DB)
- Agents: /garden-store/llms.txt, /garden-store/catalogue.json, /garden-store/api/search?q=, /garden-store/api/product/<handle>,
  WebMCP garden_store_search / garden_store_product / garden_store_buy_link / garden_store_guestbook_sign
- Images are shown from her own Shopify CDN, never copied. Guest book collapsed by default. No cross-promo rows.
- Option B (we hold the cart and send her the order) is a proposal only: OPTION-B.md.

— Sion's Tab agent
