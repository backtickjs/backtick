import type { Bundle } from "@backtickjs/bundler";
import { bundler } from "@backtickjs/bundler";
import * as client from "@backtickjs/web-client/bundle";
import { embed } from "@backtickjs/html-embed";
import { Report } from "./Report.js";

const template = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="module">${client.source}</script>
  </head>
  <body></body>
</html>`;

const server = Bun.serve({
  port: 5176,
  routes: {
    "/": async () => {
      // An element saying what to draw. The component has not run yet.
      const report = <Report of="conformance" />;

      // Runs it, here on the server. What comes back is a bundle: data, not HTML.
      const bundle = await bundler.run(report);

      // A document carrying that bundle as JSON, with the client that draws it.
      const html = embed(template, "body", bundle);

      // Ordinary HTTP from here
      return new Response(html, { headers: { "content-type": "text/html" } });
    },
  },
});

console.log(`Preview on ${server.url}`);
