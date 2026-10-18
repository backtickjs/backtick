import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { render } from "solid-js/web" with { backtick: "client" };
import type { JSX } from "@backtickjs/jsx-solid/jsx-runtime";

// The version of Solid the page loads, below: what each page is bundled for.
const modules = {
  "solid-js": "1.9.17",
  "solid-js/store": "1.9.17",
  "solid-js/web": "1.9.17",
};

// Development unless NODE_ENV says production, as hosts set it for a deploy.
const development = process.env.NODE_ENV !== "production";

// A page: the element, bundled for the browser, and Solid from a CDN.
export async function toHtml(element: JSX.Element): Promise<string> {
  const bundle = await bundler.build({
    input: cs`$render(() => $element, document.getElementById("app")!)`,
    modules,
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
          "solid-js": "https://cdn.jsdelivr.net/npm/solid-js@1.9.17/dist/solid.js",
          "solid-js/web": "https://cdn.jsdelivr.net/npm/solid-js@1.9.17/web/dist/web.js",
          "solid-js/store": "https://cdn.jsdelivr.net/npm/solid-js@1.9.17/store/dist/store.js"
        }
      }
    </script>
  </head>
  <body style="margin: 0">
    <div id="app"></div>
    <script type="module" src="data:text/javascript,${encodeURIComponent(code)}"></script>
  </body>
</html>`;
}
