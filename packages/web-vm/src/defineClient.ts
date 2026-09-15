import type { ClientUnknown, ClientValue } from "@backtickjs/core";
import type { Bundle } from "@backtickjs/core";
import { render } from "./interpreter/index.js";
import { dom } from "./dom.js";

/**
 * A target's own vocabulary: the names a script may call beside the web's.
 *
 * `compileBuiltin` is asked after the client's own names, so a name the client
 * answers is never reached — adding is a target's to do and replacing is not.
 * A tag a target adds is one it registers with the browser, which the document
 * then builds itself.
 */
export interface Vocabulary {
  readonly compileBuiltin?: (name: string) => ClientValue;
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
 * `compileBuiltin` answers for what a target adds to the web's own names,
 * asked after them, so a target may add and may not replace.
 */
export function defineClient({ compileBuiltin }: Vocabulary = {}): void {
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
        JSON.parse(data.textContent),
        { renderer: dom, window, compileBuiltin },
        parent,
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
