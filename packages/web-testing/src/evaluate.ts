import type {
  Bundle,
  ClientUnknown,
  ClientValue,
  Spliceable,
} from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { createInterpreter } from "@backtickjs/web-interpreter";
import { testClient } from "./client.js";

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
  return testClient(builtinOf).evaluate(await bundler.run(value));
}

/**
 * Evaluates a bundle that did not come from the bundler, for a test about a
 * bundle the bundler would never write. Every other test evaluates a value
 * with {@link evaluate}.
 */
export function evaluateBundle<T extends ClientUnknown>(
  bundle: Bundle<T>,
  { builtinOf }: EvaluateOptions = {},
): T {
  return createInterpreter({ window, builtinOf }).evaluate(bundle);
}
