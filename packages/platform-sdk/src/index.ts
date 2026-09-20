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
export type {
  ArrayLike,
  Builtins,
  Bundle,
  BundleAddition,
  BundleArrayElement,
  BundleArrayLiteral,
  BundleArrowFunction,
  BundleAssignment,
  BundleBlock,
  BundleBody,
  BundleBreak,
  BundleBuiltin,
  BundleCall,
  BundleCatchClause,
  BundleComponentCall,
  BundleConditional,
  BundleConstDeclaration,
  BundleContinue,
  BundleDivision,
  BundleElement,
  BundleElementAccess,
  BundleExpression,
  BundleFor,
  BundleFunctionLabel,
  BundleFunctionReference,
  BundleGreaterThan,
  BundleGreaterThanOrEqual,
  BundleIdentifier,
  BundleIf,
  BundleLessThan,
  BundleLessThanOrEqual,
  BundleLetDeclaration,
  BundleLogicalAnd,
  BundleLogicalNot,
  BundleLogicalOr,
  BundleMultiplication,
  BundleNegation,
  BundleNullishCoalescing,
  BundleOptionalCall,
  BundleOptionalPropertyAccess,
  BundleParameter,
  BundlePropertyAccess,
  BundleRemainder,
  BundleReturn,
  BundleSpreadElement,
  BundleStatement,
  BundleStrictEquality,
  BundleStrictInequality,
  BundleSubtraction,
  BundleThrow,
  BundleTry,
  BundleUndefined,
  BundleWhile,
  ClientFunction,
  ClientHandle,
  ClientUnknown,
  ClientValue,
  Elements,
  Http,
  HttpConfig,
  HttpResponse,
  PlatformBuiltins,
  PlatformElements,
  Signal,
  SignalOptions,
  State,
} from "./declarations.generated.js";
export { computed, evaluate, http, state } from "./builtins.generated.js";
export type {
  Array,
  ArrayConstructor,
  Boolean,
  JSON,
  Math,
  Number,
  NumberConstructor,
  ObjectConstructor,
  String,
  StringConstructor,
} from "./receivers.generated.js";

// Written by hand, because a schema never says it: `Client` is how a host
// language spells "a script standing in for a value", which a client has no
// version of. `Prop` is the same idea in a drawing's position, and lives with
// drawings — see `@backtickjs/ui-platform-sdk`.
export type { Client } from "./Client.js";
export type { Spliceable, Spliced } from "./Spliceable.js";
export { createBuiltin, isBuiltin, type Builtin } from "./Builtin.js";
