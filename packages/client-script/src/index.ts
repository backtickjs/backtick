/**
 * What a `cs` template compiles to: its syntax, where it was written, and the
 * version both ends check.
 *
 * The compiler writes one of these and the bundler reads it, so the shape is
 * neither end's — every type here is named for the thing it is part of, and
 * `ClientScript` is what forty-seven of them say.
 *
 * What a script may *hold* is not here. `ClientValue` and the rest are
 * `@backtickjs/language`, which is generated from a schema; this names one of
 * them, `Spliceable`, to say what a host may put in a hole.
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
