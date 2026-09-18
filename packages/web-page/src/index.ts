/**
 * The client a page loads: what finds the bundles a document carries and draws
 * each one where its script stands.
 *
 * The machine under it is `@backtickjs/web-interpreter` — the interpreter, the browser's
 * renderer, and the names a script may call. What is here is the page half: a
 * document is what says which bundles there are, and where they go.
 *
 * An app with a name of its own — a schema declaring something the web client
 * cannot answer — hands `defineClient` its own `builtinOf` rather than
 * writing a second client beside this one.
 */
export { defineClient } from "./defineClient.js";
export type { InterpreterOptions } from "@backtickjs/web-interpreter";
