# ChatGPT now searches your own domain directly (site:-scoped fan-outs), 2026

Harvested 2026-11-04. Vendor figures are marked "not checked": they come from a tracking vendor's own panel and were not reproduced by us.

## What changed (evidence)
- **Promptwatch, 10 Aug 2026 (Klaas Foppen):** on 8 Aug 2026 the share of ChatGPT fan-out (background) queries using `site:domain` jumped from ~0.37% to ~16.8% overnight (about 1 in 280 -> 1 in 6). Same day, average fan-out queries per answer went from ~1.08 to ~1.83 and stayed there, so domain-scoped lookups were ADDED on top of generic searches, not swapped in. Not checked; covers only the prompts Promptwatch tracks.
- **Simon Willison, 20 Aug 2026 (independent commentary):** the shift lines up with OpenAI's 6 Aug GPT-5.6 Sol update ("more reliable with facts... more focused answers"); from poking at ChatGPT he believes the search tool now takes something like `search(query, recency, domains)`. A Promptwatch follow-up (18 Aug) reported ChatGPT sharply cutting Reddit in those searches. Willison could not confirm a system-prompt change.
- **Semrush 3-month study (Nov 2025, 230k prompts, 13 weekly snapshots, 100M+ citations):** ChatGPT's Reddit share fell from ~60% of responses to ~10% and Wikipedia from ~55% to <20% in mid-Sept 2025, while AI Mode and Perplexity barely moved; LinkedIn and Forbes rose on all three. Semrush's own head of AI visibility reads it as de-biasing against over-cited sites, not the Google num=100 change. Not checked. Lesson: platform behaviour flips in a day and differs by engine.

## Why it matters
When ChatGPT decides your site is a likely source, it now runs `site:yourdomain topic` through its search backend. That query can only return pages the backend has **indexed**, with **titles/snippets that name the topic**. Thin hubs, orphan pages, unindexed PDFs and pages whose title is a brand word rather than the thing asked about lose answers even if your rankings are fine.

## How-to (one pass, ~30 min; repeat monthly)
1. **List 10-15 "site-lookup" questions** a user would ask ChatGPT where your domain is the natural source (named places, named records, your products). Write them as `site:yourdomain <topic words>`.
2. **Run each as a real `site:` search** on Google and on Bing (ChatGPT's search backend is not public; check both). Record: results count, top URL, whether the top title/snippet names the topic. Bing Webmaster Tools' URL inspection is free.
3. **Fix the misses, smallest edit first:** (a) page not indexed -> sitemap + internal link from a strong page + request indexing in Search Console/Bing; (b) wrong page wins -> make the right page's `<title>`, h1 and first sentence carry the exact entity name; (c) only a PDF or hub returns -> add an HTML page with the facts visible as text.
4. **Cover more angles per topic.** At ~1.8 searches per answer, comparison, price, "free version", date and "where is" lookups are separate retrievals. One short visible line each beats one long page that answers none directly.
5. **Watch, don't chase.** Log the date of any visible platform change (like 8 Aug 2026) next to your AI-referral and citation counts before rewriting content; a one-day platform rollout is not something your site did.

## How we apply it to Cedwyn
- Question set (log in `the project workspace`): `site:cedwyn.bucklerfamily.estate` + "Ty Mawr", "Great House Farm", "thousand cuts", "cedwyn meaning", "e-book", "free edition", "Llandough", "Leckwith", "tithe map", "academy". Run on Google and Bing; record top URL + whether its title names the term.
- Known gaps this targets: /ebooks/ has no h1 (proposal already written) so a `site: ... e-book` lookup may return a hub or calendar page instead of the shop; branded search sits at 0 impressions, so indexed-page coverage is the lever we control.
- Each e-book needs an HTML page (not only the PDF) whose title carries the place name + "e-book", with price and "free edition" as visible text, so a domain-scoped lookup for price or free version lands on the buy path.
- Add a "platform change" column to the weekly visibility sheet; note 8 Aug 2026 as the baseline shift.
- All edits stay markup/title/internal-link level via the onpage flywheel; body text changes are PROPOSED. No new public channels.

## Sources
- promptwatch.com (read 2026-11-04)
- simonwillison.net (read 2026-11-04)
- semrush.com (read 2026-11-04; Nov 2025 data)