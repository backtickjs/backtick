import { createServer } from "node:http";
import type { BacktickElement } from "@backtickjs/core";
import { renderToString } from "@backtickjs/web-page/server";
import { build } from "esbuild";
import { Counter } from "./Counter.js";

// Bundle the client once at startup.
const result = await build({
  entryPoints: ["./src/client.ts"],
  bundle: true,
  minify: true,
  write: false,
});
const client = result.outputFiles[0].text;

// Runs an element here on the server. What comes back is a bundle: data, not
// HTML, which the client draws in front of the script that carries it.
async function toHtml(element: BacktickElement): Promise<string> {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    ${await renderToString(element, "/client.js")}
  </body>
</html>`;
}

const server = createServer(async (incoming, outgoing) => {
  if (incoming.url === "/client.js") {
    outgoing.writeHead(200, { "content-type": "text/javascript" });
    outgoing.end(client);
    return;
  }

  // An element saying what to draw. The component has not run yet.
  const counter = <Counter from={0} />;

  // A document carrying what it drew, with the client that draws it.
  const html = await toHtml(counter);

  // Ordinary HTTP from here
  outgoing.writeHead(200, { "content-type": "text/html" });
  outgoing.end(html);
});

server.listen(5173, () => console.log("Preview on http://localhost:5173"));
