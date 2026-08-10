import { readFileSync } from "node:fs";
import type { Bundle } from "@backtickjs/core";

// A page that draws itself.
//
// Everything a browser needs in one answer: the client and the bundle are both
// in the document, so once it arrives there is nothing left to fetch at all. No
// target and no element to find — what the bundle draws is the body.
//
// The document takes no options, so there is one page shape and every app gets
// it. An app that wants its own writes its own and puts these two scripts in
// itself, which is what a route returning a `Response` already allows.
//
// Carrying the client rather than linking to it is what removes the seam this
// package kept splitting on: a page had to name a URL, a server had to agree to
// serve that URL, and every scheme for keeping the two in step — hashed names, a
// manifest, rewriting the page on the way out — was complexity in service of
// that agreement. There is no URL now, so there is nothing to agree about. What
// it costs is that the client cannot be cached: it is ~13 KB gzipped on every
// page, not once per visit.

// Read once, not per request: the bytes never change while the process runs.
// `node:fs` because a page is written where a server is, and this is the only
// place in the package that reads its own build output.
const CLIENT = readFileSync(
  new URL("./browser/backtick.js", import.meta.url),
  "utf8",
);

/** The page, with the client and the bundle already in it. */
export function toHtml(bundle: Bundle): string {
  return (
    `<!doctype html><html><head>` +
    `<meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    `</head><body>` +
    // The client, byte for byte as it was built, so every page carries the same
    // script and a hash of it is worth pinning.
    `<script>${inlineable(CLIENT)}</script>` +
    // And the call that draws. `JSON.stringify` puts `<` only inside string
    // values, so writing every one of them as `<` is safe here in a way it
    // would not be over JavaScript at large.
    `<script>backtick.render(${JSON.stringify(bundle).replaceAll(
      "<",
      "\\u003c",
    )},backtick.dom,document.body);</script>` +
    `</body></html>`
  );
}

// A script element ends at the first `</script` in its text, whoever wrote it.
// Only that sequence is touched: `<` would be an escape inside a string
// but a syntax error anywhere else, so JavaScript at large cannot be escaped
// that way. `<\/script` is what a string holding this can say instead, and it
// cannot occur outside one — `</` is not an operator.
const inlineable = (js: string) => js.replaceAll("</script", "<\\/script");
