import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import { importMap, renderToString } from "@backtickjs/solid-js/server";
import { Scoreboard } from "./Scoreboard.js";
import { load, SLATE_PATH } from "./scores.js";

async function toHtml(element: JSX.Element): Promise<string> {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${importMap()}
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
});

console.log(`Preview on ${server.url}`);
