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

// Written by hand, because a schema never says it: `Client` is how a host
// language spells "a script standing in for a value", which a client has no
// version of. `Prop` is the same idea in a drawing's position, and lives with
// drawings — see `@backtickjs/ui-platform-sdk`.
export type { Client } from "./Client.js";
export type { Spliceable, Spliced } from "./Spliceable.js";
export { createBuiltin, isBuiltin, type Builtin } from "./Builtin.js";
export {
  createImport,
  isClientImport,
  type ClientImport,
} from "./ClientImport.js";
export type { Bundle } from "./Bundle.js";
