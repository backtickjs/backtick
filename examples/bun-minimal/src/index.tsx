import type { Bundle } from "@backtickjs/bundler";
import { bundler } from "@backtickjs/bundler";
import type { BacktickElement } from "@backtickjs/core";
import * as client from "@backtickjs/web-vm/bundle";
import { Counter } from "./Counter.js";

// Runs an element here on the server. What comes back is a bundle: data, not
// HTML, which the client draws in front of the script that carries it.
async function toHtml(element: BacktickElement): Promise<string> {
  const json = bundler.stringify(await bundler.run(element));
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="module">${client.source}</script>
  </head>
  <body>
    <script type="application/json" data-backtick>${json}</script>
  </body>
</html>`;
}

const server = Bun.serve({
  port: 5174,
  routes: {
    "/": async () => {
      // An element saying what to draw. The component has not run yet.
      const counter = <Counter from={0} />;

      // A document carrying what it drew, with the client that draws it.
      const html = await toHtml(counter);

      // Ordinary HTTP from here
      return new Response(html, { headers: { "content-type": "text/html" } });
    },
  },
});

console.log(`Preview on ${server.url}`);
