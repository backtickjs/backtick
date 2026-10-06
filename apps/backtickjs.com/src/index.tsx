import { Docs } from "./pages/Docs.js";
import { Home } from "./pages/Home.js";
import { Why } from "./pages/Why.js";
import { toHtml } from "./html.js";

const server = Bun.serve({
  port: 4321,
  routes: {
    "/": async () => {
      const html = await toHtml(
        Home,
        "Backtick · A delightful programming model for React Native",
      );
      return new Response(html, { headers: { "content-type": "text/html" } });
    },
    "/why": async () => {
      const html = await toHtml(Why, "Backtick · Why Backtick");
      return new Response(html, { headers: { "content-type": "text/html" } });
    },
    "/docs": async () => {
      const html = await toHtml(Docs, "Backtick · Docs");
      return new Response(html, { headers: { "content-type": "text/html" } });
    },
  },
});

console.log(`Preview on ${server.url}`);
