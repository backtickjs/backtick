import { bundle } from "@backtickjs/core";
import { insert } from "@backtickjs/web-sdk";
import { Main } from "./Main.js";

export const html = insert(
  `<!doctype html><html><head>` +
    `<meta charset="utf-8">` +
    `<title>Backtick-"keyed"</title>` +
    `<link href="/css/currentStyle.css" rel="stylesheet">` +
    `<script defer src="./client.js"></script>` +
    `</head><body><div id="main" class="container"></div></body></html>`,
  "#main",
  await bundle(<Main />),
);
