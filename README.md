# AI Hub — High-Fidelity Prototype (React + MUI)

A responsive, high-fidelity UI built with React 18 and MUI v5, aligned to the `Ai HUB.png` reference. Includes a keyboard-driven overlay for pixel alignment and a two-pane layout (left sidebar + right content).

## What’s included
- `index.html` — loads React/MUI UMD bundles and mounts the app
- `script.js` — React app with MUI (Drawer-less 2-pane layout), sidebar, welcome, gradient chat frame, action chips, and prompt library; overlay hotkeys
- `styles.css` — base tokens and minor page styles
- `Ai HUB.png` — reference image for the overlay tool

## Overlay hotkeys
- Shift+O: Toggle overlay on/off
- Arrows: Nudge overlay (hold Shift for bigger steps)
- +/-: Scale overlay
- P/L: Increase/Decrease overlay opacity

## Run locally
You can open `index.html` directly, or serve locally:

```zsh
python3 -m http.server 5173
# then open http://localhost:5173
```

## Design highlights
- Left sidebar: white background with three action cards (#FAFAFA), 16px font, 8px radius, soft shadows; no divider.
- Right content: centered Container on #f8f9fa, large “Welcome!” header, pixel-perfect 1024×280 gradient frame (#7B2FF7→#5A00E0) with pill actions and a white input area with footer controls.
- Theme: modern sans stack (Inter/BentonSans), primary purple (#6366f1), 8px spacing, smooth transitions.
- Accessibility: ARIA labels on tabs and controls; responsive layout across breakpoints.

## Recent changes
- Removed top header; kept left/right panes only.
- Simplified sidebar items (icon + main label only) and styling tweaks.
- Right panel background set to #F8F6F2 (later refined to #f8f9fa for the new layout).
- Implemented gradient chat frame and updated theme to purple.

## Notes
- For exact typography, consider loading Inter and/or BentonSansPro webfonts.
- If Source Control shows prolonged loading under a cloud-synced path, try reloading VS Code or temporarily disabling auto-refresh.
