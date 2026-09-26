/**
 * `@backtickjs/web-testing` without the cleanup it registers, for a suite that
 * calls `cleanup` itself, as `@testing-library/react/pure` is.
 */
export * from "@testing-library/dom";
export { cleanup } from "./cleanup.js";
export type { Bundle, BundleClient } from "./evaluate.js";
export { createTesting, type Testing } from "./createTesting.js";
export type { RenderOptions, RenderResult } from "./render.js";
