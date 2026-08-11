import { createServer } from "node:http";
import { URLPattern } from "node:url";
import { bundle } from "@backtickjs/core";
import { client, clientHash, insert } from "@backtickjs/web-sdk";
import { About } from "./About.js";
import { Counter } from "./Counter.js";
import { Home } from "./Home.js";

// The document this app serves. Its head is its own — a charset, a viewport, and
// the one script that draws what `insert` puts in the body.
//
// `charset` is not decoration: a bundle is UTF-8 text read back with
// `JSON.parse`, and a document decoded as anything else is every string in the
// app quietly mangled. It counts only in the first 1024 bytes, and only while
// parsing.
//
// The client is asked for at the same url this server answers on, named for what
// it holds so a year of cache is safe to promise.
const clientUrl = `/_backtick/client-${clientHash.slice(0, 16)}.js`;
const shell =
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
      outgoing.end(client);
      return;
    }
    for (const { pattern, handler } of matchers) {
      const found = pattern.exec({ pathname });
      if (found !== null) {
        const html = insert(
          shell,
          "body",
          await bundle(handler(found.pathname.groups)),
        );
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
