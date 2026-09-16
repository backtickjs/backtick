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
import type { Bundle, ClientUnknown, ClientValue } from "@backtickjs/core";
import { createInterpreter } from "@backtickjs/web-vm";
import type { RendererOptions } from "@backtickjs/web-vm";
import { testRenderer } from "./host.js";
import type { TestNode } from "./host.js";
import { window } from "./window.js";

export { isTestNode, isText, recordingHost, testRenderer } from "./host.js";
export type { TestNode, Write } from "./host.js";
export { renderDocument } from "./renderDocument.js";
export type { DocumentOptions, Drawn } from "./renderDocument.js";

/** What a test changes about the VM a bundle runs in. */
export interface TestOptions {
  /**
   * How nodes are built: `testRenderer` unless a test watches how the host is
   * spoken to rather than what it ends up holding.
   */
  readonly renderer?: RendererOptions<TestNode>;

  /**
   * Names beside the client's own, as a target answers for its own: asked by
   * the whole name, and answering with nothing for one it does not have.
   */
  readonly builtinOf?: (name: string) => ClientValue;
}

export interface RenderOptions extends TestOptions {
  /** One of the parent's children to draw in front of, as a page's script is. */
  readonly anchor?: TestNode;
}

/**
 * Evaluates a bundle's root, building whatever it draws out of plain objects.
 *
 * Nothing is mounted: a root is as often a value as a tree, and a value has
 * nowhere to be mounted. What comes back is what the root is — the node it
 * drew, or the data it evaluated to.
 */
export function evaluate<Value extends ClientUnknown>(
  bundle: Bundle<Value>,
  { renderer = testRenderer, builtinOf }: TestOptions = {},
): Value {
  return createInterpreter(renderer, { window, builtinOf }).eval(bundle);
}

/**
 * Draws a bundle into `parent`, after what it already holds or in front of
 * `anchor`, and answers with what takes the drawing down again.
 */
export function render(
  bundle: Bundle<ClientUnknown>,
  parent: TestNode,
  { renderer = testRenderer, anchor, builtinOf }: RenderOptions = {},
): () => void {
  return createInterpreter(renderer, { window, builtinOf }).render(
    bundle,
    parent,
    anchor,
  );
}
