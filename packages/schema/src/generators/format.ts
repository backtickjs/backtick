/**
 * What the format owns, wherever a schema names one.
 *
 * Written by hand in this package rather than declared in a layer, so a ref to
 * one is an import from here — not a name the layer that happened to declare it
 * has to publish and every layer above has to hand on.
 *
 * Every name here is a hole in a schema: a ref the document does not declare
 * and a reader outside this repository cannot resolve. The shorter this is, the
 * more a schema is worth on its own, so a name that nothing needs comes out.
 *
 * Only what a schema *refs*. What the generator writes around a declaration of
 * its own accord — `Prop`, `Client` — is the generator's list and lives beside
 * the code that writes it, because a reader of a schema never meets one.
 *
 * The way to tell whether a name here is still needed is to remove it,
 * regenerate, and build. A `Type.Ref` audit alone will not: a name can be
 * written into a declaration without any schema naming it.
 */
export const format: ReadonlySet<string> = new Set([
  "BacktickElement",
  "BacktickNode",
  "ClientHandle",
  "SerializedBundle",
]);
