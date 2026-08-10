import { readFileSync } from "node:fs";
import type { Bundle } from "@backtickjs/core";
import { toDataScript } from "./toDataScript.js";

/**
 * The client, as a browser can run it.
 *
 * Put it in a `<script>`, or serve it as a file. Once per document, however
 * many things that document draws — it finds every one of them itself, so
 * nothing writes a call to go with it.
 *
 * Needs no escaping on the way in: esbuild writes `<\/script` inside string
 * literals, which is what lets it be inlined verbatim.
 */
export const client: string = readFileSync(
  new URL("./browser/client.js", import.meta.url),
  "utf8",
);

/**
 * The document a bundle draws itself in.
 *
 * A string rather than a response, so a bundle built somewhere else — ahead of
 * time, or by something that is not this server — still has a way in. `page` is
 * this with the bundling and the response around it.
 *
 * A whole document, so it has a body of its own to render into and needs no
 * selector. A document that already exists carries `toDataScript` and the
 * client itself, which is what the benchmark does.
 */
export function toHtml(bundle: Bundle): string {
  return (
    `<!doctype html><html><head>` +
    `<meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    `</head><body>` +
    toDataScript(bundle, "body") +
    `<script>${client}</script>` +
    `</body></html>`
  );
}
