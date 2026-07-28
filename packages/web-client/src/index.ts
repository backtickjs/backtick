import type { Bundle } from "@backtickjs/core";
import { evaluate } from "@backtickjs/js-interpreter";
import { renderInto } from "./dom.js";

export { Element, evaluate } from "@backtickjs/js-interpreter";

/**
 * Renders a bundle into a DOM container, and keeps it there: a write to a state
 * cell re-renders the instance that owns it and the container follows.
 *
 * The bundle is data — build it with `bundle()` on the server and ship the
 * JSON. Nothing here compiles or bundles; this is the web half of the client,
 * and the half above it (evaluating the bundle) is the same on every target.
 */
export function mount(bundle: Bundle, container: globalThis.Element): void {
  // Evaluated once. Re-rendering reads the same tree again rather than
  // re-evaluating the bundle, so instances — and the cells they own — survive.
  const tree = evaluate(bundle, () => renderInto(container, tree));
  renderInto(container, tree);
}
