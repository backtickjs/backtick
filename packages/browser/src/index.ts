import {
  createBuiltin,
  type Client,
  type ClientHandle,
} from "@backtickjs/platform-sdk";

/**
 * The window a script is drawn in, typed with the DOM's own declarations:
 * `fetch`, timers, `console` and the rest are the browser's, as a page would
 * call them. Imported and spliced — `$window` — rather than written as a bare
 * name: a platform's globals are a value the client hands over, not words the
 * compiler knows.
 *
 * A handle, because the client owns it: what a script may hold without the
 * host ever writing one.
 */
export const window: Client<ClientHandle & Window & typeof globalThis> =
  createBuiltin("window");
