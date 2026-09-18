import { clientScript, renderToScript } from "@backtickjs/web-page/server";
import { Main } from "./Main.js";

export const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Backtick-"keyed"</title>
    <link href="/css/currentStyle.css" rel="stylesheet">
    ${clientScript("./client.js")}
  </head>
  <body>
    <div id="main" class="container">
      ${await renderToScript(<Main />)}
    </div>
  </body>
</html>
`;
