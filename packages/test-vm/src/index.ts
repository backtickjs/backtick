/**
 * The web VM, drawing into a document of its own: a script rendered in a test,
 * read the way Testing Library reads a page — `screen.getByRole`,
 * `userEvent.click`.
 *
 * The interpreter is `@backtickjs/web-interpreter`'s own and the DOM is happy-dom's, so
 * what a test exercises is what a page runs, down to what a real `insertBefore`
 * does. A target of plain objects would be a second set of behaviours to keep
 * true to a browser's, and the difference between them is what a test would
 * stop catching.
 *
 * Reactive only where Solid resolves to its browser build, which is what
 * `--conditions=browser` asks Node for.
 */
import type { Bundle, ClientUnknown, ClientValue } from "@backtickjs/core";
import { createInterpreter } from "@backtickjs/web-interpreter";
import { window } from "./window.js";

export { isNode, isText, listenersOf } from "./node.js";
export { render, screen } from "./render.js";
export type { DrawOptions, Rendered, RenderOptions } from "./render.js";
export { userEvent } from "@testing-library/user-event";

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
 * drew, or the data it evaluated to. `render` is what a drawing that has to
 * stand in a page and answer to events wants instead.
 */
export function evaluate<Value extends ClientUnknown>(
  bundle: Bundle<Value>,
  { builtinOf }: TestOptions = {},
): Value {
  return createInterpreter({ window, builtinOf }).eval(bundle);
}
