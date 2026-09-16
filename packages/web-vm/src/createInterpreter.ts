import type { ClientUnknown } from "@backtickjs/core";
import type { Bundle } from "@backtickjs/language";
import { createRoot } from "solid-js";
import { createRenderer } from "solid-js/universal";
import type { ClientOptions } from "./defineClient.js";
import type { RendererOptions } from "./renderer.js";
import { compile, scopeOf } from "./compile.js";

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
 * The interpreter, wired to one target: its renderer, and the names a script
 * reaches through it.
 *
 * Built the way Solid builds one — options in, functions out — because what is
 * under this is Solid's own `createRenderer`. Once here rather than once per
 * drawing, so every bundle a target draws is drawn through the same one.
 */
export function createInterpreter<NodeType extends object>(
  options: RendererOptions<NodeType>,
  client: ClientOptions,
): Interpreter<NodeType> {
  const renderer = createRenderer(options);

  // One per mount: what a bundle compiled to is a closure over this, so two
  // drawings of the same bundle share nothing but the renderer.
  const instanceOf = (bundle: Bundle<ClientUnknown>) => ({
    ...client,
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
