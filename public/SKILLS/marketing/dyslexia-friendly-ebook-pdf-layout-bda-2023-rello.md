# Dyslexia-friendly e-book and sample PDF layout (BDA 2023 + eye-tracking studies)

Harvested 7 Nov 2026 (skills harvest). Topic gap: the index had plain-English copy and line length, but nothing on type size, face or styling inside our own PDFs/EPUBs.

## What the evidence states (read)
- BDA Dyslexia Style Guide 2023 (PDF read): sans serif (Arial, Comic Sans; also Verdana, Tahoma, Century Gothic, Trebuchet, Calibri, Open Sans); body 12-14 pt print or 16-19 px screen, some readers want larger; letter spacing ~35% of average letter width; word spacing at least 3.5x letter spacing; line spacing 1.5-2x; no underlining or italics (use bold); no ALL CAPS for running text; headings at least 20% larger than body; left-aligned, NOT justified; no multiple columns; 60-70 characters per line; dark text on cream/soft pastel, not pure white; avoid green and red/pink; short sentences, active voice, bullets, a contents list in long documents.
- Rello & Baeza-Yates, ACM TACCESS 8(4) 2016 (read): eye-tracking, 97 people (48 with dyslexia), 12 fonts. Sans serif, monospaced and roman (non-italic) faces read significantly faster than serif, proportional and italic, for readers WITH AND WITHOUT dyslexia. Best: Helvetica, Courier, Arial, Verdana, CMU. Arial Italic should be avoided.
- Rello, Pielot & Marcos, CHI 2016 "Make It Big!" (abstract/snippets): 104 readers on Wikipedia; readability and comprehension rise with size up to 18 pt on screen; line spacing showed no significant effect. Title of the dyslexia follow-up: "18 points for a dyslexic-friendly Wikipedia".
- Zorzi et al., PNAS 2012 (snippets; not re-read in full): extra-large letter spacing in children with dyslexia ~doubled accuracy and gave >20% faster reading, a gain of ~0.3 syllables/s, about one school year of progress.
- What does NOT work: OpenDyslexic, Wery & Diliberto, Annals of Dyslexia 2017 - no improvement in rate or accuracy; Dyslexie font, Kuster et al. 2018 (170 children) - no benefit beyond its extra spacing. So: never buy or ship a "dyslexia font"; spacing and size do the work.
- Scale: GDS and the BDA put dyslexia at roughly 10% of the UK. A layout that helps them is faster for everyone else too (Rello 2016).

No conversion or sales study exists for this; treat it as product quality and accessibility (pairs with eaa-epub-accessibility-metadata-ebooks.md), not a promised uplift.

## How to do it
1. Measure the PDF: `timeout -k 5 120 python3 tools/pdf_type_check.py FILE.pdf --pages 8` (our script, pypdf already on the box). It reports body size, size mix, fonts, italic/serif/caps share, page size, and flags against the guide. It cannot see justification, spacing or colour: check those by eye at 390 px.
2. Screen PDF edition ("Easy-read / large-print PDF"): sans serif (Atkinson Hyperlegible, Verdana, Open Sans or Arial; all free), body 14 pt on an A5/6x9 page (renders ~18 px on a phone zoomed to width), line height 1.5, letter-spacing +0.03-0.05 em, ragged right, single column, headings +20% bold, cream background (#FAF6EC) with text #1A1A1A, emphasis in bold, quotations as indented blocks not italics.
3. EPUB: never hard-code font sizes or justification; leave text-align to the reader app, set `line-height:1.5`, no `font-style:italic` on whole paragraphs, real headings and a nav TOC so readers can switch to their own font.
4. Copy: sentences ~15-20 words, active voice, glossary for record terms (tithe apportionment, enclosure award, conveyance), dates and references in plain form.
5. Offer it as a free variant inside the same purchase (no extra price), and say so in the accessibility summary metadata.

## How we apply it to Cedwyn
- Measured 7 Nov 2026 on patches/samples-v1.1-2026-11-07: cedwyn-sample-ch1-v1.1.pdf and tymawr-heritage-sample-ch1-v1.1.pdf both FIX: page 391x612 pt, body 10.5 pt, captions 8.5-9 pt, Source Serif 4 on ~97-98% of text, italics 2.6-4.5%. On a phone zoomed to width that is small serif text.
- Do not restyle the main edition's print look on our own say (P-131 / owner-edited files). Instead build an "Easy-read PDF" variant of each sample first, same words, the step-2 spec; ship it beside the current sample as a second download link, labelled "Easy-read (larger, sans serif)". Then the same for paid e-books as an included extra.
- Captions under 9 pt: raise to 11 pt minimum in both editions (lowest-risk change).
- Bilingual pages: keep Welsh and English in separate blocks, not side-by-side columns (BDA: no multiple columns); bilingual_check.py still applies.
- Name the variant in one sentence of the accessibility summary (schema:accessibilitySummary; see eaa-epub-accessibility-metadata-ebooks.md).
- Measure: downloads of each sample variant via /r/ links (campaign beacon); keep it only if it is chosen at all; it costs nothing to keep.
- Banned public words and naming rules apply to any page copy announcing it.

## Sources
- bumc.bu.edu (BDA Dyslexia Style Guide 2023, read)
- superarladislexia.org (Rello & Baeza-Yates 2016, read) / dl.acm.org
- pielot.org (Rello, Pielot, Marcos CHI 2016; abstract and snippets)
- pnas.org (Zorzi 2012; snippets)
- link.springer.com (Wery & Diliberto 2017, OpenDyslexic)
- link.springer.com (Kuster 2018, Dyslexie font)