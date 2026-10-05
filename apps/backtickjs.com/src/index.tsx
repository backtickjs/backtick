import { Home } from "./pages/Home.js";
import { toHtml } from "./html.js";

const server = Bun.serve({
  port: 4321,
  routes: {
    "/": async () => {
      const html = await toHtml(<Home />);
      return new Response(html, { headers: { "content-type": "text/html" } });
    },
  },
});

console.log(`Preview on ${server.url}`);
