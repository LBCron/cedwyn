# Changelog

## v0.4.0 (3 Nov 2026)
H3 resolution picker: 8, 10, 11, 12 (default), 13, 14, 15. Resolution 15 is the finest the H3 grid has (about 0.9 m² a cell); there is no resolution above it. Resolution 8 keeps the cell holding each parcel's centre. From 10 up, cells are generated in the browser with h3-js 4.5.0 (polygonToCells, vendored) for the map area in view only, never stored; a cell is drawn when its centre falls inside a parcel outline (centroid-in-polygon), in that parcel's traffic-light colour. Work is capped at about 20,000 cells; past the cap, and below zoom 17 (res 14) or zoom 19 (res 15), a "Zoom in to see res N" prompt shows with a zoom button. The map zooms to 21 (tiles scaled past their own zoom). Tapping a parcel names the hexagon under the tap at the chosen resolution.

## v0.3.0 (3 Nov 2026)
Traffic-light layer, on by default with a switch in the layer bar. Red: every parcel on the c.1824 estate plan of Cedfin alias Ty Mawr. Amber: land with a possible link that is not established: Parcel B (plan 5 and 6, over 1841 tithe 193; match not checked), Leckwith Common and the playing fields (City of Cardiff (Leckwith Common) Compulsory Purchase Order 1957, confirmed 1958; extent not yet located, so a guide pin marks today's Leckwith Moors park), Parcel C (no boundary held; not drawn). Green: Parcel A (plan parcels over 1841 tithe 209, 211, 219, 220: house and yard, orchard, wood strip, field; a working match). Legend wording: family-associated land, a working classification, not a legal finding. Parcel popups and the table carry the light.

## v0.2.0 (2 Nov 2026)
Re-aligned to today's ground. The whole layer (parcel outlines, centres, both old-map overlays) was moved by one affine correction fitted to seven control points on OpenStreetMap (St Dochdwy's church, the Cwm Cydfin stream mouth at the Ely, the Ely meander tip round plot 216, the Ely's north-west bend and first bend, the Cwm Cydfin stream curve, a field boundary on Penlan Road): about 86 m RMS out before, about 7 m RMS after. The correction scales the layer by about 1.16 and turns it about 5°, so traced areas now total about 140 acres against 139a 3r 8p on the plan (before: 105). OS grid references and the H3 cells (res 8, 11, 12) were regenerated from the moved outlines. The (i) button opens the changelog table.

## v0.1.2 (2 Nov 2026)
The page shows at /tithe-h3/ (Online) as well as /wales/tithe-h3/; it stays hidden in the Argentina scope. On /wales/tithe-h3/ the header showed the Wales hub's name and number because this webapp is not yet in the area registry; the page now writes "Tithe H3" and "42 of 59" there too, and stands down once the registry carries slot 42.

## v0.1.1 (2 Nov 2026)
The "42 of 59" number moves into the header's own numbering slot (the in-page line under the header is removed). The header's third row (the e-book "Read free" strip) is hidden on this webapp; only the shared Garden banner may use that row. The street map uses the site's shared OpenStreetMap tile template.

## v0.1.0 (2 Nov 2026)
First version.
