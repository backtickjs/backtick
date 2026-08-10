import { bundle, type JsxElement } from "@backtickjs/core";
import { toHtml } from "./toHtml.js";

/**
 * A page drawing this.
 *
 * The two steps between what a page holds and the document that holds it —
 * build the bundle, write the page around it — because anything answering with
 * a page takes both:
 *
 *     const html = await page(<Home />);
 *
 * Sending it is the caller's: this package makes pages, and what carries one is
 * a `node:http` response, a `Response`, or a file on disk.
 *
 * Bundling per request rather than once, because it costs about 0.03 ms for the
 * pages there are — cheaper than an API for deciding when to do it — and
 * because a page that reads the time or a database has to be built now anyway.
 * A caller with a bundle already in hand calls `toHtml` instead.
 */
export async function page(content: JsxElement): Promise<string> {
  return toHtml(await bundle(content));
}
