/**
 * What the language schema comes to, for a host writing against it.
 *
 * Apart from the schema that declares it because of what it needs: a
 * declaration names `ClientValue` and a builtin is a `Client<…>`, and both of
 * those are the boundary's. A schema should not need them to say what a
 * language is, so it does not — and this, which is what came out, may.
 */
export type * from "./declarations.generated.js";
export * from "./builtins.generated.js";
export type * from "./receivers.generated.js";

// Written by hand, because a schema never says them: `Client` and `Prop` are
// how a host language spells "a value, or a script standing in for it", which
// a client has no version of.
export type { Client } from "./Client.js";
export type { Spliceable, Spliced } from "./Spliceable.js";
export type { Prop } from "./Prop.js";
export { createBuiltin, isBuiltin, type Builtin } from "./Builtin.js";
