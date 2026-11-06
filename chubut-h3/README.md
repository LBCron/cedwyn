# Chubut H3

The Chubut H3 map webapp of [cedwyn.bucklerfamily.estate](https://cedwyn.bucklerfamily.estate/chubut-h3/), in its own repository.

Split out of `unclehowell/cedwyn` (branch `section/chubut-h3`) as part of REPO SPLIT (issue #188). That repository holds hundreds of branches; a job on one webapp should never need the rest.

## Get the code

```
git clone --depth 1 https://github.com/unclehowell/cedwyn-chubut-h3.git
```

## Where to send changes

`split-repos.json` on `unclehowell/cedwyn` main sets the mode:

- **mirror** (now): the old branch `section/chubut-h3` is the source. `mirror.yml` copies it here. Send pull requests to `section/chubut-h3` on unclehowell/cedwyn.
- **split-repo** (after the owner switches it): this repository is the source; unclehowell/cedwyn copies `main` back into `section/chubut-h3` so live paths keep working.

`SPLIT.json` records the source commit of the last copy.

## History before the split

https://github.com/unclehowell/cedwyn/commits/section/chubut-h3

Never force-push; never delete the old branch.
