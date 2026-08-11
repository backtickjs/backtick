import type { Bundle } from "@backtickjs/core";
import { clientUrl } from "./browserClient.js";

/**
 * A document, given backtick's part of it.
 *
 * A function rather than HTML with a marker in it, so nothing here searches or
 * parses what an app wrote: where the block goes is where the app put it.
 *
 * What it is handed is one element, and what is drawn is drawn inside it — so
 * a template says where by placement, and there is no selector to name a place
 * and no way for the name and the markup to disagree.
 *
 * This is the only way to write a `<head>`. What a head is for — a title, a
 * description, `og:` tags, a stylesheet the parser can start fetching before it
 * has read the body — is worth having only in the bytes that are served. A head
 * drawn by the client arrives after parsing, which is too late for `charset`,
 * too late for the preload scanner, and never at all for a crawler.
 */
export type Template = (backtick: string) => string;

/**
 * The document a bundle draws itself in.
 *
 * A string rather than a response, so a bundle built somewhere else — ahead of
 * time, or by something that is not this server — still has a way in. `page` is
 * this with the bundling around it.
 *
 * The page holds no JavaScript of its own: the bundle is a data block, which no
 * content policy checks, and the client is a same-origin file that
 * `default-src 'self'` already admits. So a page needs no hash, no nonce and no
 * `unsafe-inline` — and the client, being the half that never changes with what
 * is drawn, is fetched once rather than carried by every page.
 */
export function toHtml(bundle: Bundle, template: Template = plain): string {
  // A `</script` ends a script element wherever it stands, data block or not.
  // Only string values in `JSON.stringify` output can hold a `<`, and `<`
  // is an escape JSON reads the same way JavaScript does.
  const escaped = JSON.stringify(bundle).replaceAll("<", "\\u003c");
  return template(
    `<div>` +
      `<script type="application/json">${escaped}</script>` +
      `<script src="${clientUrl}"></script>` +
      `</div>`,
  );
}

// Enough to render and no more, for an app with nothing to say about the
// document. In the body, which is where a page with nothing to say about it
// wants to be drawn — and a block drawing inside itself, that placement is the
// whole of what says so.
const plain: Template = (backtick) =>
  `<!doctype html><html><head>` +
  `<meta charset="utf-8">` +
  `<meta name="viewport" content="width=device-width, initial-scale=1">` +
  `</head><body>${backtick}</body></html>`;
