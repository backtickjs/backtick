import { bundler } from "@backtickjs/bundler";
import type { Client } from "@backtickjs/core";
import type { JSX } from "@backtickjs/jsx-solid/jsx-runtime";
import { style } from "./style.ts";

// A page's document: its component, drawn into it by Solid. Solid and
// Supabase's client come from a CDN, at the versions the bundle is built for.
export async function toHtml(
  title: string,
  Page: Client<() => JSX.Element>,
): Promise<string> {
  const bundle = await bundler.build({
    input: Page,
    modules: {
      "solid-js": "1.9.17",
      "solid-js/web": "1.9.17",
      "solid-js/store": "1.9.17",
      "@supabase/supabase-js": "2.117.2",
    },
  });
  const { code } = bundle.generate();
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <style>${style}</style>
    <script type="importmap">
      {
        "imports": {
          "@backtickjs/core": "https://cdn.jsdelivr.net/npm/@backtickjs/core@0.8.0/+esm",
          "solid-js": "https://cdn.jsdelivr.net/npm/solid-js@1.9.17/dist/solid.js",
          "solid-js/web": "https://cdn.jsdelivr.net/npm/solid-js@1.9.17/web/dist/web.js",
          "solid-js/store": "https://cdn.jsdelivr.net/npm/solid-js@1.9.17/store/dist/store.js",
          "@supabase/supabase-js": "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.2/+esm"
        }
      }
    </script>
  </head>
  <body>
    <div id="app"></div>
    <script type="text/plain" id="bundle">${code}</script>
    <script type="module">
      import { createRuntime } from "@backtickjs/core";
      import * as Solid from "solid-js";
      import * as SolidStore from "solid-js/store";
      import * as SolidWeb from "solid-js/web";
      import * as Supabase from "@supabase/supabase-js";

      const moduleMap = {
        "solid-js": Solid,
        "solid-js/store": SolidStore,
        "solid-js/web": SolidWeb,
        "@supabase/supabase-js": Supabase,
      };

      const runtime = createRuntime({
        moduleMap,
        installedPackages: {
          "solid-js": "1.9.17",
          "@supabase/supabase-js": "2.117.2",
        },
      });
      const page = await runtime.exec(
        document.getElementById("bundle").textContent,
      );

      const app = document.getElementById("app");
      SolidWeb.render(page, app);
    </script>
  </body>
</html>`;
}
