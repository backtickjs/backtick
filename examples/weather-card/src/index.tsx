import { bundler } from "@backtickjs/bundler";
import type { BacktickElement } from "@backtickjs/core";
import { WeatherCard } from "./WeatherCard.js";

// Bundle the client once at startup.
const build = await Bun.build({
  entrypoints: ["./src/client.ts"],
  target: "browser",
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
