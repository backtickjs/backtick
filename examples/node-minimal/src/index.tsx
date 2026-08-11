import { createServer } from "node:http";
import { URLPattern } from "node:url";
import { bundle } from "@backtickjs/core";
import * as client from "@backtickjs/web-client";
import { insert } from "@backtickjs/web-sdk";
import { About } from "./About.js";
import { Counter } from "./Counter.js";
import { Home } from "./Home.js";

// The client is asked for at a name that says what it holds, so a rebuilt client
// is a name no cache has an old answer for — which is what makes the year this
// server promises for it below safe.
const clientUrl = `/_backtick/client-${client.sha256.slice(0, 16)}.js`;

// The document this app serves. Its head is its own — a charset, a viewport, and
// the one script that draws what `insert` puts in the body.
//
// `charset` is not decoration: a bundle is UTF-8 text read back with
// `JSON.parse`, and a document decoded as anything else is every string in the
// app quietly mangled. It counts only in the first 1024 bytes, and only while
// parsing.
const html =
  `<!doctype html><html><head>` +
  `<meta charset="utf-8">` +
  `<meta name="viewport" content="width=device-width, initial-scale=1">` +
  `<script defer src="${clientUrl}"></script>` +
  `</head><body></body></html>`;

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
    if (pathname === clientUrl) {
      outgoing.writeHead(200, {
        "content-type": "text/javascript",
        "cache-control": "public, max-age=31536000, immutable",
      });
      outgoing.end(client.source);
      return;
    }
    for (const { pattern, handler } of matchers) {
      const found = pattern.exec({ pathname });
      if (found !== null) {
        const page = insert(
          html,
          "body",
          await bundle(handler(found.pathname.groups)),
        );
        outgoing.writeHead(200, {
          "content-type": "text/html",
          "content-security-policy": "default-src 'self'",
        });
        outgoing.end(page);
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
