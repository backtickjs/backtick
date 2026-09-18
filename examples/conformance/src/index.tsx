import { bundler } from "@backtickjs/bundler";
import type { BacktickElement } from "@backtickjs/core";
import { Report } from "./Report.js";

// Bundle the client once at startup.
const build = await Bun.build({
  entrypoints: ["./src/client.ts"],
  minify: true,
});
const [client] = build.outputs;

// Runs an element here on the server. What comes back is a bundle: data, not
// HTML, which the client draws in front of the script that carries it.
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
</html>`;
}

const server = Bun.serve({
  port: 5176,
  routes: {
    "/": async () => {
      // An element saying what to draw. The component has not run yet.
      const report = <Report of="conformance" />;

      // A document carrying what it drew, with the client that draws it.
      const html = await toHtml(report);

      // Ordinary HTTP from here
      return new Response(html, { headers: { "content-type": "text/html" } });
    },

    "/client.js": () => new Response(client),
  },
});

console.log(`Preview on ${server.url}`);
