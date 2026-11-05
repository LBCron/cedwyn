# Email dark mode: the three client behaviours and a contrast check for our templates

Harvested 2026-11-05. Lead from the 09:11Z run ("contrast check for dark templates"). The site file dark-mode-prefers-color-scheme-no-flash.md covers web pages. This one covers email clients, which behave differently.

## Numbers (Courier, "Dark mode email design", 2026, citing Litmus July 2026 market share, >1bn opens)
- Opens by client: Apple 62.26%, Gmail 27.03%, Outlook 5.83%. Dark mode is used by **more than 25%** of readers. Outlook's share runs several times higher on business and institutional lists.
- There are three behaviours:
  - **No change:** Apple Mail without dark styles, Gmail desktop web, Yahoo, AOL.
  - **Partial inversion:** Outlook.com, new Outlook, Outlook mobile, Gmail Android. Light backgrounds go dark and dark text goes light. Elements that are already dark stay as they are.
  - **Full inversion:** classic Outlook on Windows, Windows Mail, Gmail iOS. Every colour is rewritten, button fills included.
- Measured case study (Courier): text #111111 on brand red measured **4.65:1**. Gmail Android flipped it to white on the same red, **4.07:1**, so it became less readable in dark mode. A #111111 header bar disappeared against the darkened page. A photo with a cream backdrop became a bright slab.

## Client rules that matter
- **Apple Mail** follows `@media (prefers-color-scheme: dark)` only after an opt-in. Ship both `<meta name="color-scheme" content="light dark">` and `<meta name="supported-color-schemes" content="light dark">`, plus `:root{color-scheme:light dark}` (email-bugs #104, Rémi Parmentier). Inside the media query, use #fffffe and #0e0e0e, never #ffffff or #000000 (email-bugs #65). A missing background colour is the most common Apple failure: grey #333 text ends up on the app's black background.
- **Gmail** supports none of it: no prefers-color-scheme, no color-scheme, no light-dark(). It applies its own transformation. It has been seen **lightening emails that were already dark** (email-bugs #68, a Netflix email) and filtering PNG artwork. Plan for a palette that still reads after rewriting. Don't try to control Gmail.
- **Outlook.com** recolours any element **below 4.5:1 against its dark background**, and stores the originals in data-ogsc, data-ogac, data-ogsb and data-ogab attributes (selectors like `[data-ogsc] .x`, repeated on each selector).
- **Classic Outlook (Windows)** cannot be controlled: `!important`, `color-scheme: light only` and mso conditionals all fail (Microsoft Q&A). Readers have a sun/moon toggle and a "never change message background" setting. Put the effort into the light design.

## Routine for each template (15 minutes)
1. Run `python3 the project workspace --html template.html` (stdlib, 0 bytes installed). It flags inline text/background pairs under 4.5:1, text colours under 4.5:1 against a dark app background (#1e1e1e), pure #ffffff or #000000, and a missing color-scheme opt-in. For a single pair: `contrast_check.py '#fff' '#c8102e'`.
2. For the brand colours, check both the light pair and the inverted pair: dark text on the colour, and white text on the colour. Choose fills where **both** pass 4.5:1, or treat that text as large (3:1 at 24px, or 18.66px bold).
3. Logos and quote cards: use PNGs with a transparent background and a light stroke or halo, or a solid backdrop panel that was designed on purpose. No cream-on-image slabs.
4. Free external check: **Parcel's accessibility checker**, which includes a WCAG 2 AA contrast rule (4.5:1 normal, 3:1 large; it checks gradient fallbacks, not background images). It is available on Parcel's **free Community plan** (EMC 2024 report). It is the same checker the EMC accessibility reports use. Paste the HTML and read the Accessibility tab. It is a web tool, so nothing is installed. Parcel's terms apply. Never paste a real subscriber's personal data.
5. Real-device look: send a test to an iPhone (Apple Mail plus the Gmail app) in dark mode, and to Outlook.com. Screenshot at 390 px.

## How we apply it to Cedwyn
- The **site** rule is a dark background with no white. Copying that palette into **email** is risky: Gmail may lighten a dark email, and Outlook.com recolours anything under 4.5:1. Keep the newsletter **light-authored**: off-white #fffffe panel, near-black #1a1a1a text, one accent colour. Add a `prefers-color-scheme` block for Apple Mail that reproduces the site's dark look, and opt in with both notations.
- Tŷ Mawr (Great House) cover images and quote cards: export them with a deliberate dark or parchment backdrop panel and a 1px light border, so they read as framed artefacts after inversion and not as floating slabs. Keep quoted record lines as **live text** (accessibility file) so they invert cleanly.
- Run contrast_check.py on the Mailchimp template HTML (Campaign > Export as HTML) before the next send. Log the PASS/FAIL count in the project workspace beside the email_a11y_lint.py result.
- Institutional readers (archives, councils, museums) mostly read in Outlook. Test Outlook.com dark mode first for any HTML mail to them. Plain-text Gmail correspondence avoids the problem entirely.

## Sources
- courier.com (read 2026-11-05; Litmus Jul 2026 figures quoted there)
- parcel.io (read), parcel.io
- emailmarkup.org (read: checker on free Community plan)
- litmus.com (snippet)