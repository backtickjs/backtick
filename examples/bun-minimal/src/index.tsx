import type { JsxElement } from "@backtickjs/core";
import { page } from "@backtickjs/web-sdk";
import { About } from "./About.js";
import { Counter } from "./Counter.js";
import { Home } from "./Home.js";

const started = new Date();

const html = async (content: JsxElement) =>
  new Response(await page(content), {
    headers: {
      "content-type": "text/html",
      "content-security-policy": "default-src 'self'",
    },
  });

const server = Bun.serve({
  port: Number(process.env.PORT ?? 5174),
  routes: {
    "/": () => {
      return html(<Home />);
    },
    "/counter": () => {
      return html(<Counter from={0} />);
    },
    "/counter/:from": (request) => {
      return html(<Counter from={Number(request.params.from)} />);
    },
    "/about": () => {
      return html(<About started={started} />);
    },
  },
});

console.log(`Preview on ${server.url}`);
