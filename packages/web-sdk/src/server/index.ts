// The server half: building a bundle and answering for it.
//
// `@backtickjs/web-sdk/server`, and the other half is
// `@backtickjs/web-sdk/client`. Neither is the package's default, because
// neither is what the SDK is — an import says which half it holds, and reading
// one tells you where that code runs.
//
// Runtime-neutral: a `Request` in, a `Response` out. Bun serves this as it is;
// Node needs the adapter in `./server/node`, which is the same half with a
// listener and a filesystem.
export { createHandler } from "./handler.js";
export type { Drawn } from "../Drawn.js";
export type { HandlerOptions, Mount, Route, RouteContext } from "./handler.js";
