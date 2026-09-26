/**
 * What every client answers for: the declarations, and what they come to. A
 * builtin is a `Client<…>`, and `Client` is how a host language spells "a
 * script standing in for a value".
 */
export type {
  ArrayLike,
  Builtins,
  ClientFunction,
  ClientHandle,
  ClientUnknown,
  ClientValue,
  Elements,
  PlatformBuiltins,
  PlatformElements,
  Signal,
  SignalOptions,
  State,
} from "./declarations.js";
export { computed, state } from "./builtins.js";

// `Client` is how a host language spells "a script standing in for a value";
// `Prop` is the same idea in a drawing's position.
export type { Client } from "./Client.js";
export type { Prop } from "./Prop.js";
export type { Spliceable, Spliced } from "./Spliceable.js";
export { createBuiltin, isBuiltin, type Builtin } from "./Builtin.js";
export {
  createImport,
  isClientImport,
  type ClientImport,
} from "./ClientImport.js";
export type { Bundle } from "./Bundle.js";
