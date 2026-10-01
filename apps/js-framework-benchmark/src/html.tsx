import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { render } from "@backtickjs/solid-js";
import { solid } from "@backtickjs/solid-js/plugin";
import { version } from "@backtickjs/solid-js/version";
import { Main } from "./Main.js";

// The client entry: the page's script, drawing `Main` into its container.
const bundle = await bundler.build({
  input: cs`$render(
    () => ${(<Main />)},
    document.getElementById("main") as HTMLElement,
  )`,
  external: { "solid-js": version },
  plugins: [solid()],
});
const { code } = bundle.generate({ format: "es" });

export const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Backtick-"keyed"</title>
    <link href="/css/currentStyle.css" rel="stylesheet">
    <script type="importmap">
      {
        "imports": {
          "solid-js": "https://cdn.jsdelivr.net/npm/solid-js@${version}/dist/solid.js",
          "solid-js/web": "https://cdn.jsdelivr.net/npm/solid-js@${version}/web/dist/web.js",
          "solid-js/store": "https://cdn.jsdelivr.net/npm/solid-js@${version}/store/dist/store.js"
        }
      }
    </script>
  </head>
  <body>
    <div id="main" class="container"></div>
    <script type="module" src="data:text/javascript,${encodeURIComponent(code)}"></script>
  </body>
</html>
`;
