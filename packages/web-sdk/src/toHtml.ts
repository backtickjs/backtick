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
  return (
    `<!doctype html><html><head>` +
    `<meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    `<link rel="modulepreload" href="${CLIENT_URL}">` +
    `</head><body>` +
    `<script type="module">${mounting(bundle)}</script>` +
    `</body></html>`
  );
}

/** The script a page carries: import the client, draw the bundle, done. */
function mounting(bundle: Bundle): string {
  return escaped(
    `import{mount}from${JSON.stringify(CLIENT_URL)};` +
      `mount(${JSON.stringify(bundle)},{target:document.body});`,
  );
}

// A script element ends at the first `</script>` in its text, whoever wrote it,
// so no `<` may survive into one. To a JavaScript parser this is the same
// character.
const escaped = (source: string) => source.replaceAll("<", "\\u003c");
