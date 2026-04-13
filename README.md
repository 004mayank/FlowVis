# FlowVis

FlowVis lets users see how a product works under the hood.

FlowVis uses animations and flow diagrams like the example below to explain the working step by step.

## Run locally

```bash
npm install
npm run dev
```

Then open: http://localhost:3000

## What’s in this repo

- `index.html` - Static entrypoint
- `src/js/app.js` - UI + routing + rendering
- `src/styles/main.css` - Styling
- `src/data/systems.js` - Catalog + categories
- `src/data/desc-overrides.js` - Product descriptions (used by cards)
- `src/assets/logos/` - Vendored SVG logos used on cards

## Editing the product list

- Product names live in `src/js/app.js` as `PRODUCT_LINES`.
- Descriptions live in `src/data/desc-overrides.js`.

## Credits

- Logos: https://github.com/gilbarbara/logos
