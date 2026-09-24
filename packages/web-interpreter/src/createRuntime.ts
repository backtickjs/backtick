import type { ClientUnknown } from "@backtickjs/core";
import { createRoot } from "solid-js";
import { createRenderer } from "solid-js/universal";
import { defineGlobals } from "./globals.js";
import type { ClientOptions } from "./globals.js";
import { rendererOptions } from "./rendererOptions.js";

/** What the runtime does with a bundle it runs behind a function. */
export interface Runtime<NodeType extends object> {
  /**
   * Draws what `run` answers with into one of the target's nodes and keeps it
   * there: a write to a state cell re-runs the props and the lists that read
   * it, and the target follows. The returned function takes it all down again.
   *
   * Drawn into the back of the target, and only what was drawn is ever moved: a
   * target the host is already holding something in keeps what it held, and
   * this goes after it.
   *
   * An anchor says where to end instead: one of the target's children, drawn in
   * front of and kept in front of, so what the host holds after it stays after
   * what is drawn. It has to stay where it is for as long as the drawing does —
   * it is what says where the drawing ends.
   */
  render(run: () => unknown, parent: NodeType, anchor?: NodeType): () => void;

  /**
   * What `run` answers with, without mounting it: the target's nodes, or plain
   * data where that is what the bundle is.
   *
   * An owner for whatever it builds, and nothing is handed back to drop it
   * with: a mount lasts as long as whoever asked for it.
   */
  evaluate<T extends ClientUnknown>(run: () => T): T;
}

/**
 * The runtime bundles run on, wired to a window: it defines the client's
 * globals once, and a bundle, which reads everything as a global, runs by
 * being evaluated.
 *
 * A document and nothing else, because a drawing is a DOM wherever one runs —
 * a page's, or one a test made. Built the way Solid builds one — options in,
 * functions out — because what is under this is Solid's own `createRenderer`.
 */
export function createRuntime(options: ClientOptions): Runtime<Node> {
  const renderer = createRenderer(rendererOptions(options.window.document));
  defineGlobals(renderer, options.global ?? options.window, options.globals);
  return {
    render: (run, parent, anchor) =>
      createRoot((dispose) => {
        renderer.insert(parent, run(), anchor);
        return dispose;
      }),
    evaluate: (run) => createRoot(run),
  };
}
