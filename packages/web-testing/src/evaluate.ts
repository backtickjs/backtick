import type {
  Bundle,
  ClientUnknown,
  ClientValue,
  Spliceable,
} from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { createInterpreter } from "@backtickjs/web-interpreter";

/** What a test changes about the interpreter a value runs in. */
export interface EvaluateOptions {
  /** Names beside the client's own, for a test about a target adding one. */
  readonly builtinOf?: (name: string) => ClientValue;
}

/**
 * Bundles a value and evaluates the bundle's root against the global window.
 *
 * Nothing is mounted: a root is as often data as a drawing, and data has
 * nowhere to be mounted. What comes back is what the root is: the node it
 * built, or the data it evaluated to. {@link render} is what a drawing that has
 * to stand in the page and answer to events wants instead.
 */
export async function evaluate<T extends ClientUnknown>(
  value: Spliceable<T>,
  { builtinOf }: EvaluateOptions = {},
): Promise<T> {
  const bundle = await bundler.run(value);
  return createInterpreter({ window, builtinOf }).evaluate(bundle);
}

/**
 * Evaluates a bundle that did not come from the bundler: bytes an untrusted
 * server or a tampered response could send.
 *
 * For security tests only. Every other test evaluates a value with
 * {@link evaluate}.
 */
export function evaluateUntrustedBundle<T extends ClientUnknown>(
  bundle: Bundle<T>,
  { builtinOf }: EvaluateOptions = {},
): T {
  return createInterpreter({ window, builtinOf }).evaluate(bundle);
}
