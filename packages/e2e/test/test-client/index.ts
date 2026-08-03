import type { Bundle } from "@backtickjs/core";
import { evaluate as evaluateBundle } from "@backtickjs/js-interpreter";
import type { RendererOptions } from "solid-js/universal";
import { testHost } from "./host.ts";
import type { TestNode } from "./host.ts";

export { isTestNode, isText, recordingHost, testHost } from "./host.ts";
export type { TestNode, Write } from "./host.ts";

// The interpreter itself lives in `@backtickjs/js-interpreter` — one
// implementation, so what this suite exercises is what every host runs. What
// stays here is the test-only half: a host of plain objects to build in.

/**
 * Evaluates a bundle's root, building whatever it draws out of plain objects.
 *
 * Nothing is mounted: a fixture's root is as often a value as a tree, and a
 * value has nowhere to be mounted. What comes back is what the root is — the
 * node it drew, or the data it evaluated to.
 *
 * A host of its own for a test that watches how it is spoken to rather than
 * what it ends up holding.
 */
export function evaluate(
  bundle: Bundle,
  host: RendererOptions<TestNode> = testHost,
): unknown {
  return evaluateBundle(bundle, host);
}
