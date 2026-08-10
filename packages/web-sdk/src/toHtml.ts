import type { Bundle } from "@backtickjs/core";
import { client } from "./render.js";

/**
 * The document a bundle draws itself in.
 *
 * A string rather than a response, so a bundle built somewhere else — ahead of
 * time, or by something that is not this server — still has a way in. `page` is
 * this with the bundling and the response around it.
 *
 * A whole document, so it has a body of its own to render into and needs no
 * selector. A document that already exists reaches for `render` instead.
 */
export function toHtml(bundle: Bundle): string {
  // A `</script` ends a script element wherever it stands, data block or not.
  // Only string values in `JSON.stringify` output can hold a `<`, and `<`
  // is an escape JSON reads the same way JavaScript does.
  const escaped = JSON.stringify(bundle).replaceAll("<", "\\u003c");
  return (
    `<!doctype html><html><head>` +
    `<meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    `</head><body>` +
    `<script type="application/json" data-backtick="body">${escaped}</script>` +
    `<script>${client}</script>` +
    `</body></html>`
  );
}
