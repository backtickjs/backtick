import { bundle, type JsxElement } from "@backtickjs/core";
import * as client from "@backtickjs/web-client";
import { insert } from "./insert.js";

/**
 * A whole HTML page drawing this element, ready to send.
 *
 *     await starterPage(<Home />);
 *     await starterPage(<Home />, `<title>Home</title>`);
 *
 * Your component runs here, on the server, and what it draws is written into
 * the page as a bundle — data, not JavaScript. The client reads that bundle in
 * the browser and draws it. Both halves are in the one string this returns, so
 * a server that can send a string can serve a backtick app.
 *
 * For getting started. The client is written into every page instead of being
 * served at its own url, which costs ~22 KB a page and caches nothing.
 */
export async function starterPage(
  element: JsxElement,
  head: string = "",
): Promise<string> {
  const html =
    `<!doctype html><html><head>` +
    `<meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    head +
    `<script>${client.source.replaceAll("</script", "<\\/script")}</script>` +
    `</head><body></body></html>`;
  return insert(html, "body", await bundle(element));
}
