import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { render } from "@backtickjs/solid-js";
import { solid } from "@backtickjs/solid-js/plugin";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import { importMap } from "@backtickjs/solid-js/server";
import { WeatherCard } from "./WeatherCard.js";

// Solid from a CDN, at the version the adapter is typed against.
const map = importMap("https://cdn.jsdelivr.net/npm/solid-js@1.9.14");

async function toHtml(element: JSX.Element): Promise<string> {
  // The client entry: the page's script, drawing the element into its container.
  const bundle = await bundler.build({
    input: cs`$render(
      () => $element,
      document.getElementById("app") as HTMLElement,
    )`,
    external: Object.keys(map.imports),
    plugins: [solid()],
  });
  const { code } = bundle.generate({ format: "es" });
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="importmap">${JSON.stringify(map)}</script>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="data:text/javascript,${encodeURIComponent(code)}"></script>
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
