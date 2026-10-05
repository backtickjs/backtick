import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { render } from "@backtickjs/solid-js/web";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import { compile, optimize } from "@tailwindcss/node";
import { Scanner } from "@tailwindcss/oxide";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// In development, a map into the host files in each bundle, for devtools.
const sourcemap = process.env.NODE_ENV === "production" ? undefined : "inline";

// The page's CSS, generated once at startup from the classes the source uses.
const STYLE = await tailwind();

export async function toHtml(
  element: JSX.Element,
  title: string,
): Promise<string> {
  const bundle = await bundler.build({
    input: cs`$render(() => $element, document.getElementById("app")!)`,
    packageVersions: { "solid-js": "1.9.14" },
  });

  const { code } = bundle.generate({ format: "es", sourcemap });

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light dark">
    <title>${title}</title>
    <meta name="description" content="Backtick brings server components to React Native. Each screen, client components included, is assembled on your server per request and renders natively.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
    <style>${STYLE}</style>
    <script type="importmap">
      {
        "imports": {
          "solid-js": "https://cdn.jsdelivr.net/npm/solid-js@1.9.14/dist/solid.js",
          "solid-js/web": "https://cdn.jsdelivr.net/npm/solid-js@1.9.14/web/dist/web.js",
          "solid-js/store": "https://cdn.jsdelivr.net/npm/solid-js@1.9.14/store/dist/store.js"
        }
      }
    </script>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="data:text/javascript,${encodeURIComponent(code)}"></script>
  </body>
</html>`;
}

async function tailwind(): Promise<string> {
  const src = fileURLToPath(new URL(".", import.meta.url));
  const input = await readFile(new URL("styles.css", import.meta.url), "utf8");
  const compiler = await compile(input, { base: src, onDependency: () => {} });
  const scanner = new Scanner({
    sources: [{ base: src, pattern: "**/*", negated: false }],
  });
  return optimize(compiler.build(scanner.scan()), { minify: true }).code;
}
