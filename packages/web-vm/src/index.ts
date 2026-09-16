/**
 * A client: a renderer, the names a script may call, and what draws the bundles
 * a page carries.
 *
 * An app with a name of its own — a schema declaring something this cannot
 * answer — hands `defineClient` its own `compileBuiltin` rather than writing a
 * second client beside this one.
 *
 * What `./bundle` publishes is this, bundled and self-starting, for a page to
 * ask for over the network.
 */
export { defineClient } from "./defineClient.js";
export type { ClientOptions } from "./defineClient.js";
export type { Bundle } from "@backtickjs/core";
export { renderer } from "./renderer.js";

// The interpreter beneath it, which draws through any renderer rather than only
// a page's: `@backtickjs/test-vm` drives it with a host of plain objects, and
// with a document of its own through `renderer`.
export { createInterpreter } from "./createInterpreter.js";
export type { Interpreter } from "./createInterpreter.js";
export type { RendererOptions } from "./renderer.js";
