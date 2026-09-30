import type { Client } from "@backtickjs/core";
import type { JSX } from "./jsx-runtime.js";
import { bundle } from "./bundle.js";

/**
 * Where `draw` draws, followed by the module script that draws it there with
 * Solid's `render`, which takes a function that draws, as `draw` is:
 *
 *     await renderToString(() => <App />)
 *
 * The script imports the bundle as a `data:` URL, so the bundle's own imports
 * resolve through the page's import map, as the script's do.
 */
export async function renderToString(
  draw: (() => JSX.Element) | Client<() => JSX.Element>,
): Promise<string> {
  const { code } = await bundle(draw);
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
