import type { BacktickElement } from "@backtickjs/core";
import { renderToString } from "@backtickjs/web-page/server";
import { Report } from "./Report.js";

// Bundle the client once at startup.
const build = await Bun.build({
  entrypoints: ["./src/client.ts"],
  minify: true,
});
const [client] = build.outputs;
const clientUrl = `/client-${client.hash}.js`;

async function toHtml(element: BacktickElement): Promise<string> {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Backtick conformance</title>
  </head>
  <body style="margin: 32px; font: 14px/1.5 ui-monospace, monospace; white-space: pre-wrap">
    ${await renderToString(element, clientUrl)}
  </body>
</html>`;
}

const server = Bun.serve({
  port: 5176,
  routes: {
    "/": async (request) => {
      // `?grep=` runs only the cases whose name holds it.
      const grep = new URL(request.url).searchParams.get("grep") ?? "";

      // An element saying what to draw. The component has not run yet.
      const report = <Report grep={grep} />;

      // A document carrying what it drew, with the client that draws it.
      const html = await toHtml(report);

      // Ordinary HTTP from here
      return new Response(html, { headers: { "content-type": "text/html" } });
    },

    // The hash changes with the client, so the browser can keep this forever.
    [clientUrl]: () =>
      new Response(client, {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      }),
  },
});

console.log(`Preview on ${server.url}`);
