import { createServer } from "node:http";
import type { JsxElement } from "@backtickjs/core";
import { page } from "@backtickjs/web-sdk";
import { About, Counter, Home } from "./screens.js";

// One screen per path, drawn when the path is asked for and answered whole.
//
// The SDK writes the page and nothing else — no routing, no listener — so what
// is left here is `node:http` and a lookup. `/about` reports the uptime at the
// moment of the request rather than the moment the server started, because a
// screen is built when it is asked for.
const started = new Date();

const screens: { [path: string]: () => JsxElement } = {
  "/": () => <Home />,
  "/counter": () => <Counter />,
  "/about": () => <About started={started} />,
};

const port = Number(process.env.PORT ?? 5173);

createServer((incoming, outgoing) => {
  const screen = screens[incoming.url ?? "/"];
  if (screen === undefined) {
    outgoing.writeHead(404, { "content-type": "text/plain" });
    outgoing.end("Not found");
    return;
  }
  void page(screen()).then(
    (html) => {
      outgoing.writeHead(200, { "content-type": "text/html" });
      outgoing.end(html);
    },
    (error: unknown) => {
      outgoing.writeHead(500, { "content-type": "text/plain" });
      outgoing.end(String(error));
    },
  );
}).listen(port, () => {
  console.log(`Preview on http://localhost:${port}`);
});
