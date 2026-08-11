import { bundle, type JsxElement } from "@backtickjs/core";
import { clientUrl } from "./browserClient.js";
import { island } from "./island.js";

/**
 * A document, given backtick's part of it.
 *
 * A function rather than HTML with a marker in it, so nothing here searches or
 * parses what an app wrote: where the island goes is where the app put it.
 *
 * This is the only way to write a `<head>`. What a head is for — a title, a
 * description, `og:` tags, a stylesheet the parser can start fetching before it
 * has read the body — is worth having only in the bytes that are served. A head
 * drawn by the client arrives after parsing, which is too late for `charset`,
 * too late for the preload scanner, and never at all for a crawler.
 *
 * More than one island is a document this does not write: place them and hold
 * the string yourself, which is all this does.
 */
export type Template = (backtick: string) => string;

/**
 * A page drawing this.
 *
 * The two steps between what a page holds and the document that holds it —
 * build the bundle, write the page around it — because anything answering with
 * a page takes both:
 *
 *     const html = await page(<Home />);
 *
 * A template writes the document, so an app with a `<head>` to write still
 * answers in one call rather than outgrowing this one.
 *
 * Sending it is the caller's: this package makes pages, and what carries one is
 * a `node:http` response, a `Response`, or a file on disk.
 *
 * Bundling per request rather than once, because it costs about 0.03 ms for the
 * pages there are — cheaper than an API for deciding when to do it — and
 * because a page that reads the time or a database has to be built now anyway.
 * The client is asked for at `clientUrl`, which is the answer for a page served
 * from an origin's root — which a page from here is. A caller holding a bundle
 * already, drawing more than one thing, or serving from under a prefix, writes
 * the document around `island` itself.
 */
export async function page(
  content: JsxElement,
  template: Template = plain,
): Promise<string> {
  return template(island(await bundle(content), clientUrl));
}

// Enough to draw in and no more, for an app with nothing to say about the
// document. In the body, which is where a page with nothing to say about it
// wants to be drawn — and an island drawing where it stands, that placement is
// the whole of what says so.
const plain: Template = (backtick) =>
  `<!doctype html><html><head>` +
  `<meta charset="utf-8">` +
  `<meta name="viewport" content="width=device-width, initial-scale=1">` +
  `</head><body>${backtick}</body></html>`;
