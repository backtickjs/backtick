export type { Client } from "@backtickjs/language-schema";
export type { Builtins } from "@backtickjs/language-schema";
// A name the client answers for, as a value: what makes one, what recognises
// one, and the one the language provides.
export {
  type Builtin,
  createBuiltin,
  isBuiltin,
  state,
} from "@backtickjs/language-schema";
export type {
  Array,
  ArrayConstructor,
  Boolean,
  Math,
  Number,
  String,
} from "./receivers.generated.js";
export {
  type ClientScript,
  isClientScript,
  type Metadata,
} from "./ClientScript.js";
// What a drawing is, and the three things a tag may name, from the schema that
// says what a drawing is at all: this package is the language of scripts, and
// `ClientElement` was already ui's. The document those names sit beside is at
// `@backtickjs/ui-schema/schema`, so reaching them costs an app nothing.
export {
  For,
  createFragment,
  type Fragment,
  type JsxElement,
  type JsxElementType,
  isJsxElement,
} from "@backtickjs/ui-schema";
export type { Prop } from "@backtickjs/ui-schema";
export type { Children } from "@backtickjs/ui-schema";
export type { ClientValue } from "@backtickjs/language-schema";
export type { ClientUnknown } from "@backtickjs/language-schema";
export { cs } from "./cs.js";
export type { SourceLocation } from "./SourceLocation.js";
export type {
  Server,
  Spliceable,
  SpliceableValue,
  Spliced,
} from "@backtickjs/language-schema";
export type { ReadonlyState, State } from "@backtickjs/language-schema";
export type { Widen } from "@backtickjs/language-schema";
export type { Receiver } from "./Receiver.js";
export type { ServerComponent } from "@backtickjs/ui-schema";
export * from "./Ast.js";
export type { BinaryOperator } from "./BinaryOperator.js";
export type { PrefixUnaryOperator } from "./PrefixUnaryOperator.js";
export { SyntaxKind } from "./SyntaxKind.js";
export { version } from "./version.js";
export { createJsxElement } from "@backtickjs/ui-schema";
