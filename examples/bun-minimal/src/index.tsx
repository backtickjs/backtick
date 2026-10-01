import { Counter } from "./Counter.js";
import { toHtml } from "./html.js";

const server = Bun.serve({
  port: 5174,
  routes: {
    "/": async () => {
      const html = await toHtml(<Counter from={0} />);
      return new Response(html, { headers: { "content-type": "text/html" } });
    },
  },
});

console.log(`Preview on ${server.url}`);
