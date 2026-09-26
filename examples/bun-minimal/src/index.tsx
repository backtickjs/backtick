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

const server = Bun.serve({
  port: 5174,
  routes: {
    "/": async () => {
      // An element saying what to draw. The component has not run yet.
      const counter = <Counter from={0} />;

      // A document carrying what it drew, with the modules that draw it.
      const html = await toHtml(counter);

      // Ordinary HTTP from here
      return new Response(html, { headers: { "content-type": "text/html" } });
    },
  },
  // Solid and the client, as the import map names them.
  fetch(request) {
    const { pathname } = new URL(request.url);
    const specifier = Object.keys(modules).find(
      (name) => urlOf(name) === pathname,
    );
    if (specifier === undefined) {
      return new Response("Not found", { status: 404 });
    }
    return new Response(Bun.file(fileURLToPath(modules[specifier]!)), {
      headers: { "content-type": "text/javascript" },
    });
  },
});

console.log(`Preview on ${server.url}`);
