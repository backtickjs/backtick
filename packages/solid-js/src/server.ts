import { bundler } from "@backtickjs/bundler";
import type { Spliceable } from "@backtickjs/core";
import { compile } from "./transform.js";

// Pages drawn with Solid: a container and the module script that draws a
// bundle into it, and the import map that gives the bundle and the client one
// Solid.

const CLIENT = "@backtickjs/solid-js/client";

/**
 * The modules a page serves so a bundle and the client share one Solid: each
 * specifier they import, and the file behind it — Solid's browser builds and
 * this adapter's client.
 */
export const modules: { readonly [specifier: string]: string } = {
  "solid-js": import.meta.resolve("solid-js/dist/solid.js"),
  "solid-js/web": import.meta.resolve("solid-js/web/dist/web.js"),
  "solid-js/store": import.meta.resolve("solid-js/store/dist/store.js"),
  [CLIENT]: new URL("./client.js", import.meta.url).href,
};

/**
 * The page's import map, `modules` each at the URL `urlOf` gives it — where
 * the server serves that file. Written once, in `<head>`, before any module
 * script.
 */
export function importMap(urlOf: (specifier: string) => string): string {
  const imports = Object.fromEntries(
    Object.keys(modules).map((name) => [name, urlOf(name)]),
  );
  return `<script type="importmap">${literal({ imports })}</script>`;
}

/**
 * Runs `element` and returns where it draws, followed by the module script
 * that draws it there. The script imports the bundle as a `data:` URL, so the
 * bundle's own imports resolve through the page's import map, as the
 * client's do.
 */
export async function renderToString<T>(
  element: Spliceable<T>,
): Promise<string> {
  const { code } = compile(await bundler.run(element as Spliceable));
  const id = `backtick-${crypto.randomUUID()}`;
  const script = [
    `import { client } from ${literal(CLIENT)};`,
    `const { default: draw } = await import("data:text/javascript," + encodeURIComponent(${literal(code)}));`,
    `client.render(draw, document.getElementById(${literal(id)}));`,
  ].join("\n");
  return `<div id="${id}"></div><script type="module">\n${script}\n</script>`;
}

// JSON, with every `<` escaped, so nothing it holds can end its `<script>`.
function literal(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
