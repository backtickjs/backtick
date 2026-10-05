import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { render } from "@backtickjs/solid-js/web";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";

// The version of Solid the page loads, below: what each page is bundled for.
const packageVersions = { "solid-js": "1.9.14" };

// Development is only what `npm start` runs, which sets NODE_ENV: any other
// run, a deploy included, is production.
export const development = process.env.NODE_ENV === "development";

// In development, what reloads the page whenever the server restarts, as it
// does when you save.
const reload = `
    <script type="module">
      let run;
      setInterval(async () => {
        try {
          const next = await (await fetch("/live")).text();
          if (run !== undefined && next !== run) location.reload();
          run = next;
        } catch {}
      }, 1000);
    </script>`;

// A page: the element, bundled for the browser, and Solid from a CDN.
export async function toHtml(element: JSX.Element): Promise<string> {
  const bundle = await bundler.build({
    input: cs`$render(() => $element, document.getElementById("app")!)`,
    packageVersions,
  });
  // In development, a map back to the files you wrote, for the browser's
  // devtools.
  const { code } = bundle.generate({
    format: "es",
    sourcemap: development ? "inline" : false,
  });

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Backtick</title>
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
  <body style="margin: 0">
    <div id="app"></div>
    <script type="module" src="data:text/javascript,${encodeURIComponent(code)}"></script>
    ${development ? reload : ""}
  </body>
</html>`;
}
