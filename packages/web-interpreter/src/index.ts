/**
 * The browser machine: the interpreter that runs a bundle, the renderer that
 * draws one into a document, and the names a script may call.
 *
 * Wired to a window with `createInterpreter`: its document is drawn into, and
 * its names are what a script reaches. A document is the only target: what a page draws
 * into and what a test draws into are one implementation, so a behaviour a test
 * relies on is a behaviour a browser has. `@backtickjs/web-testing` drives it with
 * a document of its own.
 *
 * Finding the bundles a document carries is a page's own half, and is
 * `@backtickjs/web-page`.
 */
export { createInterpreter } from "./createInterpreter.js";
export type { InterpreterOptions, Interpreter } from "./createInterpreter.js";
export type { Bundle } from "@backtickjs/core";
