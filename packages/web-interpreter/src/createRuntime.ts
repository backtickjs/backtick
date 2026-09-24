import type { ClientUnknown, ClientValue } from "@backtickjs/core";
import type { Bundle } from "@backtickjs/platform-sdk";
import { createRoot } from "solid-js";
import { createRenderer } from "solid-js/universal";
import { defineGlobals } from "./globals.js";
import type { ClientOptions } from "./globals.js";
import type { Instance } from "./Instance.js";
import { rendererOptions } from "./rendererOptions.js";

/** A printed bundle behind a function, so it runs once the client is ready. */
export type Program = () => ClientValue;

/** What the runtime does with a program: `Interpreter`'s two, for one. */
export interface PrintedRuntime<NodeType extends object> {
  render(program: Program, parent: NodeType, anchor?: NodeType): () => void;
  evaluate<T extends ClientUnknown>(program: () => T): T;
}

/**
 * The runtime printed bundles run on, wired to a window as the interpreter is.
 * A printed bundle reads everything as a global, so this defines the client's
 * globals once, and running one is calling it.
 */
export function createRuntime(options: ClientOptions): PrintedRuntime<Node> {
  const renderer = createRenderer(rendererOptions(options.window.document));
  // `evaluate` still interprets the bundle it is handed, so it gets a bundle
  // of its own there.
  const instance: Instance = {
    renderer,
    global: options.global ?? options.window,
    bundle: { functions: {}, root: null } as unknown as Bundle<ClientUnknown>,
    functions: new Map(),
  };
  defineGlobals(instance, options.globals);
  return {
    render: (program, parent, anchor) =>
      createRoot((dispose) => {
        renderer.insert(parent, program(), anchor);
        return dispose;
      }),
    evaluate: (program) => createRoot(program),
  };
}
