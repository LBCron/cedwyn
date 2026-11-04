# Photo hunt across public photo archives

A repeatable crawl of every public photo archive for pictures of the estate's area, scored so the few real finds rise above thousands of nearby hits. First full run 3 Nov 2026: 2,731 photo records across 9 archives, of which 4 show the farm itself.

## Sources (public interfaces only)
| Source | How | What it gave |
|---|---|---|
| Wikimedia Commons | geosearch around several centres plus file search | most hits; few dated before 1990 |
| Geograph | syndication feed, nearest-first and keyword-near | mostly 2005 onward |
| People's Collection Wales | keyword search, then each item page for place and date | the only true farm photos so far; some records store west longitude without a minus sign, so fix the sign before measuring distance |
| Britain from Above (aerial, 1919-2006) | keyword search plus image pages | inter-war obliques of the area, none of the farm itself |
| Coflein | the site record's archive items flagged as photos | the record's list runs to several pages; read them all |
| Flickr | public tag feeds | modern; a map search needs an API key |
| Europeana, Internet Archive | API search | little or nothing relevant |
| Cambridge air photos | saved catalogue file | catalogue entries only; scans are ordered from the collection |
| RAF aerial archive, national library catalogue, Francis Frith | none by script | they serve a bot check: search by hand |

## Rules
- Public interfaces only: no logins, never bypass a refusal or a bot check; those sources become a manual search task.
- Keep thumbnails only (240 px or less) and the record link; never re-host full images.
- Never search the family surname on its own.
- Flag confusable places automatically: "Llandough Farm" is not Great House Farm, and Llandow is a different place (down-rank it).

## Scoring
Farm named in the record +100; distance under 300 m +50, under 1 km +30, under 2.5 km +10; dated before 1989 +40 (undated +8); aerial +15; the wrong Llandough or Llandow -80. Each re-run writes a diff of records not seen before; that diff is the report.

## What it taught
A catalogue entry is not a picture: when a frame exists only in a catalogue, the next step is a scan order, logged as a task, not a claim that the picture exists online.
