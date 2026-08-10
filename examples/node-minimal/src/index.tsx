import { createServer } from "node:http";
import { URLPattern } from "node:url";
import { page } from "@backtickjs/web-sdk";
import { About } from "./About.js";
import { Counter } from "./Counter.js";
import { Home } from "./Home.js";

const started = new Date();

type Params = Record<string, string | undefined>;

const routes = {
  "/": () => {
    return <Home />;
  },
  "/counter": () => {
    return <Counter from={0} />;
  },
  "/counter/:from": ({ from }: Params) => {
    return <Counter from={Number(decodeURIComponent(from!))} />;
  },
  "/about": () => {
    return <About started={started} />;
  },
};

const matchers = Object.entries(routes).map(([path, handler]) => ({
  pattern: new URLPattern({ pathname: path }),
  handler,
}));

const port = Number(process.env.PORT ?? 5173);

createServer(async (incoming, outgoing) => {
  try {
    const [pathname = "/"] = (incoming.url ?? "/").split("?");
    for (const { pattern, handler } of matchers) {
      const found = pattern.exec({ pathname });
      if (found !== null) {
        const html = await page(handler(found.pathname.groups));
        outgoing.writeHead(200, {
          "content-type": "text/html",
          "content-security-policy": "default-src 'self'",
        });
        outgoing.end(html);
        return;
      }
    }
    outgoing.writeHead(404, { "content-type": "text/plain" });
    outgoing.end("Not found");
  } catch (error) {
    outgoing.writeHead(500, { "content-type": "text/plain" });
    outgoing.end(String(error));
  }
}).listen(port, () => {
  console.log(`Preview on http://localhost:${port}`);
});
