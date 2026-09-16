/**
 * The web VM, drawing into a document of its own: a bundle run in a test, read
 * the way a page would read it — `querySelector`, `textContent`, `click`.
 *
 * The interpreter is `@backtickjs/web-vm`'s own and the DOM is happy-dom's, so
 * what a test exercises is what a page runs, down to what a real `insertBefore`
 * does. A target of plain objects would be a second set of behaviours to keep
 * true to a browser's, and the difference between them is what a test would
 * stop catching.
 *
 * Reactive only where Solid resolves to its browser build, which is what
 * `--conditions=browser` asks Node for.
 */
import type { Bundle, ClientUnknown, ClientValue } from "@backtickjs/core";
import { createInterpreter } from "@backtickjs/web-vm";
import { page, window } from "./window.js";

export { isNode, isText, listenersOf } from "./node.js";
export type { Document, Element, Node } from "./node.js";
export { openPage, renderDocument } from "./renderDocument.js";
export type { DocumentOptions, Drawn, OpenPage } from "./renderDocument.js";

/** What a test changes about the VM a bundle runs in. */
export interface TestOptions {
  /**
   * Names beside the client's own, as a target answers for its own: asked by
   * the whole name, and answering with nothing for one it does not have.
   */
  readonly builtinOf?: (name: string) => ClientValue;
}

/**
 * Evaluates a bundle's root, building whatever it draws with a document's own
 * nodes.
 *
 * Nothing is mounted: a root is as often a value as a tree, and a value has
 * nowhere to be mounted. What comes back is what the root is — the node it
 * drew, or the data it evaluated to. `openPage` is what a drawing that has to
 * stand in a page and answer to events wants instead.
 */
export function evaluate<Value extends ClientUnknown>(
  bundle: Bundle<Value>,
  { builtinOf }: TestOptions = {},
): Value {
  return createInterpreter(page.document as never, {
    window,
    builtinOf,
  }).eval(bundle);
}
