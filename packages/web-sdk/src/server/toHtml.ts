import { readFileSync } from "node:fs";
import type { Bundle } from "@backtickjs/core";

// A page that draws itself: the client and the bundle are both in the document,
// so once it arrives nothing is fetched at all, and what the bundle draws is the
// body. Carrying the client rather than linking to it means no URL for a page
// and a server to agree on — at the cost of ~13 KB gzipped per page, never
// cached. No options, so every app gets the same page; one that wants its own
// writes it and puts these two scripts in.

// Read once: the bytes never change while the process runs.
const backtick = readFileSync(
  new URL("../browser/backtick.js", import.meta.url),
  "utf8",
);

/**
 * The document a bundle draws itself in.
 *
 * A string rather than a response, so a bundle built somewhere else — ahead of
 * time, or by something that is not this server — still has a way in. `page`
 * is this with the bundling and the response around it.
 */
export function toHtml(bundle: Bundle): string {
  const drawn = JSON.stringify(bundle).replaceAll("<", "\\u003c");
  return (
    `<!doctype html><html><head>` +
    `<meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    `</head><body>` +
    `<script>${backtick}</script>` +
    `<script>backtick.render(${drawn},backtick.dom,document.body);</script>` +
    `</body></html>`
  );
}
