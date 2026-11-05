# Arcade flower gallery split

The Arcade shell has two views: NFT flower gallery and cyber games. The Flower Garden is a separate app at `/garden/`, registered as editorial slot 47. Neither slot numbers nor generated artwork establish historical geography.

The shared `web/_cedwyn/flower-gallery/artworks.json` contains 94 existing AI flowered exterior first editions and 40 restored nonflowered AI interiors from the nft-art source branch at commit 34a068d. The original source images and seven nonflowered map/plan pieces are not displayed in either app. The 40 interiors use only their existing restored v0.0.2 editions; their flowered first editions are not offered. Source catalogue identifiers remain text.

Gallery UI assets are under `web/_cedwyn/flower-gallery/`. Both app entry points are copied by the central main build after source assembly. Existing artwork files are resolved after rewrite through the build’s `_blob_map.json` when deduplicated; a missing curated file fails the build. None is duplicated or generated. The standalone Garden has no edition/download commerce controls. The NFT view keeps a single existing selected version and PNG download, with sales still disabled. No minting or checkout was added.

Arcade waits for iframe load and offers a direct-opening fallback after 15 seconds. Gallery data loading has a visible spinner, a failed-load retry, and waits for the first row image decode. Reduced-motion settings stop the spinner.

Run `python3 tools/test_arcade_flowers.py` and `node --check web/_cedwyn/flower-gallery/gallery.js`. Full central build and deployed route checks remain required for release.

Source: existing Garden Gallery catalogue at nft-art commit 34a068d; curated records in `web/_cedwyn/flower-gallery/artworks.json`.

The final catalogue serving pass keeps all curated image/thumb targets as static files for first visits and PNG downloads, and fails if any target is missing after serving preparation.

The NFT iframe loads the same shared GHF theme CSS/engine as the standalone Garden and follows its parent ghf-theme-change event. Garden standalone theme behavior is unchanged.

Only the Arcade output pins native-auto theme handling, avoiding double inversion of its dual-scheme shell. Shared wiki/reference templates are unchanged. The framed gallery hides duplicate bars and uses neutral night text for contrast.
