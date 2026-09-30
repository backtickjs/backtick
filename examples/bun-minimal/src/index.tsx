import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import { importMap, renderToString } from "@backtickjs/solid-js/server";
import { Counter } from "./Counter.js";

async function toHtml(element: JSX.Element): Promise<string> {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="importmap">${JSON.stringify(importMap)}</script>
  </head>
  <body>
    ${await renderToString(() => element)}
  </body>
</html>`;
}

const server = Bun.serve({
  port: 5174,
  routes: {
    "/": async () => {
      // An element saying what to draw. The component has not run yet.
      const counter = <Counter from={0} />;

      // A document carrying what it drew, with the import map it draws with.
      const html = await toHtml(counter);

      // Ordinary HTTP from here
      return new Response(html, { headers: { "content-type": "text/html" } });
    },
  },
});

console.log(`Preview on ${server.url}`);
