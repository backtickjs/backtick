/**
 * The browser half: finds the bundles a document carries and draws each one
 * where its script stands.
 *
 * An app with a name of its own — a schema declaring something the web client
 * cannot answer — hands `defineClient` its own `builtinOf` rather than
 * writing a second client beside this one.
 */
export { defineClient } from "./defineClient.js";
export type { InterpreterOptions } from "@backtickjs/web-interpreter";
