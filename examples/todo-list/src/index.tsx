import { bundler } from "@backtickjs/bundler";
import * as client from "@backtickjs/web-client/bundle";
import { embed } from "@backtickjs/html-embed";
import { TodoList } from "./TodoList.js";

// The client is asked for at a name that says what it holds, so a rebuilt client
// is a name no cache has an old answer for — which is what makes the year this
// server promises for it below safe.
const clientUrl = `/_backtick/client-${client.sha256.slice(0, 16)}.js`;

// The document this app serves. Its head is its own — a charset, a viewport, and
// the one script that draws what `insert` puts in the body.
//
// `charset` is not decoration: a bundle is UTF-8 text read back with
// `JSON.parse`, and a document decoded as anything else is every string in the
// app quietly mangled. It counts only in the first 1024 bytes of a document, and
// only while it is being parsed.
const template =
  `<!doctype html><html><head>` +
  `<meta charset="utf-8">` +
  `<meta name="viewport" content="width=device-width, initial-scale=1">` +
  `<script defer src="${clientUrl}"></script>` +
  `</head><body></body></html>`;

const server = Bun.serve({
  port: 5175,
  routes: {
    "/": async () => {
      const html = embed(template, "body", await bundler.run(<TodoList />));
      return new Response(html, {
        headers: {
          "content-type": "text/html",
          "content-security-policy": "default-src 'self'",
        },
      });
    },

    // The name the document above asks for, answered here.
    [clientUrl]: () =>
      new Response(client.source, {
        headers: {
          "content-type": "text/javascript",
          "cache-control": "public, max-age=31536000, immutable",
        },
      }),
  },
});

console.log(`Preview on ${server.url}`);
