import { bundler } from "@backtickjs/bundler";
import { Main } from "./Main.js";

const bundle = await bundler.build({
  input: Main,
  modules: {
    "solid-js": "1.9.17",
    "solid-js/store": "1.9.17",
    "solid-js/web": "1.9.17",
  },
});

const { code } = bundle.generate({ format: "cjs" });

export const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Backtick-"keyed"</title>
    <link href="/css/currentStyle.css" rel="stylesheet">
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
    <div id="main"></div>
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

      const main = document.getElementById("main");
      SolidWeb.render(module.exports, main);
    </script>
  </body>
</html>
`;
