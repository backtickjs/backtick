/**
 * What the format owns, wherever a schema names one.
 *
 * Written by hand in this package rather than declared in a layer, so a ref to
 * one is an import from here — not a name the layer that happened to declare it
 * has to publish and every layer above has to hand on.
 */
export const format: ReadonlySet<string> = new Set([
  "BacktickElement",
  "Children",
  "Client",
  "ClientElement",
  "ClientFunction",
  "ClientHandle",
  "ClientUnknown",
  "ClientValue",
  "Prop",
  "ServerComponent",
]);
