import { bundle, type JsxElement } from "@backtickjs/core";
import { parseHTML } from "linkedom";
import { island } from "./island.js";

/**
 * A document somebody else wrote, with islands drawn into it — a template from
 * another framework, a file on disk, a CMS's output.
 *
 *     await embed(await readFile("index.html", "utf8"), {
 *       "#cart": <Cart />,
 *       "footer .subscribe": <Subscribe />,
 *     }, clientUrl);
 *
 * Each island goes inside what its selector names, after what it already holds.
 * A selector matching nothing throws: a document that says where to draw and one
 * that has somewhere to draw are different claims.
 *
 * The document is parsed and written out again, so what comes back is the same
 * HTML but not the same bytes.
 *
 * `clientUrl` is asked for rather than assumed: a document served under a prefix
 * has a different one, and a wrong guess draws nothing.
 */
export async function embed(
  html: string,
  content: { [selector: string]: JsxElement },
  clientUrl: string,
): Promise<string> {
  const { document } = parseHTML(html);
  const drawn = await Promise.all(
    Object.entries(content).map(
      async ([selector, element]) =>
        [selector, island(await bundle(element), clientUrl)] as const,
    ),
  );
  for (const [selector, drawing] of drawn) {
    const target = document.querySelector(selector);
    if (target === null) {
      throw new Error(
        `backtick: nothing in the document matches \`${selector}\``,
      );
    }
    target.insertAdjacentHTML("beforeend", drawing);
  }
  return document.toString();
}
