import { bundler } from "@backtickjs/bundler";
import { readFile } from "node:fs/promises";
import { type Page, PREVIEW_IMAGE, urlOf } from "./pages.js";

// In development, a map into the host files in each bundle, for devtools.
const sourcemap = process.env.NODE_ENV === "production" ? undefined : "inline";

// The page's CSS, made by the build from the classes the source uses (css.ts).
const STYLE = await readFile(new URL("style.css", import.meta.url), "utf8");

// A page's document: its component, drawn into it by Solid, and what search
// results and link previews show for it.
export async function toHtml({
  path,
  Page,
  title,
  description,
  structuredData,
  preloadImage,
}: Page): Promise<string> {
  const bundle = await bundler.build({
    // The page's component, which the document's script draws, as Solid's
    // `render` takes it.
    input: Page,
    modules: {
      "solid-js": "1.9.17",
      "solid-js/store": "1.9.17",
      "solid-js/web": "1.9.17",
    },
  });

  const { code } = bundle.generate({ format: "cjs", sourcemap });

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light dark">
    <title>${title}</title>
    <meta name="description" content="${description}">
    ${
      path === null
        ? `<meta name="robots" content="noindex">`
        : `<link rel="canonical" href="${urlOf(path)}">`
    }
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Backtick">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    ${path === null ? "" : `<meta property="og:url" content="${urlOf(path)}">`}
    <meta property="og:image" content="${PREVIEW_IMAGE.url}">
    <meta property="og:image:width" content="${PREVIEW_IMAGE.width}">
    <meta property="og:image:height" content="${PREVIEW_IMAGE.height}">
    <meta property="og:image:alt" content="${PREVIEW_IMAGE.alt}">
    <meta name="twitter:card" content="summary_large_image">
    ${
      structuredData === undefined
        ? ""
        : // "<" escaped, so nothing in the data can close the script.
          `<script type="application/ld+json">${JSON.stringify(structuredData).replaceAll("<", "\\u003c")}</script>`
    }
    ${preloadImage === undefined ? "" : `<link rel="preload" as="image" href="${preloadImage}" fetchpriority="high">`}
    <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,400&display=swap">
    <style>${STYLE}</style>
    <script>window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };</script>
    <script defer src="/_vercel/insights/script.js"></script>
    <script type="importmap">
      {
        "imports": {
          "solid-js": "https://cdn.jsdelivr.net/npm/solid-js@1.9.17/dist/solid.js",
          "solid-js/web": "https://cdn.jsdelivr.net/npm/solid-js@1.9.17/web/dist/web.js",
          "solid-js/store": "https://cdn.jsdelivr.net/npm/solid-js@1.9.17/store/dist/store.js"
        }
      }
    </script>
  </head>
  <body>
    <div id="app"></div>
    <script type="text/plain" id="bundle">${code}</script>
    <script type="module">
      import * as Solid from "solid-js";
      import * as SolidStore from "solid-js/store";
      import * as SolidWeb from "solid-js/web";

      const moduleMap = {
        "solid-js": Solid,
        "solid-js/store": SolidStore,
        "solid-js/web": SolidWeb,
      };

      const bundle = document.getElementById("bundle").textContent;
      const module = { exports: {} };
      new Function("module", "exports", "require", bundle)(
        module,
        module.exports,
        (name) => moduleMap[name],
      );

      // Cleared first: \`render\` adds to what's there.
      const app = document.getElementById("app");
      app.textContent = "";
      SolidWeb.render(module.exports, app);
    </script>
  </body>
</html>`;
}
