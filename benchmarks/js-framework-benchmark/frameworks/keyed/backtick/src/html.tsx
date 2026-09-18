import { renderToScript } from "@backtickjs/web-page/server";
import { Main } from "./Main.js";

export const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Backtick-"keyed"</title>
    <link href="/css/currentStyle.css" rel="stylesheet">
  </head>
  <body>
    <div id="main" class="container">
      ${await renderToScript(<Main />, "./client.js")}
    </div>
  </body>
</html>
`;
