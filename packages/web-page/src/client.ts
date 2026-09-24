/**
 * The browser half: finds the bundles a document carries and draws each one
 * where its script stands.
 *
 * An app with names of its own hands `defineClient` its `globals` rather than
 * writing a second client beside this one.
 */
export { defineClient } from "./defineClient.js";
export type { ClientOptions } from "@backtickjs/web-interpreter";
