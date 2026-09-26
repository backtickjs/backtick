import {
  type ClientHandle,
  type ClientImport,
  createImport,
} from "@backtickjs/platform-sdk";

/**
 * The window a script is drawn in, typed with the DOM's own declarations:
 * `fetch`, timers, `console` and the rest are the browser's, as a page would
 * call them. Imported and spliced — `$window` — rather than written as a bare
 * name: a platform's globals are a value the client hands over, not words the
 * compiler knows. A bundle imports it from `@backtickjs/browser/window`, which
 * the page's import map serves.
 *
 * A handle, because the client owns it: what a script may hold without the
 * host ever writing one.
 */
export const window: ClientImport<ClientHandle & Window & typeof globalThis> =
  createImport({ name: "window", from: "@backtickjs/browser/window" });
