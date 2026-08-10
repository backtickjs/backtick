import type { Bundle } from "@backtickjs/core";
import { client, render } from "./render.js";

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
  return (
    `<!doctype html><html><head>` +
    `<meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    `</head><body>` +
    `<script>${client}</script>` +
    `<script>${render(bundle, { into: "body" })}</script>` +
    `</body></html>`
  );
}
