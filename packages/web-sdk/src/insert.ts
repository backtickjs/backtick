import type { Bundle } from "@backtickjs/core";
import { parseHTML } from "linkedom";
import { island } from "./island.js";

/**
 * A document somebody else wrote, with an island drawn into it — a template from
 * another framework, a file on disk, a CMS's output.
 *
 *     insert(await readFile("index.html", "utf8"), "#cart", drawn, clientUrl);
 *
 * The island goes inside what the selector names, after what it already holds. A
 * selector matching nothing throws: a document that says where to draw and one
 * that has somewhere to draw are different claims.
 *
 * One island per call; a document with more calls again with what came back.
 *
 * The document is parsed and written out again, so what comes back is the same
 * HTML but not the same bytes.
 *
 * `clientUrl` is asked for rather than assumed: a document served under a prefix
 * has a different one, and a wrong guess draws nothing.
 */
export function insert(
  html: string,
  selector: string,
  bundle: Bundle,
  clientUrl: string,
): string {
  const { document } = parseHTML(html);
  const target = document.querySelector(selector);
  if (target === null) {
    throw new Error(
      `backtick: nothing in the document matches \`${selector}\``,
    );
  }
  target.insertAdjacentHTML("beforeend", island(bundle, clientUrl));
  return document.toString();
}
