import type { JsxElement } from "@backtickjs/core";
import { clientUrl } from "./browserClient.js";
import { embed } from "./embed.js";

/**
 * A page drawing this.
 *
 * The two steps between what a page holds and the document that holds it —
 * build the bundle, write the page around it — because anything answering with
 * a page takes both:
 *
 *     const html = await page(<Home />);
 *
 * The document is HTML, so an app with a `<head>` to write writes one — a file
 * on disk, a string, whatever a template engine already produced — and this
 * draws into its `<body>`:
 *
 *     const shell = await readFile("shell.html", "utf8");
 *     const html = await page(<Home />, shell);
 *
 * A `<head>` is the reason to pass one. What a head is for — a title, a
 * description, `og:` tags, a stylesheet the parser can start fetching before it
 * has read the body — is worth having only in the bytes that are served. A head
 * drawn by the client arrives after parsing, which is too late for `charset`,
 * too late for the preload scanner, and never at all for a crawler.
 *
 * Sending it is the caller's: this package makes pages, and what carries one is
 * a `node:http` response, a `Response`, or a file on disk.
 *
 * Bundling per request rather than once, because it costs about 0.03 ms for the
 * pages there are — cheaper than an API for deciding when to do it — and
 * because a page that reads the time or a database has to be built now anyway.
 *
 * Reading the document and writing it out again costs about 0.02 ms on top,
 * whatever is drawn: a bundle sits in a script, which a parser reads as text and
 * walks past, so what that costs tracks the document rather than the drawing. It
 * also means what comes back is a serialisation of what went in — the same HTML,
 * not the same bytes.
 *
 * The client is asked for at `clientUrl`, the path this package names, which is
 * the answer for a page served from an origin's root — which a page from here is.
 * A page drawing in more than one place, somewhere other than the body, or served
 * from under a prefix, is `embed` with the selectors and the url that say so.
 */
export async function page(
  content: JsxElement,
  document: string = plain,
): Promise<string> {
  return embed(document, { body: content }, clientUrl);
}

// Enough to draw in and no more, for an app with nothing to say about the
// document.
const plain =
  `<!doctype html><html><head>` +
  `<meta charset="utf-8">` +
  `<meta name="viewport" content="width=device-width, initial-scale=1">` +
  `</head><body></body></html>`;
