// A page's HTML: its component, bundled for the browser, which draws it with
// Solid. Solid and Supabase's client come from a CDN, at the versions the
// bundle is built for.
import { bundler } from "@backtickjs/bundler";
import type { Client } from "@backtickjs/core";
import type { JSX } from "@backtickjs/jsx-solid/jsx-runtime";
import { style } from "./style.ts";

const solid = "1.9.17";
const supabase = "2.117.2";

export async function toHtml(
  title: string,
  Page: Client<() => JSX.Element>,
): Promise<string> {
  const bundle = await bundler.build({
    input: Page,
    modules: {
      "solid-js": solid,
      "solid-js/web": solid,
      "solid-js/store": solid,
      "@supabase/supabase-js": supabase,
    },
  });
  const { code } = bundle.generate({ format: "cjs" });
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
    "solid-js": "https://cdn.jsdelivr.net/npm/solid-js@${solid}/dist/solid.js",
    "solid-js/web": "https://cdn.jsdelivr.net/npm/solid-js@${solid}/web/dist/web.js",
    "solid-js/store": "https://cdn.jsdelivr.net/npm/solid-js@${solid}/store/dist/store.js",
    "@supabase/supabase-js": "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@${supabase}/+esm"
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
import * as Supabase from "@supabase/supabase-js";

const moduleMap = {
  "solid-js": Solid,
  "solid-js/store": SolidStore,
  "solid-js/web": SolidWeb,
  "@supabase/supabase-js": Supabase,
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
