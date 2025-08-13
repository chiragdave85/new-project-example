# AI Hub — High-Fidelity Prototype

This is a responsive, high-fidelity web prototype derived from the low-fidelity wireframe `Ai HUB.png`.

## What’s included
- `index.html` — semantic layout with sections seen in the wireframe
- `styles.css` — modern, glassy-dark design system with responsive grid
- `script.js` — UI wiring + overlay alignment tool
- `Ai HUB.png` — your reference image (already in the folder)

## Overlay alignment tool
Use the Overlay button and sliders to align the reference image over the live UI:
- Toggle: show/hide overlay
- Opacity: adjust transparency
- Scale: resize overlay
- X/Y: nudge overlay position

This helps iterate the high-fidelity design to match the wireframe precisely.

## Quick preview
Open `index.html` directly in your browser, or serve locally for best results.

Optional local server (macOS):

```zsh
python3 -m http.server 5173
# then open http://localhost:5173
```

## Customize
- Swap copy, icons, and section structure to match your exact wireframe.
- Update theme tokens in `:root` within `styles.css`.
- Replace mock cards with screenshots or real components.

## Notes
- No external dependencies. Pure HTML/CSS/JS.
- Designed mobile-first with responsive breakpoints.
