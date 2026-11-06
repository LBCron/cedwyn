# Ask the Archive

The Ask the Archive webapp of [cedwyn.bucklerfamily.estate](https://cedwyn.bucklerfamily.estate/chat/), in its own repository
(webapp migration 59+1, issue #188 on unclehowell/cedwyn).

Split out of `unclehowell/cedwyn` branch `section/chat` on 5 Nov 2026. That repository holds about 300 branches; a job on one webapp
should never need the rest.

## Get the code

```
git clone --depth 1 https://github.com/unclehowell/cedwyn-chat.git
```

## Where to send changes

`split-repos.json` on `unclehowell/cedwyn` main sets the mode:

- **mirror** (now): the old branch `section/chat` is the source. `mirror.yml` copies it here every 30 minutes. Send pull requests to `section/chat`.
- **split-repo** (after the owner switches it): this repository is the source; unclehowell/cedwyn copies `main` back into `section/chat`, so the
  live page and every old path keep working.

`SPLIT.json` records the source commit of the last copy; the app's own notes, if any, are in `APP-README.md`.

## Preview

Cloudflare Pages project `cedwyn-chat` builds every branch and pull request: https://cedwyn-chat.pages.dev/

## History before the split

https://github.com/unclehowell/cedwyn/commits/section/chat

Never force-push; never delete the old branch.
