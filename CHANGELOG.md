# Changelog

## [3.6.1] - 2026-11-05

### Changed
- App-first first screen: on load, only the header, the parcel dropdown and the diagram show. The introduction, the note on the 1824 Stewart plan parcel figures (including the unsettled 30-39 / 50-59 readings) and the title-chain link moved into a collapsed section under the diagram (steps list and caption likewise; replay opens the steps). Wording unchanged. The diagram is capped to the screen height. The shared Garden banner is not loaded on this page only (a page flag the banner script already honours); header and navigation unchanged.

## [3.6.0] - 2026-11-04

### Added
- A parcel dropdown, numbered 1-59, replacing the line-picker chips. Numbers are the parcel figures read on the 1824 Stewart plan of Cedfin (Tŷ Mawr). Each number opens a record sheet: the figure reading, the matching 1841 tithe plot with its entries as transcribed in the site's Tithe H3 index (land use, area, landowner, occupier), OS grid reference and traced area. Numbers 1-4 and 18 note the unread figures and the homestead group.
- The 30-39 / 50-59 readings are presented as unsettled: several southern figures can be read either way (old-style 3 or 5), so both readings are listed and numbers 46-59 stay in the dropdown with the ambiguity stated rather than a categorical exclusion. Parcel 33 carries the open unnumbered-8a-row conflict from the research register.
- Each sheet links the farm's documented chain (Bute -> Mountjoy -> Western Ground Rents -> BP Pension Trust -> BP Properties -> 1982/83 first registrations -> 1986/87 judgment) with a link to /title-chain/, scoped as farm-level, not parcel-tied.
- Record sheets now trap keyboard focus and make the background inert while open; the dropdown keeps the picked parcel selected; ?parcel=N deep links open the sheet directly.
- `public/data/stewart-parcels.json`: the per-parcel data, from the site's own Tithe H3 parcel table (`/tithe-h3/data/stewart-parcels.csv`); which plan parcel matches which tithe plot remains our reading, and the tithe records occupation, not ownership.
- `?parcel=N` opens a parcel's record directly.

### Changed
- The ring now draws every line on load; narration starts from the replay button. The line-filter chips are removed in favour of the parcel dropdown. Audio and animation paths unchanged (3.3.3).

## [3.5.0] - 2026-10-27

### Changed
- Parcel A in three parts, from the family's boundary plan: A1 the north wood (OS 1900 field 45), A2 the farmhouse, yard and buildings (south part of field 70), A3 the garden and orchard (north part of field 70, with the strip west to the road as its access). A3 is marked "title not traced"; the 1959 offer and the 1962 possession order name the garden with the farmhouse and buildings. The green keeps its own entry outside Parcel A, and its labels no longer call it A3. Animation paths and narration audio unchanged (3.3.3).

## [3.4.1] - 2026-10-27

### Fixed
- Parcel A boundary: Parcel A is the farmhouse, yard, buildings and woodland. On the family's boundary plan the Parcel A line ends before the green begins, so the green is no longer shown as a third of Parcel A. The green (village green VG41, registered by Glamorgan County Council in 1970) is shown as separate ground, outside Parcel A. A1/A2 now read "north part" / "south part"; A3 is relabelled "The green · VG41 (outside Parcel A)". Narration audio unchanged.

## [3.4.0] - 2026-10-25

### Added
- `title-chain/`: an animated, step-by-step title chain (Bute → Mountjoy → Western Ground Rents 1938 → BP 1969 → first registration 1982/83) beside the Williams occupation line, the twelve-year pairs (stacked from a common start) and the parcels taken. It reads the “title-chain” layer from the Cedwyn catalogue database (fallback: /research/layer.json); every step links to its catalogue ID. The courts’ view is shown first.
- A link to it above the circle diagram.

## [3.3.3] - 2026-10-24

### Fixed
- Align the embedded data, animation-path and audio cache version markers at `3.3.3` (they were inconsistent).
- Describe the 1877 Parcel A/B division as a proposed model pending a site-matched instrument, rather than a conclusively established split.
- Keep the known 1877 Clyde Street, Roath lease excluded from the Great House Farm title chain.

### Reviewed
- Preserved the existing case model and its cited records; this is a presentation/provenance clarification, not a legal finding.
