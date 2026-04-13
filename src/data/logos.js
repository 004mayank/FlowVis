/**
 * FlowVis logos
 *
 * Source: https://github.com/gilbarbara/logos
 * We vendor a subset of SVG files into src/assets/logos/ for offline/static hosting.
 */

import { LOGO_MANIFEST } from './logo-manifest.js';

export function logoForSystemId(id) {
  const file = LOGO_MANIFEST[id];
  if (!file) return null;

  // Inline via <img> so we can keep assets as files (fast + simple)
  return `<img class="logo-img" src="src/assets/logos/${file}" alt="${id} logo" loading="lazy" />`;
}
