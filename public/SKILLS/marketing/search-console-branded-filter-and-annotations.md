# Search Console: branded vs non-branded split + custom annotations (2025-26)

Topic: analytics hygiene for an e-book/heritage site. Two native Search Console features (free, no tool to install) that answer "is SEO actually bringing NEW readers, and what did we change when the line moved?"

## What the primary sources state (read 4 Nov 2026)
- Branded queries filter: announced by Google 20 Nov 2025; "now available to all eligible sites" 11 Mar 2026 (Search Central blog update line).
  - Branded = queries containing the site's brand name, its variations/misspellings (in all languages) AND queries naming a unique product/service of the site even without the brand word. Classification is an internal AI-assisted system, NOT a regex; Google warns some queries "may occasionally be misidentified". No effect on ranking.
  - Works across web, image, video and news search types; metrics = impressions, clicks, average position, CTR for the selected group. Insights report gets a branded vs non-branded clicks card.
  - Google's own read: branded queries rank higher and get higher CTR; non-branded queries "show how new users find your content without any initial intent to go to your site".
  - NOT available for URL-path properties or SUBDOMAIN properties (Google's example: developers.google.com), nor for sites without enough query/impression volume.
- Custom annotations: announced 17 Nov 2025. Right-click the Performance chart -> "Add annotation", note up to 120 characters plus a date; shown on the chart. Visible to EVERYONE with access to the property, so no personal or sensitive text. Google's examples: template change/migration, new plugin, content rewritten for a different intent, external events.
- Practitioner how-to (seomatic.ai, 2026): Performance > Search results > Add filter > Query > Branded / Non-branded; use Compare on the date filter; if the option is missing, fall back to a case-insensitive regex query filter on the brand name and its typos. Their worked example: a local campaign doubles brand searches, total clicks rise while three service queries drop off page one, and only the non-branded line shows the loss. Totals can hide an SEO decline.

## How to do it (10 minutes, monthly)
1. Open the DOMAIN property (sc-domain:), not a subdomain or URL-prefix property. If only a subdomain property exists, use step 4.
2. Performance > Search results > + Add filter > Query > Non-branded. Date: last 28 days, Compare to the previous 28 days. Record clicks, impressions, CTR, position.
3. Repeat with Branded. Record the same four numbers. Write both rows to the weekly sheet.
4. Fallback (filter missing): Query filter > Custom (regex) > "Doesn't match regex" with the brand pattern for non-branded, "Matches regex" for branded. Note in the sheet which method was used, because the AI classifier and a regex give different numbers; never compare across methods.
5. Annotate every deliberate change on the day it ships: "v1.4 e-book page titles rewritten", "sitemap resubmitted", "YouTube Short with /ebooks/ link posted", "press piece published". Keep each under 120 characters, no names of private people, no case details.
6. When a line moves, read the annotation nearest the turn before drawing a conclusion. If there is none, write "cause not checked" in the report rather than guessing.

## Reading the numbers
- Non-branded clicks rising = SEO and content are finding new readers (the goal for e-book discovery).
- Branded rising with non-branded flat = word of mouth, social posts and press are working; SEO is not.
- Both flat while total impressions rise = mostly AI/image surfaces; check the Generative AI report (separate skill: search-console-generative-ai-performance-report.md).

## How we apply it to Cedwyn
- Brand regex for the fallback (internal only, never published): (?i)cedwyn|great ?house ?farm|t[yŷ] ?mawr|bucklerfamily  . Test it on 90 days of queries first and drop any term that pulls in unrelated searches (e.g. other "Ty Mawr" houses in Wales); keep the dropped terms listed in the sheet.
- The property to use is the bucklerfamily.estate domain property; cedwyn.bucklerfamily.estate is a subdomain, so a subdomain-only property will not show the filter. Filter by Page contains "cedwyn." inside the domain property to isolate Cedwyn.
- Add two columns to the project workspace and growth-report/weekly.csv: nonbranded_clicks, branded_clicks (+ method: filter|regex). The Sunday growth report quotes the non-branded number as "new readers from Google search".
- Annotation discipline for the flywheels that change pages (onpage, daily site flywheel, version standard, traffic flywheel): one annotation per shipped batch, written by the worker that shipped it. Annotation write needs the UI (no API found in the posts read); if no browser session is available, log the line to the project workspace for the next browser run.
- Never put case wording, institution names or banned words in annotations: other property users can read them.

## Sources
- developers.google.com (read; update line 11 Mar 2026)
- developers.google.com (read)
- seomatic.ai (read)
- searchengineland.com (snippet only; page did not render here)