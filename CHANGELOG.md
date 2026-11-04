# Changelog — Wales 3D world

| Version | Date | Change |
|---|---|---|
| 0.2.0 | 4 Nov 2026 | Always clear: weather menu, fog, haze and rain removed; camera far plane 12 km → 40 km, zoom-out 5.2 km → 9 km, so the whole 4 × 4 km area is crisp when zoomed out; H3 cell layer (res 10 / 11 / 12) and the Cedwyn estate plan parcels draped on the ground, each with its own show/hide box in Layers → Parcels (59), All / None, tap a parcel for its details; Whole estate view |
| 0.1.0 | 4 Nov 2026 | First real-terrain world (below) |

## 0.2.0 — 4 Nov 2026
- Clear sky only. The weather choice is gone; no fog, haze or distance fade at any zoom. The sun still follows the real time at Llandough when it is more than 12° up; otherwise the view opens at midday (Now restores real time).
- Camera: far plane 40 km with a near plane that follows the camera height; zoom out to 9 km; new Whole estate view; estate and parcel views look north like a map.
- H3 layer (on by default, thin white lines): res 11 over the estate and 300 m round it, res 10 the same box, res 12 inside the parcels. Cells from h3 4.x on the same parcel geometry as the Tithe H3 section.
- Parcels (59): plan numbers 1–59 of the c.1824 estate plan as traced in Tithe H3 v0.5.0. 43 drawn polygons (1–4 as one homestead group, 5–17, 19–45, unread A and B), each its own colour and show/hide box; 18 and 46–59 are listed as not placed, since no outline exists for them. Tap a parcel on the ground for plan number, 1841 tithe plot, land use, areas, occupier and landowner as entered, H3 cell counts and grid reference.
- Data: data/parcels59.json, data/h3cells.json (tools/parcels_h3_build.py).

## 0.1.0 — 4 Nov 2026
- New real-terrain world of Llandough, Leckwith and the Cedwyn estate (4 × 4 km, OS grid ST 15–18 / 72–75), alongside the existing Terrain world (kept on the `legacy` branch of unclehowell/terrain; nothing deleted).
- Terrain: Welsh Government LiDAR 2020–22 1 m DTM, resampled to 4 m (1000 × 1000), as four PNG height tiles.
- Contours drawn on the terrain: every 2 m, bold every 10 m. Relief slider (×1 to ×3).
- 6,534 OpenStreetMap buildings extruded, heights from OSM tags or LiDAR (DSM − DTM); pitched roofs on small four-sided buildings.
- 18,651 trees and 15,675 hedge/scrub points from LiDAR canopy heights; roads, rivers (River Ely), woodland and water from OSM.
- Sun and sky from the real date and time at Llandough; time slider; clear / overcast / rain / fog; fog.
- 1841 layer: the 43 Tithe H3 parcels (Stewart plan via the 1841 tithe map) draped on the ground by land use, modern buildings faded.
- WorldBackend interface (ThreeBackend live, Genie4Backend stub, flag off); "steer the world" text box (local parser); procedural sound (wind, rain, River Ely, church bell on the hour).
