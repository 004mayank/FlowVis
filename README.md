# FlowVis

FlowVis is an interactive system-flow visualizer for 100+ real products. It turns "how does X actually work under the hood" into a step-by-step, animated breakdown with two synchronized diagrams: a high-level **System Flow** (users, services, storage, queues, CDN) and a zoomed-in **Architecture Flow** (concrete services, databases, queues with shape-coded nodes and smart arrow routing).

Everything runs as a static single-page app. No backend, no build step.

## What you can do

1. **Browse the catalog.** The home and Explore pages list 500+ products (WhatsApp, Stripe, Netflix, Uber, UPI, Shopify, and so on) grouped by category. Click any card to open the playground.
2. **Step through a flow.** Each product has an ordered set of steps. The playground lights up the active nodes and edges for the current step, shows a description panel, and lets you play, pause, zoom, and switch between the System Flow and Architecture Flow tabs.
3. **Generate a custom flow with AI.** On the AI Generate page, connect your own Anthropic or OpenAI key once (stored only in your browser's localStorage), then ask a scoped question like "how does WhatsApp send images to others" or "how does Google Search rank results". The LLM returns a structured flow (nodes, steps, edges, active sets, edge labels) that is laid out and rendered exactly like a hand-authored product, with dotted baseline skeleton and teal active overlay. The generated flow is kept in your session's Recent Generations and can be reopened in the playground.

## How the AI generation works

- The prompt demands production-grade depth: 8 to 12 steps, 8 to 14 nodes, 3 to 5 sentences per step covering protocols, data formats, consistency model, cache TTLs, idempotency, retry and backpressure, and failure modes.
- Anthropic requests hit `/v1/messages` with `anthropic-dangerous-direct-browser-access: true`. OpenAI requests use `response_format: json_object`. Calls go **directly** from your browser to the provider.
- The JSON response is parsed, validated (every id used in `active[]` or `edges[]` must exist in `nodes[]`), and injected into the live `FLOWS`, `SYSTEM_LAYOUTS`, and `ARCH_LAYOUTS` maps. An order-based 2D grid layout (1 row for up to 5 nodes, 2 rows for 6 to 10, 3 rows for 11 or more) spreads nodes across the canvas, and a primary spine produces the dotted skeleton on both diagrams.
- Your API key is saved only in this browser's localStorage. FlowVis has no backend and never has access to your credentials.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

The `dev` script runs `npx serve . -l 3000`. Because `src/js/app.js` is loaded as an ES module, it must be served over HTTP; opening `index.html` directly from the filesystem will not work.

## Project layout

```
index.html                       Static entrypoint, loader screen, preview-mode routing
package.json                     Only devDep is `serve`; no build step
src/js/app.js                    All UI logic: SPA router, home/explore/AI pages,
                                 playground overlay, system + architecture renderers,
                                 AI key modal, LLM pipeline (prompt -> call -> parse ->
                                 auto-layout -> inject)
src/styles/main.css              All styling (theme variables, hero gradient,
                                 cards, playground, AI page, key modal, loader dots)
src/data/systems.js              SYSTEMS catalog, CATEGORIES, addSystem, slugify
src/data/flows.js                FLOWS map: per-product ordered steps with
                                 active nodes, edges, edge labels, descriptions
src/data/desc-overrides.js       Per-product card descriptions
src/data/logos.js                Logo-by-system-id resolver
src/assets/logos/                Vendored SVG logos (from gilbarbara/logos)
.claude/launch.json              Claude Code preview-server config
```

Two further in-app constants in `src/js/app.js`:

- `SYSTEM_LAYOUTS` maps product id to `{viewBox, nodes: {id: {x, y, label, colorKey}}, baselineEdges?, primaryPath?}` used by the System Flow renderer.
- `ARCH_LAYOUTS` maps product id to `{viewBox, backendLabel, backend, nodes: {id: {x, y, label}}, primaryPath, stepEdges(stepIdx)}` used by the Architecture Flow renderer. The renderer infers node shape (service, database cylinder, queue) from the label.

## Adding a product by hand

1. Add the product name to `PRODUCT_LINES` in `src/js/app.js`.
2. Optionally override the card description in `src/data/desc-overrides.js`.
3. Add a flow entry to `FLOWS` in `src/data/flows.js` (steps, active, edges, edge labels).
4. Add layouts to `SYSTEM_LAYOUTS` and `ARCH_LAYOUTS` in `src/js/app.js`.
5. Drop a matching SVG logo into `src/assets/logos/` if desired.

## Tech

Vanilla JavaScript, ES modules, inline SVG for diagrams, CSS variables for theming. No framework, no bundler, no backend. The AI feature makes direct browser-to-provider HTTPS calls using a user-supplied key.

## Credits

Logos: https://github.com/gilbarbara/logos
