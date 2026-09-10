/**
 * What the compiler writes and the bundler reads, and nothing that says what a
 * value is.
 *
 * Syntax, source locations, and the version both ends agree on — with no
 * dependency of its own, so the compiler names these without reaching for the
 * schema toolchain that generates the language it compiles against.
 *
 * The format's vocabulary is not here. What may cross a boundary is
 * `@backtickjs/language` and what a drawing is made of is `@backtickjs/ui-schema`,
 * both generated from a schema, and a schema is built on top of this.
 */
export {
  create,
  type ClientScript,
  isClientScript,
  type Metadata,
  type MetadataSplice,
} from "./ClientScript.js";
export * from "./Ast.js";
export type { BinaryOperator } from "./BinaryOperator.js";
export type { PrefixUnaryOperator } from "./PrefixUnaryOperator.js";
export type { SourceLocation } from "./SourceLocation.js";
export { version } from "./version.js";
