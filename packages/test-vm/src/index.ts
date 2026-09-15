/**
 * The web VM, drawing into plain objects instead of a DOM: a bundle run in a
 * test, with nothing but objects a test can read and handlers it can call.
 *
 * The interpreter is `@backtickjs/web-vm`'s own — one implementation, so what a
 * test exercises is what a page runs. What is here is the test half: a host of
 * plain objects to build in, and a window whose timers are the process's.
 *
 * Reactive only where Solid resolves to its browser build, which is what
 * `--conditions=browser` asks Node for.
 */
import type { Bundle, ClientUnknown } from "@backtickjs/core";
import {
  evaluate as evaluateBundle,
  render as renderBundle,
} from "@backtickjs/web-vm";
import type { ClientOptions, Renderer } from "@backtickjs/web-vm";
import { testRenderer } from "./host.js";
import type { TestNode } from "./host.js";
import { window } from "./window.js";

export { isTestNode, isText, recordingHost, testRenderer } from "./host.js";
export type { TestNode, Write } from "./host.js";

/** What a test changes about the VM a bundle runs in. */
export interface TestOptions {
  /**
   * How nodes are built: `testHost` unless a test watches how the host is
   * spoken to rather than what it ends up holding.
   */
  readonly renderer?: Renderer<TestNode>;
}

export interface RenderOptions extends TestOptions {
  /** One of the parent's children to draw in front of, as a page's script is. */
  readonly anchor?: TestNode;
}

// A window under every bundle, because a timer is the client's rather than the
// language's and a bundle that waits splices one.
function clientOptions({
  renderer = testRenderer,
}: TestOptions): ClientOptions<TestNode> {
  return {
    renderer,
    window,
  };
}

/**
 * Evaluates a bundle's root, building whatever it draws out of plain objects.
 *
 * Nothing is mounted: a root is as often a value as a tree, and a value has
 * nowhere to be mounted. What comes back is what the root is — the node it
 * drew, or the data it evaluated to.
 */
export function evaluate(
  bundle: Bundle<ClientUnknown>,
  options: TestOptions = {},
): unknown {
  return evaluateBundle(bundle, clientOptions(options));
}

/**
 * Draws a bundle into `parent`, after what it already holds or in front of
 * `anchor`, and answers with what takes the drawing down again.
 */
export function render(
  bundle: Bundle<ClientUnknown>,
  parent: TestNode,
  options: RenderOptions = {},
): () => void {
  return renderBundle(bundle, clientOptions(options), parent, options.anchor);
}
