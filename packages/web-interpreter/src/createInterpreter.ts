import type { ClientUnknown, ClientValue } from "@backtickjs/core";
import type { Bundle } from "@backtickjs/language";
import { createRoot } from "solid-js";
import { createRenderer } from "solid-js/universal";
import { rendererOptions } from "./rendererOptions.js";
import { compile, scopeOf } from "./compile.js";

/**
 * The names a script may reach: the window it reaches them through, and what a
 * target answers for beyond the names the language provides itself.
 *
 * Beside the renderer rather than holding it, because the two are answered by
 * different things — how a target draws, and what it lets a script say — and a
 * bundle drawn through a second renderer still says the same names.
 */
export interface InterpreterOptions {
  /**
   * The page's window, which the client reads from to answer `window`. Never
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
  readonly builtinOf?: (name: string) => ClientValue;
}

/** What the interpreter does with a bundle, once it has a target to do it on. */
export interface Interpreter<NodeType extends object> {
  /**
   * Draws a bundle into one of the target's nodes and keeps it there: a write
   * to a state cell re-runs the props and the lists that read it, and the
   * target follows. The returned function takes it all down again.
   *
   * Drawn into the back of the target, and only what was drawn is ever moved: a
   * target the host is already holding something in keeps what it held, and
   * this goes after it.
   *
   * An anchor says where to end instead: one of the target's children, drawn in
   * front of and kept in front of, so what the host holds after it stays after
   * what is drawn. It has to stay where it is for as long as the drawing does —
   * it is what says where the drawing ends. Left out where the target holds
   * only this, which is every case with nothing to stay after.
   */
  render(
    bundle: Bundle<ClientUnknown>,
    parent: NodeType,
    anchor?: NodeType,
  ): () => void;

  /**
   * Evaluates a bundle's root and builds whatever it draws, without mounting it
   * anywhere: the target's nodes, or plain data where that is what the root is.
   *
   * An owner for whatever it builds, and nothing is handed back to drop it
   * with: a mount lasts as long as whoever asked for it, and there is no
   * unmounting this to be the other half of.
   */
  eval<T extends ClientUnknown>(bundle: Bundle<T>): T;
}

/**
 * The interpreter, wired to a document: it draws with that document's nodes,
 * and a script reaches the names `options` hands over.
 *
 * A document and nothing else, because a drawing is a DOM wherever one runs —
 * a page's, or one a test made. A target of its own would be a second set of
 * behaviours to keep true to this one, and the difference between them is
 * exactly what a test would stop catching.
 *
 * Built the way Solid builds one — options in, functions out — because what is
 * under this is Solid's own `createRenderer`. Once here rather than once per
 * drawing, so every bundle a document draws is drawn through the same one.
 */
export function createInterpreter(
  document: Document,
  options: InterpreterOptions,
): Interpreter<Node> {
  const renderer = createRenderer(rendererOptions(document));

  // One per mount: what a bundle compiled to is a closure over this, so two
  // drawings of the same bundle share nothing but the renderer.
  const instanceOf = (bundle: Bundle<ClientUnknown>) => ({
    ...options,
    renderer,
    bundle,
    functions: new Map(),
  });

  return {
    render: (bundle, parent, anchor) =>
      createRoot((dispose) => {
        renderer.insert(
          parent,
          compile(instanceOf(bundle), bundle.root)(scopeOf(null)),
          anchor,
        );
        return dispose;
      }),
    eval: <T extends ClientUnknown>(bundle: Bundle<T>) =>
      createRoot(() => compile(instanceOf(bundle), bundle.root)(scopeOf(null))
      ) as T,
  };
}
