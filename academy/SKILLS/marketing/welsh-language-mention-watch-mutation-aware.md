# Welsh-language mention watch, mutation-aware (golwg360 + BBC Cymru Fyw + Google News cy)

Written 2026-11-04 by the skills harvest. Complements press-requests-and-mention-monitoring.md (English, Google Alerts) and tools/news_hooks.py (Google News en-GB). This one is for Welsh-language coverage, where a plain keyword watch misses mentions because Welsh changes the first letter of a word.

## Why the usual watch misses Welsh mentions
- Welsh has three initial-consonant mutations (Wiktionary Appendix:Welsh mutations, read 4 Nov 2026). Soft: c>g, p>b, t>d, g>(dropped), b>f, d>dd, m>f, ll>l, rh>r. Nasal: c>ngh, p>mh, t>nh, g>ng, b>m, d>n. Aspirate: c>ch, p>ph, t>th.
- So "to Llandough" is "i Landochau", "in Tŷ Mawr" is "yn Nhŷ Mawr", "to Tŷ Mawr" is "i Dŷ Mawr", "and Tŷ Mawr" is "a Thŷ Mawr", "from the Vale" is "o Fro Morgannwg". A watch for "Llandochau" or "Tŷ Mawr" alone never sees those forms.
- The circumflex is dropped in a lot of copy ("Ty Mawr"), so the match has to ignore accents.
- Wiktionary also notes a partial soft mutation: ll and rh stay unchanged after "y/'r" with feminine nouns, after "un" and after predicative "yn". So watch both forms. Never assume just one.

## Measured live, 4 Nov 2026 12:3xZ (this box)
- Google News RSS with hl=cy&gl=GB&ceid=GB:cy: "Llandochau" 1 item, "Landochau" 0, "Lecwydd" 1 (an English BBC story), against "Llandough" 42 items. Welsh-language coverage of our place names is close to nil. A cy-only watch is a cheap tripwire, not a traffic source.
- golwg360 has a working feed at golwg.360.cymru (20 items, RSS 2.0). /rss, /feed and /rss.xml all return 404. The footer "RSS" link points to /ffrwd.
- The BBC Cymru Fyw feed is feeds.bbci.co.uk (37 items, lastBuildDate the same minute). The BBC Developer page lists the legacy news.bbc.co.uk which serves the same feed.
- Nation.Cymru (English) has a feed at nation.cymru (10 items). It is already covered by the English watches.
- First run of tools/welsh_mentions.py: 75 matches, all on base forms (Bro Morgannwg 43, Cedwyn 26, Tŷ Mawr 6). No mutated form matched in this window. "Cedwyn" and "Tŷ Mawr" are common Welsh names (people, farms and houses all over Wales), so most hits are other Cedwyns and other Tŷ Mawrs. Read before acting.

## How to do it
1. List the watch terms in Welsh: Llandochau, Lecwydd, Tŷ Mawr, Cedwyn, Bro Morgannwg, plus any person or estate name in the story. Pair each with its English form and keep the English one in news_hooks.py.
2. Run `python3 the project workspace --variants` to see the mutated forms. Then run `python3 the project workspace --csv a temporary folder/cy.csv`. It reads golwg360, BBC Cymru Fyw and one Google News cy query per term, matches whole words with accents ignored, and waits 1.2 s between calls. It uses the standard library only and installs nothing.
3. Raise a hit only when the place AND a second anchor appear together (Llandochau + fferm/ffermdy/hanes/tir, or Tŷ Mawr + Llandochau). A bare "Tŷ Mawr" is noise.
4. For a real hit: save the URL plus an archive.org capture. Log it as a dated line in the mention log. A Welsh-language outlet that covers the area is a pitch target, so add it to welsh-language-media-papur-bro-golwg360-heno.md and draft only on the project lead's GO.
5. Mutations work in reverse too. When we write Welsh copy (golwg360 pitch, papur bro piece), use the correct mutated form after i/o/yn/a. Wrong mutation is the fastest tell of a non-native writer to a Welsh editor.

## How we apply it to Cedwyn
- Add welsh_mentions.py to the press/mention watch as a weekly run next to news_hooks.py. Its terms: Llandochau, Lecwydd, Tŷ Mawr, Cedwyn, Bro Morgannwg. Only two-anchor hits are surfaced.
- Use the 1-vs-42 count as a fact for the Welsh-language PR plan. Golwg360, Cymru Fyw and the papur bro have not covered Llandochau recently, so the first Welsh-language piece is a genuine gap, not a crowded beat. That is a pitch angle, sent only on the project lead's GO.
- Welsh copy on the site (cy pages, Patagonia material) gets a mutation check before publishing. The tool's --variants output is the check list.

## Sources
- Wiktionary, Appendix:Welsh mutations (radical/soft/nasal/aspirate tables, partial soft mutation), read 4 Nov 2026: en.wiktionary.org
- BBC Developer, Welsh Language News Feed: support.bbc.co.uk . Feed read live: feeds.bbci.co.uk
- golwg360 footer RSS link, read live: golwg.360.cymru
- Google News RSS search, hl=cy, queried live 4 Nov 2026 (counts above)