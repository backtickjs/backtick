import { bundler } from "@backtickjs/bundler";
import type { BacktickElement } from "@backtickjs/core";
import { Scoreboard } from "./Scoreboard.js";
import { load, SLATE_PATH } from "./scores.js";

// Bundle the client once at startup.
const build = await Bun.build({
  entrypoints: ["./src/client.ts"],
  minify: true,
});
const [client] = build.outputs;

// The page: the client in the head, the bundle in the body.
async function toHtml(element: BacktickElement): Promise<string> {
  const json = bundler.stringify(await bundler.run(element));
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script defer src="/client.js"></script>
  </head>
  <body>
    <script type="application/json" data-backtick>${json}</script>
  </body>
</html>
`;
}

const server = Bun.serve({
  port: 5177,
  routes: {
    "/": async () => {
      const html = await toHtml(<Scoreboard />);
      return new Response(html, {
        headers: {
          "content-type": "text/html",
          "content-security-policy": "default-src 'self'",
        },
      });
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

    "/client.js": () => new Response(client),
  },
});

console.log(`Preview on ${server.url}`);
