import { fileURLToPath } from "node:url";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import {
  importMap,
  modules,
  renderToString,
} from "@backtickjs/solid-js/server";
import { Scoreboard } from "./Scoreboard.js";
import { load, SLATE_PATH } from "./scores.js";

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
  port: 5177,
  routes: {
    "/": async () => {
      const html = await toHtml(<Scoreboard />);
      return new Response(html, { headers: { "content-type": "text/html" } });
    },

    // What the drawing polls. The scores it answers with are the scores the
    // bundle above was built from, read the same way — the page and its
    // refreshes agree because they call one function.
    [SLATE_PATH]: async () =>
      new Response(JSON.stringify(await load()), {
        headers: {
          "content-type": "application/json",
          "cache-control": "no-store",
        },
      }),
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
