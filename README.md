# Veda International School — Figma to React/Vite

Responsive implementation of the six-page Veda International School Figma design:

- Home
- About Us
- Features
- Admissions
- Gallery
- Contact

## Stack

- React
- Vite
- Plain responsive CSS (no Tailwind)
- Hash-based routing, so no router dependency is required

## Run

```bash
npm install
npm run dev
```

Open the URL printed by Vite. Navigation uses `#/home`, `#/about`, `#/features`, `#/admissions`, `#/gallery`, and `#/contact`.

## Build

```bash
npm run build
npm run preview
```

## Figma assets

`src/assets.js` centralizes the exact image URLs returned by the Figma design-to-code connector. Figma's generated asset links are temporary. Before production/deployment, run this while those links are still active:

```bash
npm run localize-assets
```

That command downloads the images into `public/figma/` and rewrites `src/assets.js` to use local paths. After that, the site no longer depends on temporary Figma asset URLs.

## Where to edit

- `src/App.jsx` — all six pages, reusable header/footer/hero/CTA components, page content
- `src/styles.css` — design tokens, desktop/tablet/mobile styling
- `src/assets.js` — Figma image assets
- `src/main.jsx` — React entry point

## Notes

The Admissions and Contact forms are front-end UI implementations. Connect their submit handlers to your preferred API/backend before production.
