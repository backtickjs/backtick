// The published surface for the web: one import for an app that runs in a
// browser. What it gathers is private — a consumer depends on the SDK, not on
// the packages behind it, so those stay free to be split or renamed.
//
// The client half. The server is `@backtickjs/web-sdk/server`, kept apart so a
// browser bundling this entry never pulls in a runtime API.
export { mount, evaluate, Element, isElement } from "./client/index.js";
export type { MountOptions } from "./client/index.js";
export { draw, drawFrom } from "./client/index.js";
export type { Drawn } from "./Drawn.js";
export { bundle } from "@backtickjs/core";
export type { Bundle, Spliceable } from "@backtickjs/core";
