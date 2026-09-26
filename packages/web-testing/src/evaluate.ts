import type { Spliceable } from "@backtickjs/core";
import { importBundle } from "./client.js";

/** What runs a bundle: an adapter's client (see `createTesting`). */
export interface BundleClient {
  /** Runs a bundle, answering with what its root evaluates to. */
  evaluate<T>(run: () => T): T;
  /** Draws a bundle into a container, answering with what takes it down. */
  render(run: () => unknown, container: Element): () => void;
}

/** What makes a bundle of a value: an adapter's `bundle`. */
export type Bundle = (value: Spliceable) => Promise<{ readonly code: string }>;

/**
 * Bundles a value with `bundle` and evaluates the bundle's root
 * with `client`.
 *
 * Nothing is mounted: a root is as often data as a drawing, and data has
 * nowhere to be mounted. What comes back is what the root is: the node it
 * built, or the data it evaluated to.
 */
export async function evaluateWith<T>(
  client: BundleClient,
  bundle: Bundle,
  value: Spliceable<T>,
): Promise<T> {
  const { code } = await bundle(value as Spliceable);
  return client.evaluate(await importBundle<T>(code));
}

/**
 * Evaluates a bundle with `client`, for a test about a bundle the bundler
 * would never write.
 */
export async function evaluateBundleWith<T>(
  client: BundleClient,
  code: string,
): Promise<T> {
  return client.evaluate(await importBundle<T>(code));
}
