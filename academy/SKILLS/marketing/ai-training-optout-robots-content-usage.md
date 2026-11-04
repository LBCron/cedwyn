# AI training opt-out vs AI visibility: robots.txt Content-Usage / Google-Extended (2026)

Topic: AI visibility (GEO). How the new shared AI-training control in robots.txt works, and why a site that WANTS to be cited by AI assistants should not switch it on by accident.

## What the primary sources state (read 4 Nov 2026)
- Google Search Central blog, 30 Oct 2026 (John Mueller): Google plans to support a shared AI-training "policy token" in robots.txt, based on the IETF AIPREF working group. If a site uses it to opt out of training and does NOT explicitly name Google-Extended, Google will treat it as if Google-Extended were disallowed. Company-specific controls keep working alongside it. "Websites that specifically allow Google-Extended are eligible to appear in responses and receive clicks via grounding in Gemini Apps." Target: support "along with other AI providers in 2027". Cites the EU GPAI Code of Practice recognising robots.txt as the primary machine-readable method.
- IETF draft-ietf-aipref-attach-05 (Illyes, Google & Thomson, Mozilla; 19 Aug 2026; expires 20 Feb 2027) defines the syntax, both as an HTTP header and a robots.txt rule:
    User-Agent: *
    Allow: /
    Content-Usage: train-ai=n
  Rules are per crawler group, may carry a path (longest matching prefix wins, as for Allow/Disallow), and apply only to paths that may be crawled; a disallowed path carries no preference.
- IETF draft-ietf-aipref-vocab-08 (14 Sep 2026): categories include train-ai (AI Training), ai-use, and search; e.g. "train-ai=y, search=n". The search category covers showing a result that links to the original location with excerpts; it does NOT include using assets to generate summaries.
- Both are Internet-Drafts, not RFCs; crawler support is announced, not yet in force (Google: 2027).

## The decision rule
1. If the aim is to be read, quoted and linked by AI assistants (our aim), do not add Content-Usage: train-ai=n and do not disallow Google-Extended, GPTBot, ClaudeBot, PerplexityBot etc. An opt-out written for "training" will, per Google, also remove eligibility for Gemini grounding clicks.
2. If a specific folder must stay out of training (e.g. drafts, private scans), use a path-scoped rule in the relevant group rather than a site-wide one:  Content-Usage: /private-scans/ train-ai=n  , and check that path is not one we want cited.
3. Re-check robots.txt after any CDN/host change: managed robots.txt features on some CDNs append AI-crawler blocks or content signals without a code change.
4. Verify monthly: fetch /robots.txt with a cache-buster and diff it against the committed copy; any new Disallow or Content-Usage line is a regression to fix, not a style change.

## How we apply it to Cedwyn
- Live check 4 Nov 2026: cedwyn.bucklerfamily.estate = "User-agent: * / Allow: / # AI agents: start at /academy/ (map: /llms.txt)". No Content-Usage line, no AI-crawler disallow. This is correct for our goal (AI assistants citing the e-books and evidence pages). Keep it.
- Add to the weekly VISIBILITY CHECK runner (the project workspace) one read-only step: fetch robots.txt for cedwyn., the apex and the e-books site; FAIL if any contains "Content-Usage" with train-ai=n or ai-use=n site-wide, or a Disallow for Google-Extended / GPTBot / ClaudeBot / PerplexityBot / CCBot. Report the line; never auto-edit robots.txt (owner-level decision).
- If the owner ever wants to keep raw archive scans out of training while keeping the e-book pages citable, the path-scoped rule above is the shape; propose it, do not ship it.
- Watch item for 2027: when Google ships support, re-read the Search Central post and the latest aipref-attach draft and update this file (date it).

## Sources
- developers.google.com (read)
- datatracker.ietf.org (read, -05)
- ietf.org (read)
- cedwyn.bucklerfamily.estate (fetched 4 Nov 2026)