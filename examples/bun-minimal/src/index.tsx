import type { Bundle } from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import * as client from "@backtickjs/web-client/bundle";
import { insert } from "@backtickjs/web-server";
import { Counter } from "./Counter.js";

const template = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script>${client.source}</script>
  </head>
  <body></body>
</html>`;

const server = Bun.serve({
  port: 5174,
  routes: {
    "/": async () => {
      // An element saying what to draw. The component has not run yet.
      const counter = <Counter from={0} />;

      // Runs it, here on the server. What comes back is a bundle: data, not HTML.
      const bundle = await bundler.run(counter);

      // A document carrying that bundle as JSON, with the client that draws it.
      const html = insert(template, "body", bundle);

      // Ordinary HTTP from here
      return new Response(html, { headers: { "content-type": "text/html" } });
    },
  },
});

console.log(`Preview on ${server.url}`);
