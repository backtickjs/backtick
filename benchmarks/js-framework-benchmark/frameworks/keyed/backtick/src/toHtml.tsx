import { type Bundle } from "@backtickjs/core";
import { insert } from "@backtickjs/web-sdk";

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

export function toHtml(bundle: Bundle): string {
  return insert(template, "#main", bundle);
}
