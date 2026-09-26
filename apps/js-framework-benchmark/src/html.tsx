import { importMap, renderToString } from "@backtickjs/solid-js/server";
import { Main } from "./Main.js";

export const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Backtick-"keyed"</title>
    <link href="/css/currentStyle.css" rel="stylesheet">
    ${importMap()}
  </head>
  <body>
    <div id="main" class="container">
      ${await renderToString(<Main />)}
    </div>
  </body>
</html>
`;
