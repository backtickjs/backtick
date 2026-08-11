import type { Bundle } from "@backtickjs/core";
import * as client from "@backtickjs/web-client";
import { insert } from "./insert.js";

/**
 * A whole HTML page drawing this bundle, ready to send.
 *
 *     await starterPage(await bundle(<Home />));
 *     await starterPage(await bundle(<Home />), `<title>Home</title>`);
 *
 * A bundle is what your components drew, as data — `bundle` runs them on the
 * server and hands you that. This writes it into a document along with the
 * client, which reads it and draws it where it runs. Both halves are in the
 * one string, so a server that can send a string can serve a backtick app.
 *
 * For getting started. The client is written into every page instead of being
 * served at its own url, which costs ~22 KB a page and caches nothing. When
 * that starts to matter, {@link insert} writes the same bundle into a document
 * you wrote yourself.
 */
export function starterPage(bundle: Bundle, head: string = ""): string {
  const html =
    `<!doctype html><html><head>` +
    `<meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    head +
    `<script>${client.source.replaceAll("</script", "<\\/script")}</script>` +
    `</head><body></body></html>`;
  return insert(html, "body", bundle);
}
