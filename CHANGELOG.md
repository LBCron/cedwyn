# Changelog — Wales 3D world

## 0.1.0 — 4 Nov 2026
- New real-terrain world of Llandough, Leckwith and the Cedwyn estate (4 × 4 km, OS grid ST 15–18 / 72–75), alongside the existing Terrain world (kept on the `legacy` branch of unclehowell/terrain; nothing deleted).
- Terrain: Welsh Government LiDAR 2020–22 1 m DTM, resampled to 4 m (1000 × 1000), as four PNG height tiles.
- Contours drawn on the terrain: every 2 m, bold every 10 m. Relief slider (×1 to ×3).
- 6,534 OpenStreetMap buildings extruded, heights from OSM tags or LiDAR (DSM − DTM); pitched roofs on small four-sided buildings.
- 18,651 trees and 15,675 hedge/scrub points from LiDAR canopy heights; roads, rivers (River Ely), woodland and water from OSM.
- Sun and sky from the real date and time at Llandough; time slider; clear / overcast / rain / fog; fog.
- 1841 layer: the 43 Tithe H3 parcels (Stewart plan via the 1841 tithe map) draped on the ground by land use, modern buildings faded.
- WorldBackend interface (ThreeBackend live, Genie4Backend stub, flag off); "steer the world" text box (local parser); procedural sound (wind, rain, River Ely, church bell on the hour).
