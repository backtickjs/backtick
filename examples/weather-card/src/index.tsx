import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { render } from "@backtickjs/solid-js";
import { solid } from "@backtickjs/solid-js/plugin";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import { importMap } from "@backtickjs/solid-js/import-map";
import { version } from "@backtickjs/solid-js/version";
import { WeatherCard } from "./WeatherCard.js";

// Solid from a CDN, at the version the adapter is typed against.
const map = importMap(`https://cdn.jsdelivr.net/npm/solid-js@${version}`);

// In development, a map into the host files in each bundle, for devtools.
const sourcemap = process.env.NODE_ENV === "production" ? undefined : "inline";

async function toHtml(element: JSX.Element): Promise<string> {
  // The client entry: the page's script, drawing the element into its container.
  const bundle = await bundler.build({
    input: cs`$render(
      () => $element,
      document.getElementById("app") as HTMLElement,
    )`,
    external: { "solid-js": version },
    plugins: [solid()],
  });
  const { code } = bundle.generate({ format: "es", sourcemap });
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
