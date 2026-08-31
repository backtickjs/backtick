import { bundler, type Bundle } from "@backtickjs/core";
import { insert } from "@backtickjs/web-server";
import { Main } from "./Main.js";

const template = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Backtick-"keyed"</title>
    <link href="/css/currentStyle.css" rel="stylesheet">
    <script defer src="./client.js"></script>
  </head>
  <body>
    <div id="main" class="container"></div>
  </body>
</html>
`;

const bundle = await bundler.run(<Main />);

export const html = insert(template, "#main", bundle);
