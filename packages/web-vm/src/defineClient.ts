import type { ClientValue } from "@backtickjs/core";
import { render } from "./render.js";
import { renderer } from "./renderer.js";
import type { Renderer } from "./renderer.js";

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
 * Draws every bundle a page carries, where its script stands.
 *
 * A window is all a page hands over: its document is what is drawn into, and a
 * script reaches the window itself through `$window`. `compileBuiltin` answers
 * for what an app adds to the web's own names, asked after them, so an app may
 * add and may not replace. A tag an app adds is one it registers with the
 * browser, which the document then builds itself.
 */
export function defineClient({
  window,
  compileBuiltin,
}: Omit<ClientOptions<Node>, "renderer">): void {
  // A window carries the document it is of, so a page hands over one thing.
  const document = window.document;
  const options = { renderer: renderer(document), window, compileBuiltin };

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
