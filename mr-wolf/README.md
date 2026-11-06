# Mr Wolf

The Mr Wolf webapp of [cedwyn.bucklerfamily.estate](https://cedwyn.bucklerfamily.estate/mr-wolf/), in its own repository
(webapp migration 59+1, issue #188 on unclehowell/cedwyn).

Split out of `unclehowell/cedwyn` branch `section/mr-wolf` on 5 Nov 2026. That repository holds about 300 branches; a job on one webapp
should never need the rest.

## Get the code

```
git clone --depth 1 https://github.com/unclehowell/cedwyn-mr-wolf.git
```

## Where to send changes

`split-repos.json` on `unclehowell/cedwyn` main sets the mode:

- **mirror** (now): the old branch `section/mr-wolf` is the source. `mirror.yml` copies it here every 30 minutes. Send pull requests to `section/mr-wolf`.
- **split-repo** (after the owner switches it): this repository is the source; unclehowell/cedwyn copies `main` back into `section/mr-wolf`, so the
  live page and every old path keep working.

`SPLIT.json` records the source commit of the last copy; the app's own notes, if any, are in `APP-README.md`.

## Preview

Cloudflare Pages project `cedwyn-mr-wolf` builds every branch and pull request: https://cedwyn-mr-wolf.pages.dev/

## History before the split

https://github.com/unclehowell/cedwyn/commits/section/mr-wolf

Never force-push; never delete the old branch.
