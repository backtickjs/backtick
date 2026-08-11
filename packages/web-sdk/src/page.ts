import { bundle, type JsxElement } from "@backtickjs/core";
import { clientUrl } from "./browserClient.js";
import { insert } from "./insert.js";

/**
 * A page drawing this, into the body of `document`.
 *
 *     const html = await page(<Home />);
 *     const html = await page(<Home />, await readFile("shell.html", "utf8"));
 *
 * Pass a document to write a `<head>`. A title, `og:` tags and a stylesheet are
 * worth having only in the bytes that are served: a head drawn by the client
 * arrives too late for `charset`, for the preload scanner, and for a crawler.
 *
 * Sending it is the caller's. Drawing in more than one place, somewhere other
 * than the body, or from under a prefix, is `insert`.
 */
export async function page(
  content: JsxElement,
  document: string = plain,
): Promise<string> {
  return insert(document, "body", await bundle(content), clientUrl);
}

const plain =
  `<!doctype html><html><head>` +
  `<meta charset="utf-8">` +
  `<meta name="viewport" content="width=device-width, initial-scale=1">` +
  `</head><body></body></html>`;
