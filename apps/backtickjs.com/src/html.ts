import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { render } from "solid-js/web" with { backtick: "client" };
import { readFile } from "node:fs/promises";
import { type Page, urlOf } from "./pages.js";

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
}: Page): Promise<string> {
  const bundle = await bundler.build({
    // Cleared first: `render` adds to what's there, and draws the same page.
    input: cs`{
      const app = document.getElementById("app")!;
      app.textContent = "";
      $render($Page, app);
    }`,
    modules: {
      "solid-js": "1.9.17",
      "solid-js/store": "1.9.17",
      "solid-js/web": "1.9.17",
    },
  });

  const { code } = bundle.generate({ format: "es", sourcemap });

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
    <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
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
    <script type="module" src="data:text/javascript,${encodeURIComponent(code)}"></script>
  </body>
</html>`;
}
