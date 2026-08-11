import type { Bundle } from "@backtickjs/core";
import { parseHTML } from "linkedom";
import { island } from "./island.js";

/**
 * A document somebody else wrote, with an island drawn into it — a template from
 * another framework, a file on disk, a CMS's output.
 *
 *     insert(await readFile("index.html", "utf8"), "#cart", bundle);
 *
 * The island goes inside what the selector names, after what it already holds. A
 * selector matching nothing throws: a document that says where to draw and one
 * that has somewhere to draw are different claims.
 *
 * One island per call; a document with more calls again with what came back.
 *
 * The document has to ask for the client itself — one `<script>` anywhere in it,
 * which is also where a CDN, an `integrity` or a `crossorigin` would go. Without
 * it the islands are data nothing draws.
 *
 * The document is parsed and written out again, so what comes back is the same
 * HTML but not the same bytes.
 */
export function insert(html: string, selector: string, bundle: Bundle): string {
  const { document } = parseHTML(html);
  const target = document.querySelector(selector);
  if (target === null) {
    throw new Error(
      `backtick: nothing in the document matches \`${selector}\``,
    );
  }
  target.insertAdjacentHTML("beforeend", island(bundle));
  return document.toString();
}
