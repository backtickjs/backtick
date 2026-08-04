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
import { render } from "@backtickjs/js-interpreter";
import { dom } from "./dom.js";

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
 * cell re-runs the props and the lists that read it, and the target follows.
 *
 * The bundle is data — build it with `bundle()` on the server and ship the
 * JSON. Nothing here compiles or bundles; this is the web half of the client,
 * and the half above it (evaluating the bundle) is the same on every target,
 * which is why the DOM arrives as an argument rather than as an assumption.
 */
export function mount(bundle: Bundle, { target }: MountOptions): void {
  // Built once, and nothing asks it to build again: what a write moves is read
  // by whoever holds it, so the nodes keep themselves right.
  render(bundle, dom, target);
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
