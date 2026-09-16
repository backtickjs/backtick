/**
 * The browser machine: the interpreter that runs a bundle, the renderer that
 * draws one into a document, and the names a script may call.
 *
 * Wired to a target with `createInterpreter`, which takes a renderer and the
 * names a script reaches through it — so the same interpreter draws into a page
 * and into anything else. `@backtickjs/test-vm` drives it with a host of plain
 * objects, and with a document of its own through `renderer`.
 *
 * Finding the bundles a document carries is a page's own half, and is
 * `@backtickjs/web-page`.
 */
export { createInterpreter } from "./createInterpreter.js";
export type { ClientOptions, Interpreter } from "./createInterpreter.js";
export { renderer } from "./renderer.js";
export type { RendererOptions } from "./renderer.js";
export type { Bundle } from "@backtickjs/core";
