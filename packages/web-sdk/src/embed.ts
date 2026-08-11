import { bundle, type JsxElement } from "@backtickjs/core";
import { parseHTML } from "linkedom";
import { island } from "./island.js";

/**
 * A document somebody else wrote, with islands drawn into it.
 *
 * For a page backtick does not own: a template from another framework, a file
 * on disk, a CMS's output. Each key is a selector naming what to draw into, and
 * what is drawn goes inside it, after whatever it already holds:
 *
 *     await embed(await readFile("index.html", "utf8"), {
 *       "#cart": <Cart />,
 *       "footer .subscribe": <Subscribe />,
 *     });
 *
 * `page` is the other way round — backtick writes the document and an app says
 * what goes in its head. This one takes the document as given and adds to it,
 * so nothing about it changes but the elements named.
 *
 * A selector matching nothing throws. A document that says where to draw and a
 * document that has somewhere to draw are two different claims, and a page that
 * silently drew nothing would be the same page as one that drew nothing because
 * it was asked to.
 *
 * The document is parsed and written out again rather than spliced, so what
 * comes back is a serialisation of what was read — correct HTML, and equivalent,
 * but not byte-for-byte the author's own. A build that diffs its output should
 * expect that.
 *
 * `clientUrl` says where the islands ask for the client, and is asked for rather
 * than assumed: `clientUrl` from this package is the answer for a document served
 * from an origin's root, and a document somebody else serves — under a prefix, or
 * written to a subdirectory of a build — has a different one. Nothing here can
 * tell which, and a wrong guess is a page that draws nothing.
 */
export async function embed(
  html: string,
  content: { [selector: string]: JsxElement },
  clientUrl: string,
): Promise<string> {
  const { document } = parseHTML(html);
  // Every bundle at once — they do not depend on each other, and a page with
  // several islands is the case this is for.
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
