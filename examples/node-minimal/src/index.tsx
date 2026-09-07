import { createServer } from "node:http";
import type { Bundle } from "@backtickjs/bundler";
import { bundler } from "@backtickjs/bundler";
import * as client from "@backtickjs/web-client/bundle";
import { embed } from "@backtickjs/html-embed";
import { Counter } from "./Counter.js";

const template = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="module">${client.source}</script>
  </head>
  <body></body>
</html>`;

const server = createServer(async (incoming, outgoing) => {
  // An element saying what to draw. The component has not run yet.
  const counter = <Counter from={0} />;

  // Runs it, here on the server. What comes back is a bundle: data, not HTML.
  const bundle = await bundler.run(counter);

  // A document carrying that bundle as JSON, with the client that draws it.
  const html = embed(template, "body", bundle);

  // Ordinary HTTP from here
  outgoing.writeHead(200, { "content-type": "text/html" });
  outgoing.end(html);
});

server.listen(5173, () => console.log("Preview on http://localhost:5173"));
