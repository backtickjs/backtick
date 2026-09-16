import type { ClientUnknown, ClientValue } from "@backtickjs/core";
import type { Bundle } from "@backtickjs/language";
import { createRoot } from "solid-js";
import { createRenderer } from "solid-js/universal";
import type { ClientOptions } from "./defineClient.js";
import { compile, scopeOf } from "./compile.js";

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
): ClientValue {
  const renderer = createRenderer(options.renderer);
  return createRoot(() => {
    const instance = { ...options, renderer, bundle, functions: new Map() };
    return compile(instance, bundle.root)(scopeOf(null));
  });
}
