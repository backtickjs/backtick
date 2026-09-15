import type { ClientUnknown } from "@backtickjs/core";
import type { Bundle } from "@backtickjs/language";
import { createRoot } from "solid-js";
import { createRenderer, type Renderer } from "solid-js/universal";
import type { RendererOptions } from "./RendererOptions.js";
import type { ClientOptions } from "./ClientOptions.js";
import type { Instance } from "./Instance.js";
import { evaluate as evaluateNode, scopeOf } from "./interpret.js";

// Mounting: a bundle evaluated under a root of its own, drawing through a
// renderer made from the target's operations. What an element becomes is
// `compileElement.ts`'s.

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
  const renderer = rendererOf(options.renderer);
  return createRoot((dispose) => {
    renderer.insert(parent, materialize(bundle, options, renderer), anchor);
    return dispose;
  });
}

/**
 * Evaluates a bundle's root and builds whatever it draws, without mounting it
 * anywhere: the host's nodes, or plain data where that is what the root is.
 *
 * An owner for whatever it builds, and nothing is handed back to drop it with:
 * a mount lasts as long as whoever asked for it, and there is no unmounting
 * this to be the other half of.
 */
export function evaluate<NodeType extends object>(
  bundle: Bundle<ClientUnknown>,
  options: ClientOptions<NodeType>,
): unknown {
  return createRoot(() =>
    materialize(bundle, options, rendererOf(options.renderer)),
  );
}

function materialize<NodeType extends object>(
  bundle: Bundle<ClientUnknown>,
  options: ClientOptions<NodeType>,
  renderer: Renderer<NodeType>,
): unknown {
  const { window, builtins } = options;
  return evaluated(bundle, { renderer, window, builtins });
}

/**
 * A bundle, drawn with a host's renderer, window and names.
 *
 * A `functions` table per bundle, because the labels are per bundle: two
 * bundles both holding a `0` mean two different functions.
 */
export function evaluated(
  bundle: Bundle<ClientUnknown>,
  { renderer, window, builtins }: Omit<Instance, "bundle" | "functions">,
): unknown {
  // Built once: nothing above the root can hand it anything new later.
  return evaluateNode(
    { bundle, renderer, window, builtins, functions: new Map() },
    bundle.root,
    scopeOf(null),
  );
}

// A renderer per set of target operations.
function rendererOf<NodeType extends object>(
  options: RendererOptions<NodeType>,
): Renderer<NodeType> {
  return createRenderer(options);
}
