import type { Bundle, ClientUnknown, Spliceable } from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { runOf, testRuntime } from "./client.js";

/** What a test changes about the runtime a value runs in. */
export interface EvaluateOptions {
  /** Globals beside the web's, for a test about an app adding one. */
  readonly globals?: { readonly [name: string]: unknown };
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
  { globals }: EvaluateOptions = {},
): Promise<T> {
  const code = await bundler.run(value);
  return testRuntime(globals).evaluate(runOf(code));
}

/**
 * Evaluates a bundle that did not come from the bundler, for a test about a
 * bundle the bundler would never write. Every other test evaluates a value
 * with {@link evaluate}.
 */
export function evaluateBundle<T extends ClientUnknown>(
  code: Bundle<T>,
  { globals }: EvaluateOptions = {},
): T {
  return testRuntime(globals).evaluate(runOf(code));
}
