import type { Bundle } from "@backtickjs/bundler";
import { bundler } from "@backtickjs/bundler";
import type { BacktickElement } from "@backtickjs/core";
import { Main } from "./Main.js";

// Runs an element here on the server. What comes back is a bundle: data, not
// HTML, which the client draws in front of the script that carries it.
async function toHtml(element: BacktickElement): Promise<string> {
  const json = bundler.stringify(await bundler.run(element));
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Backtick-"keyed"</title>
    <link href="/css/currentStyle.css" rel="stylesheet">
    <script defer src="./client.js"></script>
  </head>
  <body>
    <div id="main" class="container">
      <script type="application/json" data-backtick>${json}</script>
    </div>
  </body>
</html>
`;
}

export const html = await toHtml(<Main />);
