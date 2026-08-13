import { createServer } from "node:http";
import { bundler, type Bundle } from "@backtickjs/core";
import { client, insert } from "@backtickjs/web-sdk";
import { Counter } from "./Counter.js";

const server = createServer(async (incoming, outgoing) => {
  // An element saying what to draw. The component has not run yet.
  const counter = <Counter from={0} />;

  // Runs it, here on the server. What comes back is a bundle: data, not HTML.
  const bundle = await bundler.run(counter);

  // A document carrying that bundle as JSON, with the client that draws it.
  const html = toHtml(bundle);

  // Ordinary HTTP from here
  outgoing.writeHead(200, { "content-type": "text/html" });
  outgoing.end(html);
});

function toHtml(bundle: Bundle): string {
  const html =
    `<!doctype html><html><head>` +
    `<meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    `<script>${client.source}</script>` +
    `</head><body></body></html>`;
  return insert(html, "body", bundle);
}

server.listen(5173, () => console.log("Preview on http://localhost:5173"));
