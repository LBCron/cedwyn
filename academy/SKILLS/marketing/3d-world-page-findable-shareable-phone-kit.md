# 3D world pages: make them findable, shareable and phone-safe (launch kit)

Written 4 Nov 2026 while the Wales (real-terrain) and Argentina 3D worlds are being built. ('three.js'/'webgl'/'3d world' had 0 hits in INDEX.md; the Sketchfab route is separate: sketchfab-3d-virtual-tour-replica-views.md.)

## Facts this rests on (primary, read 4 Nov 2026)
- Google Search does not interact with pages: content that loads only after a click, scroll or drag is not seen. Lazy-load must fire on viewport visibility (native lazy images, IntersectionObserver), "which is important as Google Search does not interact with your page"; and do not lazy-load what is visible on open (Search Central, "Fix lazy-loaded content").
- Google's own research figure: 53% of mobile visits are likely abandoned if a page takes longer than 3 s to load (Google AdSense Help 7450973; the study dates from 2016-17, treat as direction, not a 2026 measurement).
- Google renders JavaScript and picks up JS-injected canonicals/links (Search Central, JavaScript SEO basics). Our reading, not a Google sentence: a WebGL canvas is pixels, so place names, captions and credits drawn inside it are not text Google can index - they must also exist as HTML.

## The kit (do all six per world page)
1. HTML layer first. Above or below the canvas, in plain HTML: an H1 with the place name, 2-4 sentences of what the viewer is looking at, the data-credits footer (OS/OSM/LiDAR licences, which the spec already requires), and normal links to the matching history pages. This is what search and AI answers can read and cite.
2. Poster, then load. Show a static still (WebP, <200 KB, real render of the scene) with a "Enter the 3D world" button; start heavy assets on tap or when the canvas scrolls into view. The page is usable and indexable in <3 s on a phone even if the 3D takes 15 s. Never hide the HTML text behind the button.
3. Share card from a real render. og:image / twitter:image = 1200x630 render of the anchor view (the farm, not a logo); og:title names the place; og:description one plain sentence. Check with a cache-busted fetch of the page head.
4. Deep links to views. ?view=tymawr, ?era=1841 style URLs (the Wales build already uses them) so each post, talk slide or email can open the exact spot; each shared link carries utm_source/utm_medium/utm_campaign.
5. A 20-40 s fly-through clip recorded from the scene (vertical 1080x1920 for Shorts/Reels; landscape for the page) with an on-screen place caption and the deep link in the description. Clips travel on social feeds; the canvas does not. Post through the existing YouTube Shorts / Instagram flywheels, not a new channel.
6. Measure: page views on the world path vs "entered 3D" taps (beacon on button press) vs clicks onward to history pages and /ebooks/. If under 30% of visitors tap Enter, the poster/button is the problem, not the terrain.

## Checks before calling it live
- Cache-busted fetch: H1, description text and credits present in the served HTML (not only after JS).
- 390 px screenshot: poster visible, text readable, button above the fold.
- Lighthouse-style look at LCP: the LCP element should be the poster image or H1, not the canvas.
- No file >25 MB (spec), page weight before tap <1 MB.

## How we apply it to Cedwyn
- Wales world (a worker) and Argentina world (a worker, own path): hand both this checklist as a PROPOSED follow-up once phase 1 is live; do not interrupt their builds.
- Wales text states "former manorial house"; credits must name OS/OSM/LiDAR sources exactly.
- Argentina page: no money words, no prices, no shop strip; link only to the Argentina history pages.
- Public text never names the project lead; banned words; no insignia; no family holdings/addresses beyond what the site already shows.
- Fly-through clips go into the Shorts queue as normal items (shop line + documentary line rules apply to Wales clips only; Argentina clips carry no shop line).

## Sources
- developers.google.com (read 4 Nov 2026)
- developers.google.com (read 4 Nov 2026)
- support.google.com (snippet: 53% / 3 s)