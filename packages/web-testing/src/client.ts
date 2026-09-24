import type { Bundle, ClientUnknown } from "@backtickjs/core";
import { createRuntime } from "@backtickjs/web-interpreter";
import type { Runtime } from "@backtickjs/web-interpreter";
import { defined } from "./cleanup.js";

/**
 * The runtime a test draws with. A bundle runs in this realm, not the
 * document's, so the client's globals are this realm's.
 */
export function testRuntime(
  globals: { readonly [name: string]: unknown } = {},
): Runtime<Node> {
  for (const name of Object.keys(globals)) {
    defined.add(name);
  }
  return createRuntime({ window, globals, global: globalThis });
}

/** A bundle behind a function, run as a script runs one: with `eval`. */
export function runOf<T extends ClientUnknown>(code: Bundle<T>): () => T {
  return () => (0, eval)(code);
}
