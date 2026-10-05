import { Docs } from "./pages/Docs.js";
import { Home } from "./pages/Home.js";
import { toHtml } from "./html.js";

const server = Bun.serve({
  port: 4321,
  routes: {
    "/": async () => {
      const html = await toHtml(
        <Home />,
        "Backtick · Server-driven React Native",
      );
      return new Response(html, { headers: { "content-type": "text/html" } });
    },
    "/docs": async () => {
      const html = await toHtml(<Docs />, "Backtick · Docs");
      return new Response(html, { headers: { "content-type": "text/html" } });
    },
  },
});

console.log(`Preview on ${server.url}`);
