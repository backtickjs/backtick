// The client half: drawing a bundle, in a browser.
//
// `@backtickjs/web-sdk/client`, and the other half is
// `@backtickjs/web-sdk/server`. Neither is the package's default, because
// neither is what the SDK is — an import says which half it holds, and reading
// one tells you where that code runs.
//
// Nothing here reaches a runtime API, so this is the half a browser can bundle,
// and `scripts/browser.mjs` bundles exactly this file into `/backtick.js`.
// Nothing here starts on its own either: a page says when to draw by carrying a
// script that calls `mount`, which is what `embedInDocument` writes.
import type { Bundle } from "@backtickjs/core";
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
