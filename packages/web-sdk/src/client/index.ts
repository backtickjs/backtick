// The client half: drawing what a path answered with, in a browser.
//
// `@backtickjs/web-sdk/client`, and the other half is
// `@backtickjs/web-sdk/server`. Neither is the package's default, because
// neither is what the SDK is — an import says which half it holds, and reading
// one tells you where that code runs.
//
// Nothing here reaches a runtime API, so this is the half a browser can bundle.
// `browser.ts` beside it is this with `start()` already called, which is what
// the served `/backtick.js` is built from.
import type { Bundle } from "@backtickjs/core";
import type { Drawn } from "../Drawn.js";
import { evaluate } from "@backtickjs/js-interpreter";
import { applyChange, renderInto } from "./dom.js";

export { Element, isElement, evaluate } from "@backtickjs/js-interpreter";

/**
 * Where a mounted app goes, and anything else the mounting takes. An object
 * rather than the element on its own, so what a mount can be told grows
 * without the call changing shape.
 */
export interface MountOptions {
  readonly target: globalThis.Element;
}

/**
 * Renders a bundle into a DOM element, and keeps it there: a write to a state
 * cell re-renders the instance that owns it and the target follows.
 *
 * The bundle is data — build it with `bundle()` on the server and ship the
 * JSON. Nothing here compiles or bundles; this is the web half of the client,
 * and the half above it (evaluating the bundle) is the same on every target.
 */
export function mount(bundle: Bundle, { target }: MountOptions): void {
  // Evaluated once. Re-rendering reads the same tree again rather than
  // re-evaluating the bundle, so instances — and the cells they own — survive.
  // A shape change is answered by reading the tree again and drawing the
  // difference; a prop change is one attribute, and reading the tree to find it
  // would cost more than the change itself.
  const tree = evaluate(bundle, (change) => {
    if (change.kind === "shape") {
      renderInto(target, tree);
    } else {
      applyChange(change);
    }
  });
  renderInto(target, tree);
}

/**
 * Draws what a path said to draw: each bundle into the element its target
 * names.
 *
 * The page decides when this happens and says so — nothing is injected into a
 * document — but what a path answers with, and how to ask for it, is this
 * package's contract on both sides. An app writing the request itself would be
 * writing down half of `createHandler`.
 */
export function draw(drawn: readonly Drawn[]): void {
  for (const { target, bundle } of drawn) {
    const element = document.querySelector(target);
    if (element === null) {
      throw new Error(`nothing matches ${target} to mount into`);
    }
    mount(bundle, { target: element });
  }
}

/**
 * Starts a page: asks the path it is at what to draw, and draws it. That path
 * is the one that served the document, so a page says only that it is ready.
 *
 * The request is the one every other client makes: the same URL, answered with
 * data rather than the document, because a document is not what was asked for.
 */
export async function start(path = location.pathname): Promise<void> {
  const answer = await fetch(path, { headers: { accept: "application/json" } });
  if (!answer.ok) {
    throw new Error(`${path} answered ${answer.status}`);
  }
  draw((await answer.json()) as Drawn[]);
}
