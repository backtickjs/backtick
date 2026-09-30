import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import { importMap, renderToString } from "@backtickjs/solid-js/server";
import { WeatherCard } from "./WeatherCard.js";

async function toHtml(element: JSX.Element): Promise<string> {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${importMap()}
  </head>
  <body>
    ${await renderToString(() => element)}
  </body>
</html>`;
}

const server = Bun.serve({
  port: 5176,
  routes: {
    "/": async () => {
      const html = await toHtml(<WeatherCard />);
      return new Response(html, { headers: { "content-type": "text/html" } });
    },
  },
});

console.log(`Preview on ${server.url}`);
