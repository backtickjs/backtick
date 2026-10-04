import { App } from "./App.js";
import { toHtml } from "./html.js";

const server = Bun.serve({
  port: 5178,
  routes: {
    "/": async () => {
      const html = await toHtml(<App />);
      return new Response(html, { headers: { "content-type": "text/html" } });
    },
  },
});

console.log(`Preview on ${server.url}`);
