import type { JsxElement } from "@backtickjs/core";
import { page } from "@backtickjs/web-sdk";
import { About, Counter, Home } from "./screens.js";

// The same screens as `node-minimal`, served the way Bun serves: a `Request` in
// and a `Response` out. Node needs its own translation of that; here the page
// is a string and `Response` takes it directly, which is the whole difference.
const started = new Date();

const screens: { [path: string]: () => JsxElement } = {
  "/": () => <Home />,
  "/counter": () => <Counter />,
  "/about": () => <About started={started} />,
};

const server = Bun.serve({
  port: Number(process.env.PORT ?? 5174),
  async fetch(request) {
    const screen = screens[new URL(request.url).pathname];
    if (screen === undefined) {
      return new Response("Not found", { status: 404 });
    }
    return new Response(await page(screen()), {
      headers: { "content-type": "text/html" },
    });
  },
});

console.log(`Preview on ${server.url}`);
