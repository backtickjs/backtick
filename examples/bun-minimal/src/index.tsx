import type { JsxElement } from "@backtickjs/core";
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
// app quietly mangled. It counts only in the first 1024 bytes of a document, and
// only while it is being parsed.
//
// The client is asked for where this server answers for it, named for what it
// holds so a year of cache is safe to promise.
const clientUrl = `/_backtick/client-${clientHash.slice(0, 16)}.js`;
const html =
  `<!doctype html><html><head>` +
  `<meta charset="utf-8">` +
  `<meta name="viewport" content="width=device-width, initial-scale=1">` +
  `<script defer src="${clientUrl}"></script>` +
  `</head><body></body></html>`;

const started = new Date();

const page = async (content: JsxElement) =>
  new Response(insert(html, "body", await bundle(content)), {
    headers: {
      "content-type": "text/html",
      "content-security-policy": "default-src 'self'",
    },
  });

const server = Bun.serve({
  port: Number(process.env.PORT ?? 5174),
  routes: {
    "/": () => {
      return page(<Home />);
    },
    "/counter": () => {
      return page(<Counter from={0} />);
    },
    "/counter/:from": (request) => {
      return page(<Counter from={Number(request.params.from)} />);
    },
    "/about": () => {
      return page(<About started={started} />);
    },
  },
  fetch(request) {
    if (new URL(request.url).pathname === clientUrl) {
      return new Response(client, {
        headers: {
          "content-type": "text/javascript",
          "cache-control": "public, max-age=31536000, immutable",
        },
      });
    }
    return new Response("Not found", { status: 404 });
  },
});

console.log(`Preview on ${server.url}`);
