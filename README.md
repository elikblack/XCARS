# XCARS

**Xterra Computer Access & Routing System** — an interactive, browser-based master systems display for a first-generation Nissan Xterra (WD22), visually inspired by classic LCARS/MSD design language.

## Current prototype

The first pass is intentionally simple:

- full-screen dashboard layout
- Xterra cutaway as the central systems schematic
- clickable engine, driveline, cabin, and cargo zones
- fake idle telemetry for visual life
- live clock
- LCARS/MSD-inspired framing without trying to reproduce a Star Trek screen verbatim

## Asset setup

The interface expects the generated Xterra cutaway image at:

`assets/xterra-cutaway.png`

Once that image is added, open `index.html` directly in a browser. No build step is required.

## Direction

The useful layer can eventually include OBD-II telemetry and Bluetooth/media controls. The decorative layer is free to be considerably more dramatic.
