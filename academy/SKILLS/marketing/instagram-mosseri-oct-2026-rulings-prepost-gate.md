# Instagram: Mosseri's October 2026 rulings as a pre-post gate (scheduling, watermarks, AI labels, Trial Reels)

Topic: the dated answers Instagram's head Adam Mosseri gave in his Stories Q&As on 16, 23 and 30 Oct 2026, turned into a yes/no checklist that runs before any automated post. Signals background (watch time, likes, sends; carousels) is already in instagram-reels-carousels-heritage.md. This file adds only the October 2026 rulings.

## What he said (dated)
- **Scheduling is fine.** 23 Oct 2026: "No, scheduling a post is not going to hurt its reach. I schedule posts all the time."
- **Sends beat comments.** 23 Oct 2026: comments count, "but it's not the most important part of value by a long shot. We actually focus a lot more on finding reels and photos that you might send to a friend." Also: "more and more of the reach on Instagram came from recommendations."
- **Other editing apps are fine, watermarks are not.** 30 Oct 2026: content made in other apps (e.g. CapCut) is not demoted unless it carries a watermark. A video with another app's logo on it gets less distribution.
- **AI content is not throttled, but it should be labelled.** 16 Oct 2026: AI content is not throttled just for being AI. 23 Oct 2026: it is fine if people are interested and it is labelled.
- **Trial Reels: experiment freely, don't recycle.** 16 Oct 2026: "If you're just trying to experiment with lots of different reels and you want to use your trial reels a lot, that's totally fine." Re-posting the same reel as a trial again and again "is not okay. We're going to crack down on that." 30 Oct 2026: several different trial reels in one day are "totally fine".
- **Hashtags help search, not reach.** Undated in the write-up.
- **Metrics to track** (Colin and Samir interview): sends per reach, likes per reach, average watch time.

All of the above is from ZoomSphere's compilation (30 Oct 2026). It quotes his Stories with dates. I did not watch the Stories themselves: treat the wording as reported, and re-check if a rule matters for spend or a policy decision.

## The gate (run before every IG post or Trial Reel)
1. **Watermark scan:** no TikTok, CapCut or other app logo/end card in any frame. Exported masters only.
2. **AI label:** if any frame is generated or AI-altered (reconstructions, lip-sync, upscales that invent detail), switch on the "AI info" label. This matches ai-lip-sync-dubbed-documentary-disclosure-youtube-meta.md.
3. **Send test:** write one line, "who would send this, and to whom?" (e.g. "a Llandough local sends it to their sister who moved away"). No answer means rework the hook or the caption. Never "comment YES below" bait.
4. **Trial Reels:** each trial is a different cut (different hook, opening frame or length). Never re-trial the same file. Log the file hash per trial.
5. **Scheduling:** allowed. Pick the time from our own audience data, not from fear of the algorithm.
6. **Hashtags:** at most 3, chosen for search terms people type (place, period, record type). Hashtags are not a reach lever.
7. **Measure** per post: sends/reach, likes/reach, average watch time. Compare against the account's last 10 posts, not industry averages.

## How we apply it to Cedwyn (@cedwynestate, Great House Farm II page)
- **social.py (daily auto-social) and ig_post.py (quote pack):** add the gate as a pre-post check:
  - reject a video whose frames show a third-party logo;
  - set the AI label whenever the asset comes from a generator;
  - require a written `send_line` field in the post record.

  This is a code change to an existing runner, so it is a PROPOSAL for the next onpage/traffic run. Not applied here.
- **Quote cards:** these are period-record lines with a source line, the most "sendable" format we have. Prefer them as carousels over single images, in line with existing skills.
- **Documentary clips:** the scenes are AI-made, so every IG cut carries the AI label (Meta's policy). Hook variants go out as separate Trial Reels, never the same file twice.
- **Weekly growth report:** add sends/reach and likes/reach per IG post from Insights, alongside follower counts.
- Editorial rules still apply to captions: never name the owner publicly, banned words, Cedwyn internal links only.

## Sources
- zoomsphere.com (Jakub Mach, 30 Oct 2026; read in full 4 Nov 2026; quotes Mosseri's Stories Q&As of 16/23/30 Oct 2026 and the Colin and Samir interview)
- pepperagency.com (snippet only: confirms the scheduling answer)