import type { Bundle } from "@backtickjs/core";
import { parseHTML } from "linkedom";

/**
 * A document somebody else wrote, with a bundle drawn into it — a template from
 * another framework, a file on disk, a CMS's output.
 *
 *     insert(await readFile("index.html", "utf8"), "#cart", bundle);
 *
 * What is drawn goes inside what the selector names, after what it already holds,
 * and draws in that place — so what follows it in the markup stays after what it
 * draws. A selector matching nothing throws: a document that says where to draw
 * and one that has somewhere to draw are different claims.
 *
 * One bundle per call; a document with more calls again with what came back.
 *
 * The document has to ask for the client itself — one `<script>` anywhere in it,
 * which is also where a CDN, an `integrity` or a `crossorigin` would go. Without
 * it the bundles are data nothing draws.
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
  // Set rather than spelled into markup: serialization escapes an attribute's
  // value, so nothing here has to know which characters would end it.
  const element = document.createElement("backtick-renderer");
  element.setAttribute("bundle", JSON.stringify(bundle));
  target.append(element);
  return document.toString();
}
