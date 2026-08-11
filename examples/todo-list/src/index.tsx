import { createServer } from "node:http";
import { URLPattern } from "node:url";
import { bundle } from "@backtickjs/core";
import { clientAsset, insert } from "@backtickjs/web-sdk";
import { TodoList } from "./TodoList.js";

// The document this app serves. Its head is its own — a charset, a viewport, and
// the one script that draws what `insert` puts in the body.
//
// `charset` is not decoration: a bundle is UTF-8 text read back with
// `JSON.parse`, and a document decoded as anything else is every string in the
// app quietly mangled. It counts only in the first 1024 bytes of a document, and
// only while it is being parsed.
const asset = clientAsset();
const html =
  `<!doctype html><html><head>` +
  `<meta charset="utf-8">` +
  `<meta name="viewport" content="width=device-width, initial-scale=1">` +
  `<script defer src="${asset.url}"></script>` +
  `</head><body></body></html>`;

const routes = {
  "/": () => {
    return <TodoList />;
  },
};

const matchers = Object.entries(routes).map(([path, handler]) => ({
  pattern: new URLPattern({ pathname: path }),
  handler,
}));

const port = Number(process.env.PORT ?? 5175);

createServer(async (incoming, outgoing) => {
  try {
    const [pathname = "/"] = (incoming.url ?? "/").split("?");
    if (pathname === asset.url) {
      outgoing.writeHead(200, asset.headers);
      outgoing.end(asset.source);
      return;
    }
    for (const { pattern, handler } of matchers) {
      if (pattern.exec({ pathname }) !== null) {
        const page = insert(html, "body", await bundle(handler()));
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
