import type { Bundle, ClientUnknown, Spliceable } from "@backtickjs/core";
import { bundler, type CodeTransform } from "@backtickjs/bundler";
import { runOf } from "./client.js";

/** What runs a bundle: an adapter's client (see `createTesting`). */
export interface BundleClient {
  /** Runs a bundle, answering with what its root evaluates to. */
  evaluate<T>(run: () => T): T;
  /** Draws a bundle into a container, answering with what takes it down. */
  render(run: () => unknown, container: Element): () => void;
}

/**
 * Bundles a value with `transform` and evaluates the bundle's root with
 * `client`.
 *
 * Nothing is mounted: a root is as often data as a drawing, and data has
 * nowhere to be mounted. What comes back is what the root is: the node it
 * built, or the data it evaluated to.
 */
export async function evaluateWith<T extends ClientUnknown>(
  client: BundleClient,
  transform: CodeTransform,
  value: Spliceable<T>,
): Promise<T> {
  const code = await bundler.run(value, { transform });
  return client.evaluate(runOf(code));
}

/**
 * Evaluates a bundle with `client`, for a test about a bundle the bundler
 * would never write.
 */
export function evaluateBundleWith<T extends ClientUnknown>(
  client: BundleClient,
  code: Bundle<T>,
): T {
  return client.evaluate(runOf(code));
}
