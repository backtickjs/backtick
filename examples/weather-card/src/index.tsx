import type { BacktickElement } from "@backtickjs/core";
import { renderToString } from "@backtickjs/web-page/server";
import { WeatherCard } from "./WeatherCard.js";

// Bundle the client once at startup.
const build = await Bun.build({
  entrypoints: ["./src/client.ts"],
  minify: true,
});
const [client] = build.outputs;

// The page: the bundle in the body, followed by the client that draws it.
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

const server = Bun.serve({
  port: 5176,
  routes: {
    "/": async () => {
      const html = await toHtml(<WeatherCard />);
      return new Response(html, {
        headers: {
          "content-type": "text/html",
          "content-security-policy": "default-src 'self'",
        },
      });
    },

    "/client.js": () => new Response(client),
  },
});

console.log(`Preview on ${server.url}`);
