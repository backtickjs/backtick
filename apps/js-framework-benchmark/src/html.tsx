import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { render } from "@backtickjs/solid-js/web";
import { solid } from "@backtickjs/solid-js/plugin";
import { Main } from "./Main.js";

const bundle = await bundler.build({
  input: cs`$render(() => ${(<Main />)}, document.getElementById("main")!)`,
  external: { "solid-js": "1.9.14" },
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
          "solid-js": "https://cdn.jsdelivr.net/npm/solid-js@1.9.14/dist/solid.js",
          "solid-js/web": "https://cdn.jsdelivr.net/npm/solid-js@1.9.14/web/dist/web.js",
          "solid-js/store": "https://cdn.jsdelivr.net/npm/solid-js@1.9.14/store/dist/store.js"
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
