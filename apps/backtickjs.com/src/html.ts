import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { render } from "@backtickjs/solid-js/web";
import { compile, optimize } from "@tailwindcss/node";
import { Scanner } from "@tailwindcss/oxide";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { ORIGIN, type Page, urlOf } from "./pages.js";

// In development, a map into the host files in each bundle, for devtools.
const sourcemap = process.env.NODE_ENV === "production" ? undefined : "inline";

// The page's CSS, generated once at startup from the classes the source uses.
const STYLE = await tailwind();

// A page's document: its component, drawn into it by Solid, and what search
// results and link previews show for it.
export async function toHtml({
  path,
  Page,
  title,
  description,
}: Page): Promise<string> {
  const titleText = Bun.escapeHTML(title);
  const descriptionText = Bun.escapeHTML(description);

  const bundle = await bundler.build({
    input: cs`$render($Page, document.getElementById("app")!)`,
    packageVersions: { "solid-js": "1.9.14" },
  });

  const { code } = bundle.generate({ format: "es", sourcemap });

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light dark">
    <title>${titleText}</title>
    <meta name="description" content="${descriptionText}">
    ${
      path === null
        ? `<meta name="robots" content="noindex">`
        : `<link rel="canonical" href="${urlOf(path)}">`
    }
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Backtick">
    <meta property="og:title" content="${titleText}">
    <meta property="og:description" content="${descriptionText}">
    <meta property="og:image" content="${ORIGIN}/og.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Backtick: a delightful programming model for React Native.">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
    <style>${STYLE}</style>
    <script defer src="https://cloud.umami.is/script.js" data-website-id="f960d84e-859f-4ec7-bbbb-752b6ec084cb" data-domains="backtickjs.com"></script>
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
