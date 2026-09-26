import type { Bundle, ClientUnknown, Spliceable } from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { runOf, testRuntime } from "./client.js";

/** What runs a bundle: an adapter's client (see `createTesting`). */
export interface BundleClient {
  /** Runs a bundle, answering with what its root evaluates to. */
  evaluate<T>(run: () => T): T;
  /** Draws a bundle into a container, answering with what takes it down. */
  render(run: () => unknown, container: Element): () => void;
}

/** What a test changes about the runtime a value runs in. */
export interface EvaluateOptions {
  /**
   * Globals beside the web's, for a test about an app adding one. Only where
   * no client is bound: `web-interpreter`'s.
   */
  readonly globals?: { readonly [name: string]: unknown };
}

// The client where none is bound: `web-interpreter`, for the tests not yet on
// an adapter. It goes with `web-interpreter`.
export function defaultClient({ globals }: EvaluateOptions): BundleClient {
  return testRuntime(globals) as unknown as BundleClient;
}

/** Bundles a value and evaluates the bundle's root with `client`. */
export async function evaluateWith<T extends ClientUnknown>(
  client: BundleClient,
  value: Spliceable<T>,
): Promise<T> {
  const code = await bundler.run(value);
  return client.evaluate(runOf(code));
}

/** Evaluates a bundle with `client`. */
export function evaluateBundleWith<T extends ClientUnknown>(client: BundleClient, code: Bundle<T>): T {
  return client.evaluate(runOf(code));
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
  options: EvaluateOptions = {},
): Promise<T> {
  return evaluateWith(defaultClient(options), value);
}

/**
 * Evaluates a bundle that did not come from the bundler, for a test about a
 * bundle the bundler would never write. Every other test evaluates a value
 * with {@link evaluate}.
 */
export function evaluateBundle<T extends ClientUnknown>(
  code: Bundle<T>,
  options: EvaluateOptions = {},
): T {
  return evaluateBundleWith(defaultClient(options), code);
}
