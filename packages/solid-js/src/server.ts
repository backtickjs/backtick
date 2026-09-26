import { bundler } from "@backtickjs/bundler";
import type { Spliceable } from "@backtickjs/core";
import { compile } from "./transform.js";

// Pages drawn with Solid: a container and the module script that draws a
// bundle into it, and the import map that gives every bundle one Solid.

// The Solid this adapter compiles for (its `solid-js` dependency), from a CDN.
const SOLID = "https://cdn.jsdelivr.net/npm/solid-js@1.9.14";

/**
 * The page's import map: Solid's browser builds, which a bundle imports. Written
 * once, in `<head>`, before any module script.
 */
export function importMap(): string {
  const imports = {
    "solid-js": `${SOLID}/dist/solid.js`,
    "solid-js/web": `${SOLID}/web/dist/web.js`,
    "solid-js/store": `${SOLID}/store/dist/store.js`,
  };
  return `<script type="importmap">${literal({ imports })}</script>`;
}

/**
 * Runs `element` and returns where it draws, followed by the module script
 * that draws it there with Solid's `render`. The script imports the bundle as
 * a `data:` URL, so the bundle's own imports resolve through the page's import
 * map, as the script's do.
 */
export async function renderToString<T>(
  element: Spliceable<T>,
): Promise<string> {
  const { code } = compile(await bundler.run(element as Spliceable));
  const id = `backtick-${crypto.randomUUID()}`;
  const script = [
    `import { render } from "solid-js/web";`,
    `const { default: draw } = await import("data:text/javascript," + encodeURIComponent(${literal(code)}));`,
    `render(draw, document.getElementById(${literal(id)}));`,
  ].join("\n");
  return `<div id="${id}"></div><script type="module">\n${script}\n</script>`;
}

// JSON, with every `<` escaped, so nothing it holds can end its `<script>`.
function literal(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
