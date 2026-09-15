import type { ClientUnknown, ClientValue } from "@backtickjs/core";
import type { Bundle } from "@backtickjs/core";
import { render } from "./interpreter/index.js";
import type { Renderer } from "./Renderer.js";

/**
 * What a target hands this interpreter: how to build its nodes, the window a
 * script reaches through `$window`, and what it answers for beyond the names
 * the language provides itself.
 *
 * Apart rather than one, because they are answered by different things. A
 * renderer is how a host draws and a window is what it offers a script, and
 * every target has both. What a target adds beside them it answers for itself.
 */
export interface ClientOptions<NodeType extends object> {
  /** How this host builds, moves and reads its own nodes. */
  readonly renderer: Renderer<NodeType>;

  /**
   * The host's window, which the client reads from to answer `window`. Never
   * handed to a script itself: what a script reaches is the list the client
   * writes out, read through to this.
   */
  readonly window: typeof window;

  /**
   * What this target answers for, beside the language's own names and the
   * window: asked by the whole name, as the schema writes it and as the wire
   * carries it, and answering with nothing for a name it does not have.
   *
   * Asked only after the client has not answered, so a name the client already
   * answers for is never reached here: what `state` means is not a target's to
   * redecide.
   */
  readonly compileBuiltin?: (name: string) => ClientValue;
}

/**
 * Draws a bundle where it is told, and hands back what takes it down again.
 *
 * Returned rather than only used here, because a target that draws a bundle of
 * its own — one it was handed rather than one a page wrote — needs these
 * options to draw it with, and building a second set beside them is how the
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
 * Every bundle on the page is drawn with `options`: the DOM's renderer and the
 * page's window for the web's own client, and a target's `compileBuiltin`
 * beside them. A tag a target adds is one it registers with the browser, which
 * the document then builds itself.
 */
export function defineClient(options: ClientOptions<Node>): void {
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
      render(JSON.parse(data.textContent), options, parent, data);
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
