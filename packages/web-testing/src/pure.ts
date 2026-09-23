/**
 * `@backtickjs/web-testing` without the cleanup it registers, for a suite that
 * calls `cleanup` itself, as `@testing-library/react/pure` is.
 */
export * from "@testing-library/dom";
export { cleanup } from "./cleanup.js";
export { evaluate, evaluateBundle } from "./evaluate.js";
export type { EvaluateOptions } from "./evaluate.js";
export { render } from "./render.js";
export type { RenderOptions, RenderResult } from "./render.js";
