/**
 * What may cross the host/client boundary, and nothing that reads or writes
 * it.
 *
 * Types and one factory, with no dependency of its own — so a schema, a
 * runtime, and a client all name these without any of them reaching for the
 * generator that wrote their declarations.
 */
export type {
  ClientFunction,
  ClientHandle,
  ClientUnknown,
  ClientValue,
} from "./ClientValue.js";
export type { Client } from "./Client.js";
export type { Spliceable, Spliced } from "./Spliceable.js";
export { createBuiltin, isBuiltin, type Builtin } from "./Builtin.js";

// What a drawing is, and what may stand in one. A `Prop` is a `Spliceable`
// under the name a drawing gives it, so these belong with the boundary rather
// with the layer that happens to declare elements.
export type { ClientElement } from "./ClientElement.js";
export type { Prop } from "./Prop.js";
export type { Children } from "./Children.js";
export type { ServerComponent } from "./ServerComponent.js";
export {
  createJsxElement,
  isJsxElement,
  type JsxElement,
  type JsxElementType,
} from "./JsxElement.js";
export { createFragment, type Fragment } from "./Fragment.js";
