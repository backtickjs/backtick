import type { ClientUnknown } from "@backtickjs/core";
import type { Bundle } from "@backtickjs/language";
import { createRoot } from "solid-js";
import { createRenderer } from "solid-js/universal";
import type { ClientOptions } from "./defineClient.js";
import { compile, scopeOf } from "./compile.js";

// Running a bundle under a root of its own, drawing through a renderer made
// from the target's operations. `$vm` runs one under its caller's instead: see
// `compileBuiltin`. What an element becomes is `compileElement.ts`'s.

/**
 * Renders a bundle into one of the host's nodes, and keeps it there: a write to
 * a state cell re-runs the props and the lists that read it, and the target
 * follows. The returned function takes it all down again.
 *
 * Drawn into the back of the target, and only what was drawn is ever moved: a
 * target the host is already holding something in keeps what it held, and this
 * goes after it. A target that holds nothing else needs nothing more than that.
 *
 * An anchor says where to end instead: one of the target's children, drawn in
 * front of and kept in front of, so what the host holds after it stays after
 * what is drawn. It has to stay where it is for as long as the drawing does —
 * it is what says where the drawing ends. Left out where the target holds only
 * this, which is every case with nothing to stay after.
 */
export function render<NodeType extends object>(
  bundle: Bundle<ClientUnknown>,
  options: ClientOptions<NodeType>,
  parent: NodeType,
  anchor?: NodeType,
): () => void {
  const renderer = createRenderer(options.renderer);
  return createRoot((dispose) => {
    // A new instance: the labels are per bundle, so its `functions` are too.
    const instance = { ...options, renderer, bundle, functions: new Map() };
    renderer.insert(
      parent,
      compile(instance, bundle.root)(scopeOf(null)),
      anchor,
    );
    return dispose;
  });
}
