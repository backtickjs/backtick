// The published surface for the web: one import for an app that runs in a
// browser. What it gathers is private — a consumer depends on the SDK, not on
// the packages behind it, so those stay free to be split or renamed.
//
// Today that is the client. A web server and a schema are expected to join it.
export { mount, evaluate, Element } from "@backtickjs/web-client";
export { bundle } from "@backtickjs/core";
export type { Bundle, Spliceable } from "@backtickjs/core";
