import { bundler } from "@backtickjs/bundler";
import type { JSX } from "@backtickjs/jsx-solid/jsx-runtime";

// The version of Solid the page loads, below: what each page is bundled for.
const modules = {
  "solid-js": "1.9.17",
  "solid-js/store": "1.9.17",
  "solid-js/web": "1.9.17",
};

// Development unless NODE_ENV says production, as hosts set it for a deploy.
const development = process.env.NODE_ENV !== "production";

// A page: its component, bundled for the browser, which the page's script
// runs with Solid from a CDN and draws with `render`.
export async function toHtml(element: JSX.Element): Promise<string> {
  const bundle = await bundler.build({ input: element, modules });
  // In development, a map back to the files you wrote, for the browser's
  // devtools.
  const { code } = bundle.generate({
    format: "cjs",
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

      const app = document.getElementById("app");
      SolidWeb.render(module.exports, app);
    </script>
  </body>
</html>`;
}
