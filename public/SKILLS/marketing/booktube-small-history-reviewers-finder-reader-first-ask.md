# BookTube small history reviewers: find them with the yt-dlp finder, size them, ask reader-first

Date: 2026-11-05 · Harvest run (lead from the 07:35Z run: "BookTube small reviewers for nonfiction").
Status: channel numbers below were READ on 2026-11-05 from public YouTube via the box (yt-dlp). Advice lines are practitioner testimony, quoted with source.

## Why small channels
- In a test search on 2026-11-05 ("welsh history book review", "local history book review uk", "history book haul nonfiction booktube", 8 results each), the channels that actually review history books were mostly small: The History Fella 582 subs, KRAZTV 1,750 (a John Davies *History of Wales* review, 178 views), Graham Loveluck-Edwards 2,770, BritainsHiddenHistory Ross 11,200 (median 1,234 views on the hits), The History Shelf 21,900 (median 2,447), BenjaminAngwin 21,200 ("You need this book to understand Wales!", 1,499 views).
- A 1,000-view review by a Wales or local-history channel reaches more of the right readers than a big general channel ever would. BookBub's Bookstagram advice makes the same point (genre match beats size; see bookstagram-10-post-test-niche-tags-history-ebook.md).
- A r/books thread on BookTube economics notes that "the huge channels earn their livelihood with booktube. So they have to avoid making vids with small views". A niche regional e-book is exactly that kind of small-view video, so big channels are a poor fit (reddit.com).

## Method (about 10 minutes, free)
1. Run the finder (tool below) with 3-5 niche queries: place + "history book review", "local history book review uk", "history book haul", "welsh history books". Use `--max-subs 30000`.
2. Keep channels with 2 or more hits, or 1 hit that is a real review of a place-history book. Drop councils, archives, news outlets and fiction-only channels. Archives such as Cumbria Archive Service are a separate route: institutions, not reviewers.
3. Open each channel's About tab and note any review policy and business email. Many BookTubers post one, e.g. "I would gladly receive review copies from publishers" (readthistwice.com).
4. Check the last 5 uploads are within about 60 days. A dormant channel won't review.
5. To widen the net, Nonfiction Authors Association (Stephanie Chandler) suggests a Google Alert on `"book review" <genre>`, e.g. `"book review" "welsh history"`. Note who writes the reviews, check that the site is credible, then "send a note asking if they would like a review copy … along with a brief overview". Build the list "several months in advance" (nonfictionauthorsassociation.com).
6. The ask is reader-first: "would you like to read it?", never "will you feature it?". One short note with a one-paragraph overview and a free download link, and no attachments. Gifted copies need the creator to disclose them under UK CMA/ASA rules (gifted-ebook-copies-history-creators-uk-cma-asa-disclosure.md).

## Tool
`tools/booktube_finder.py` (stdlib + the yt-dlp already on the box, 0 bytes installed, no API key, read-only).
`python3 tools/booktube_finder.py "welsh history book review" "local history book review uk" --n 8 --max-subs 30000`
Output: subscribers, hits across queries, median views of the hit videos, channel URL, a sample title. Box-tested 2026-11-05: 3 queries x 8 results gave 17 channels in about 25 s.

## How we apply it to Cedwyn
- Run the finder once a month with Wales/Glamorgan/Cardiff/local-history queries. Keep a shortlist in the project workspace with columns channel, subs, last upload, policy, email, fit note.
- First candidates from today's run: KRAZTV, Graham Loveluck-Edwards, BenjaminAngwin (Wales history series), BritainsHiddenHistory Ross, The History Fella. Check each About page before listing it.
- Any review-copy ask is outreach, so it goes on the proposals queue (the project workspace) for the project lead's press GO. No DMs, no comments, nothing sent by script.
- The offer is the free v0.0.1 edition (the version rule makes it free anyway), with a /ebooks/ link tagged `utm_source=youtube&utm_medium=review&utm_campaign=booktube_<channel>`.
- Measure: clicks per tagged link at 30 days. A review that brings fewer than 10 clicks means that channel type is dropped from the next shortlist.
- Do not overstate: no source gives sales per BookTube review for nonfiction or local history. That figure is not checked.

## Sources
- Box read 2026-11-05: yt-dlp ytsearch results + channel_follower_count (YouTube public pages)
- nonfictionauthorsassociation.com (read; post dated 2015, method still current)
- readthistwice.com (snippet: example review policy; page is JS-rendered)
- reddit.com (snippet)