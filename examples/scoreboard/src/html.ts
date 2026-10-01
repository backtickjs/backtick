import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { render } from "@backtickjs/solid-js";
import { solid } from "@backtickjs/solid-js/plugin";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";

// In development, a map into the host files in each bundle, for devtools.
const sourcemap = process.env.NODE_ENV === "production" ? undefined : "inline";

export async function toHtml(element: JSX.Element): Promise<string> {
  const bundle = await bundler.build({
    input: cs`$render(() => $element, document.getElementById("app")!)`,
    external: { "solid-js": "1.9.14" },
    plugins: [solid()],
  });

  const { code } = bundle.generate({ format: "es", sourcemap });

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
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
