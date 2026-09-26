import { importMap, renderToString } from "@backtickjs/solid-js/server";
import { Main } from "./Main.js";

// Solid and the client, copied beside the page by `build.mjs`.
export const moduleUrl = (specifier: string) => `./modules/${specifier}.js`;

export const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Backtick-"keyed"</title>
    <link href="/css/currentStyle.css" rel="stylesheet">
    ${importMap(moduleUrl)}
  </head>
  <body>
    <div id="main" class="container">
      ${await renderToString(<Main />)}
    </div>
  </body>
</html>
`;
