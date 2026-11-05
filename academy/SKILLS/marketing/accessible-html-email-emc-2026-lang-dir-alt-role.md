# Accessible HTML email: fix the 10 machine-checkable failures (EMC 2026 data)

Added 2026-11-05 by the skills harvest. Topic: HTML email design / deliverability hygiene. 'accessible email' had 2 hits in INDEX.md before (both only as "next lead" notes); no file covered it.

## The evidence (primary, read 5 Nov 2026)
- Email Markup Consortium, Accessibility Report 2026 (last modified 21 May 2026; data May 2025-May 2026, 376,348 emails, with Parcel.io and Flourish): 99.88% had "Serious" or "Critical" accessibility defects. Only 8 emails (0.002%) from 3 brands passed every automated check. 2025 report: 443,585 emails, 99.89% failing, 21 passed.
- Newsletter platforms in that audit: 10,566 emails from Substack, Shopify Email and Beehiiv, and none passed. 100% of Substack and Shopify mails lacked lang/dir inside the body. 99.96% of Substack mails failed contrast, and 97.37% had a link with no text (usually a linked image with no alt).
- Email clients: no client supports all 37 accessibility features they tested. Best were Apple Mail macOS 34/37, Samsung Email 31/37 and Proton 29/37. Many clients strip `<html lang>`, which is why the lang and dir attributes have to be repeated inside the body.
- Litmus "Ultimate Guide to Email Accessibility in 2026" (read): colour blindness affects 8% of men and 0.5% of women, and dyslexia about 15% of people. A good email layout survives text zoomed to 200%.
- Caveat: nobody has published a controlled test showing accessibility fixes raising clicks or sales. Treat this as hygiene that reaches more readers and removes failure modes (images off, screen readers, dark mode, translation tools). It is not a conversion hack.

## Top 10 failures, share of emails affected (EMC 2026), and the fix
1. No `dir` on the body's direct children (97.41%). Fix: `<div dir="ltr" lang="en-GB">` wrapping all content.
2. No `lang` on the body's children (95.66%). Fix: the same wrapper. Use `cy` for Welsh blocks and `es` for Spanish blocks, set on the block itself. `lang="und"` is the fallback when the language is unknown.
3. Layout tables without `role="presentation"` or `role="none"` (83.78%). Fix: add the role to every layout `<table>`.
4. No `<h1>` (74.23%, mild). Fix: put one h1 around the email's real headline.
5. Links with no discernible text (71.23%). Fix: a linked image is functional, so its alt text must say where the link goes, e.g. "Cover of the e-book (opens the shop page)".
6. No `<html lang>` (62.16%). Fix: `<html lang="en-GB">`.
7. Contrast below 4.5:1 (58.48%). Fix: dark text on a light background, with no grey-on-grey footers. Check dark mode too.
8. Images without an alt attribute (47.88%, critical). Fix: always include alt. Use `alt=""` only for purely decorative images.
9. No `<title>` (45.21%). Fix: `<title>` set to the subject line. It shows in the web version and in some clients.
10. Vague link text such as "click here" or "read more" (15.83%). Fix: say the destination, e.g. "Read the Tithe chapter free".

Also from Litmus: use live text instead of text baked into images, at least 14-16 px body text, left alignment, short paragraphs, and a plain-text part. Avoid using colour alone to show meaning.

## How to run it (about 15 minutes per template)
1. Export the campaign or template HTML. In Mailchimp: Campaign > Preview > "Get HTML" or "Export as HTML". Or use the campaign archive page once something is published.
2. `timeout -k 5 120 python3 the project workspace <file-or-url>`. This is our own stdlib script, nothing installed. It checks items 1-6 and 8-10, and was tested on a failing sample (9 issues found) and a fixed sample (PASS).
3. For contrast (item 7) and a second opinion, use Parcel's free web accessibility checker (parcel.io, in the browser, no install).
4. Fix the template once in the saved template or design system so every later send inherits the fix. EMC's point: the teams that pass have fixed their shared components.
5. Send a test and check it in Apple Mail and Gmail with images off. Every image should still make sense from its alt text.

## How we apply it to Cedwyn
- The Mailchimp audience (DATRO Consortium Ltd list, us3) has **no published campaigns** in its public archive as of 5 Nov 2026. So the cheapest moment is now: make the **saved template** and the **welcome automation** pass before the first broadcast, rather than retrofitting.
- Language: Cedwyn writes in en-GB, with Welsh place names and occasional cy/es blocks (the Argentina side). Set `lang="en-GB"` on `<html>` and on the wrapper div. Wrap any Welsh sentence in `<span lang="cy">` and any Spanish one in `<span lang="es">` so screen readers and translation tools pronounce them correctly. This matters more for a bilingual heritage list than for most senders.
- Cover images and the shop button: alt text should name the book and the destination, e.g. "Tŷ Mawr records e-book cover (opens /ebooks/)". Never leave a linked cover with no alt. That is the 71% failure, and in Substack's case 97%.
- Evidence screenshots in emails, such as maps or scanned records: give a one-line alt text with the record id and date. Put the full description on the linked evidence page, not in the alt.
- The footer's legal line and unsubscribe link must meet 4.5:1 contrast. Light grey footers are the usual failure, and an unreadable unsubscribe link also hurts complaint rates.
- Run the checker as one gate in the existing pre-send QA (next to the link/UTM checks), and record the result in the campaign log line.
- Editorial rules still apply to alt text: it is public text, so no banned words and no names.

## Sources
- emailmarkup.org (read 5 Nov 2026)
- emailmarkup.org (search snippet: 443,585 emails, 99.89%, 21 passed)
- litmus.com (read 5 Nov 2026)
- css-tricks.com (snippet only)
- Live check: us3.campaign-archive.com returned "No email campaigns published yet" (5 Nov 2026 ~11:45Z)