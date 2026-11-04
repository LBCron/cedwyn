# AI citation stability: judge AI visibility by "days cited out of 7", never one check

Source read in full (4 Nov 2026): Ahrefs, "How Stable Are AI Citations? 10 Things We Learned Tracking 37,500 Citations" (Mateusz Makosiewicz, data by Xibeijia Guan, 29 Oct 2026) ahrefs.com . Vendor study (Ahrefs sells Brand Radar); one 20-day window, no clicks measured, window dates not given. Cross-ref: keywordseverywhere.com (29 Oct entry).

## The numbers (same questions asked daily for 20 days, every site cited on day 1 followed)
| Tool | Questions | Gone by day 2 | Lasted 7+ days | Lasted all 20 |
|---|---|---|---|---|
| Google AI Overviews | 563 | 50% | 18% | 6.6% |
| Google AI Mode | 1,996 | 58% | 19% | 6.8% |
| ChatGPT | 3,173 | 59% | 13% | 4.0% |
| Gemini | 1,276 | 81% (58% if empty answers skipped) | 0.3% | 0.2% |
| Copilot | 823 | 83% (58% skipped) | 1.9% | 0.5% |

- ~75% of citations that dropped out came back within the 20 days; about half within 3 days. Only 20-27% vanished for good.
- Lindy effect: a citation that lasted 1 day never returned 34-41% of the time; one that lasted 8-14 days never returned only 0.7-4%.
- Brand-new citations: ~70% gone next day, only 34-45% of those returned.
- Gemini answers had no citations 64% of the time, Copilot 53% (ChatGPT/AIO/AI Mode under 1%).
- ChatGPT re-ran identical fan-out searches only 26% of days; even with identical searches the cited sites changed 81% of the time -> churn happens at the "which page to cite" step.
- What goes with longer-lasting Google-tool citations: ranking in Google, getting search traffic, a title that answers the question. Extra DR/backlinks beyond the basics did not.
- Their advice: brand MENTIONS are a steadier KPI than citations; track brand-fact questions, reviews and "best X" discovery questions as separate groups.

## How to do it (free, no tool)
1. Fix a question set and split it into 3 groups: (a) brand facts ("what is X / who runs X"), (b) reviews/opinion, (c) discovery ("best book on ..."). Keep the wording identical every run.
2. Ask each question on a schedule (daily is ideal; at least 3 different days a week) in each assistant you can reach.
3. Log per question per day: cited URL yes/no, brand mentioned yes/no, answer had any citations yes/no. Skip "no citations at all" answers when computing the rate (otherwise Gemini/Copilot look worse than they are).
4. KPI = days cited out of the last 7 (and days mentioned out of 7), per group. Never report a single-day result as a win or a loss.
5. A new citation counts as a win only after it has appeared on several days. A drop after a week-long run: wait 2-3 weeks before touching the page.
6. Persistent drop -> check the page's Google ranking/traffic and whether its title + first paragraph answer the question directly. Do not credit a page edit for one comeback.

## How we apply it to Cedwyn
- The weekly VISIBILITY CHECK (the project workspace) asks Grok 5 fixed questions once a week. PROPOSAL (not applied, owner of that runner decides): ask the same 5 questions on 3 separate days in the week (e.g. Mon/Wed/Fri inside existing runs) and record "cited x/3, mentioned y/3" in scores.csv instead of one yes/no; tag each question as brand-fact / discovery.
- Read a missing Cedwyn citation in one week's check as noise, not a regression; only a 2-3 week absence triggers an ONPAGE action.
- For pages we want cited (evidence catalogue, /ebooks/, research pages): question-shaped titles and a direct one-paragraph answer up top, which the study ties to longer-lasting citations; link-building beyond basics is not the lever.
- Report brand mentions ("Cedwyn", "Great House Farm Llandough") alongside citations in the Sunday growth report; they are the steadier number.
- Editorial rules still apply to any page change (banned words, no naming of the owner).