/**
 * The browser runtime: the globals a bundle draws with, the renderer that
 * draws into a document, and the names a script may call.
 *
 * Wired to a window with `createRuntime`: its document is drawn into, and the
 * globals it defines are what a bundle reads. A document is the only target:
 * what a page draws into and what a test draws into are one implementation, so
 * a behaviour a test relies on is a behaviour a browser has.
 * `@backtickjs/web-testing` drives it with a document of its own.
 *
 * Finding the bundles a document carries is a page's own half, and is
 * `@backtickjs/web-page`.
 */
export { createRuntime } from "./createRuntime.js";
export type { Runtime } from "./createRuntime.js";
export type { ClientOptions } from "./globals.js";
export type { Bundle } from "@backtickjs/core";
