import type { Bundle } from "@backtickjs/bundler";
import { bundler } from "@backtickjs/bundler";
import { embed } from "@backtickjs/html-embed";
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

export const html = embed(template, "#main", bundle);
