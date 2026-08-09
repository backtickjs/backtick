import type { Bundle } from "@backtickjs/core";

// A page that draws itself.
//
// Everything a browser needs in one answer: the bundle is in the document, so
// after the page arrives there is nothing left to fetch but the client. No
// target and no element to find — what the bundle draws is the body.
//
// The document takes no options, so there is one page shape and every app gets
// it. An app that wants its own writes its own and puts the bundle in itself,
// which is what a route returning a `Response` already allows.

/**
 * Where this SDK serves its client.
 *
 * `browserAssets()` builds its map from this, so the path a page writes and the
 * path the server answers cannot drift apart.
 */
export const CLIENT_URL = "/backtick.js";

/** The page, with the bundle already in it. */
export function toHtml(bundle: Bundle): string {
  // Import the client, draw the bundle, done. Every `<` is written `<`: a
  // script element ends at the first `</script>` in its text, whoever wrote it,
  // and to a JavaScript parser the two are the same character. Escaped here
  // rather than over the whole document, which is made of `<` by design.
  const script = (
    `import{dom,render}from${JSON.stringify(CLIENT_URL)};` +
    `render(${JSON.stringify(bundle)},dom,document.body);`
  ).replaceAll("<", "\\u003c");

  return (
    `<!doctype html><html><head>` +
    `<meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    `<link rel="modulepreload" href="${CLIENT_URL}">` +
    `</head><body>` +
    `<script type="module">${script}</script>` +
    `</body></html>`
  );
}
