import type { Bundle, Spliceable } from "@backtickjs/core";
import { bundler, type JsxModule } from "@backtickjs/bundler";
import { importBundle } from "./client.js";

/** What runs a bundle: an adapter's client (see `createTesting`). */
export interface BundleClient {
  /** Runs a bundle, answering with what its root evaluates to. */
  evaluate<T>(run: () => T): T;
  /** Draws a bundle into a container, answering with what takes it down. */
  render(run: () => unknown, container: Element): () => void;
}

/** What makes a bundle of what the bundler answered: an adapter's compiler. */
export type Compile = <T>(
  module: JsxModule<T>,
) => { readonly code: Bundle<T> };

/**
 * Bundles a value, compiles it with `compile`, and evaluates the bundle's root
 * with `client`.
 *
 * Nothing is mounted: a root is as often data as a drawing, and data has
 * nowhere to be mounted. What comes back is what the root is: the node it
 * built, or the data it evaluated to.
 */
export async function evaluateWith<T>(
  client: BundleClient,
  compile: Compile,
  value: Spliceable<T>,
): Promise<T> {
  const { code } = compile(await bundler.run(value));
  return client.evaluate(await importBundle(code));
}

/**
 * Evaluates a bundle with `client`, for a test about a bundle the bundler
 * would never write.
 */
export async function evaluateBundleWith<T>(
  client: BundleClient,
  code: Bundle<T>,
): Promise<T> {
  return client.evaluate(await importBundle(code));
}
