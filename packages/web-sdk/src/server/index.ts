// The server half: building a bundle and answering for it. Kept behind its own
// entry point (`@backtickjs/web-sdk/server`) so importing the SDK in a browser
// can't reach it — the client half is `.`, and the two never meet in one graph.
//
// Runtime-neutral: a `Request` in, a `Response` out. Bun serves this as it is;
// Node needs the adapter in `./server/node`.
export { createHandler } from "./handler.js";
export type { HandlerOptions, Routes, Screen } from "./handler.js";
export { renderDocument } from "./document.js";
export type { DocumentOptions } from "./document.js";
export { bundle } from "@backtickjs/core";
export type { Bundle, Spliceable } from "@backtickjs/core";
