import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import {
  importMap,
  modules,
  renderToString,
} from "@backtickjs/solid-js/server";
import { Counter } from "./Counter.js";

// Where the page finds each module a bundle and the client import.
const urlOf = (specifier: string) => `/modules/${specifier}.js`;

async function toHtml(element: JSX.Element): Promise<string> {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${importMap(urlOf)}
  </head>
  <body>
    ${await renderToString(element)}
  </body>
</html>`;
}

const server = createServer(async (incoming, outgoing) => {
  // Solid and the client, as the import map names them.
  const specifier = Object.keys(modules).find(
    (name) => urlOf(name) === incoming.url,
  );
  if (specifier !== undefined) {
    outgoing.writeHead(200, { "content-type": "text/javascript" });
    outgoing.end(await readFile(fileURLToPath(modules[specifier]!)));
    return;
  }

  // An element saying what to draw. The component has not run yet.
  const counter = <Counter from={0} />;

  // A document carrying what it drew, with the modules that draw it.
  const html = await toHtml(counter);

  // Ordinary HTTP from here
  outgoing.writeHead(200, { "content-type": "text/html" });
  outgoing.end(html);
});

server.listen(5173, () => console.log("Preview on http://localhost:5173"));
