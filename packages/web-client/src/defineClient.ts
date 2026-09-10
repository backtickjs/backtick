import type { ClientUnknown, ClientValue } from "@backtickjs/core";
import type { Bundle } from "@backtickjs/bundler";
import { render } from "@backtickjs-internal/js-interpreter";
import type { RendererOptions } from "@backtickjs-internal/js-interpreter";
import { builtins as webBuiltins } from "./builtins.js";
import { dom } from "./dom.js";

/**
 * A target's own vocabulary: names a script may call, and tags a bundle may
 * draw.
 *
 * Two tables because a schema declares two things. `builtins` are merged with
 * the language's by `builtinsOf`, which throws where a name is taken — adding is
 * a target's to do and replacing is not. `elements` are consulted before the
 * document is asked, so a target may name a tag the browser has never heard of,
 * which is the latitude `createElement` already takes for `svg:`.
 */
export interface Vocabulary {
  readonly builtins?: Readonly<Record<string, ClientValue>>;
  readonly elements?: Readonly<Record<string, () => Node>>;
}

/**
 * Draws a bundle where it is told, and hands back what takes it down again.
 *
 * Returned rather than only used here, because a target that draws a bundle of
 * its own — one it was handed rather than one a page wrote — needs this
 * vocabulary to draw it with, and building a second table beside it is how the
 * two drift.
 */
export type Draw = (
  bundle: Bundle<ClientUnknown>,
  target: Element,
  anchor?: Node,
) => () => void;

/**
 * The client, registered.
 *
 * An element, so the browser reports each drawing and upgrades the ones already
 * there — a page can ask for the file holding this from anywhere.
 *
 * Defined unguarded: two clients on one page is a mistake, and the registry
 * throwing is how anyone finds out.
 *
 * `builtins` is what a target adds to the web's own table. `builtinsOf` merges
 * both with the language's and throws where a name is already taken, so a
 * target may add and may not replace — which is why this takes a table rather
 * than letting one be handed in whole.
 */
export function defineClient({
  builtins = {},
  elements = {},
}: Vocabulary = {}): void {
  const renderer: RendererOptions<Node> = {
    ...dom,
    createElement: (tag) => elements[tag]?.() ?? dom.createElement(tag),
  };
  // The table beside the renderer is this target's own: `builtinsOf` merges it
  // with the language's and throws if a name here shadows one of those, so a
  // bundle means the same thing wherever it is drawn.
  const allBuiltins = {
    ...(webBuiltins as unknown as Record<string, ClientValue>),
    ...builtins,
  };
  // Every bundle the document carried, drawn where its script stands.
  //
  // Found here rather than announced from the page: a document that carried a
  // line of its own to start this would need that line allowed by its
  // `script-src`, and a bundle is data. So the client does the finding, and a
  // page carrying one carries no code.
  const drawEach = (): void => {
    for (const data of document.querySelectorAll("script[data-backtick]")) {
      const parent = data.parentNode;
      if (parent === null) {
        continue;
      }
      // In front of the script, which stays: a drawing goes on inserting after
      // it is first made and needs something that holds still to insert in
      // front of. The script is that, and shows nothing.
      render(
        JSON.parse(data.textContent ?? "") as Bundle<ClientUnknown>,
        { renderer, builtins: allBuiltins },
        parent as Element,
        data,
      );
    }
  };

  if (document.readyState === "loading") {
    throw new Error(
      "backtick: the client has to run after the document is parsed — load " +
        'it with `defer`, or inline it as `type="module"`.',
    );
  }

  drawEach();
}
