/**
 * The browser machine: the interpreter that runs a bundle, the renderer that
 * draws one into a document, and the names a script may call.
 *
 * Wired to a document with `createInterpreter`, which takes it and the names a
 * script reaches through it. A document is the only target: what a page draws
 * into and what a test draws into are one implementation, so a behaviour a test
 * relies on is a behaviour a browser has. `@backtickjs/test-vm` drives it with
 * a document of its own.
 *
 * Finding the bundles a document carries is a page's own half, and is
 * `@backtickjs/web-page`.
 */
export { createInterpreter } from "./createInterpreter.js";
export type { ClientOptions, Interpreter } from "./createInterpreter.js";
export type { Bundle } from "@backtickjs/core";
