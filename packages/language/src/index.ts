/**
 * What every client answers for: the declaration, and what it comes to.
 *
 * The schema is the document — `./schema` reaches it, and
 * `schema.generated.json` beside this is what a reader outside TypeScript
 * gets. This is the rest: the types generated from it, and the few a schema
 * never says. A builtin is a `Client<…>`, and `Client` is how a host language
 * spells "a script standing in for a value" — nothing a client has a version
 * of, so nothing a document declares.
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
