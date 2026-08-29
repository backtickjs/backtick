/**
 * A client: a renderer, a table of names, and the element that puts the two
 * together.
 *
 * An app with a name of its own — a schema declaring something this cannot
 * answer — registers the same element with its own table rather than writing a
 * second client beside this one.
 *
 * What `./bundle` publishes is this, bundled and self-starting, for a page to
 * ask for over the network.
 */
export { defineClient } from "./defineClient.js";
export type { Vocabulary } from "./defineClient.js";
export { builtins } from "./builtins.js";
export { dom } from "./dom.js";
