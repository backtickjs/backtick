import type {
  TBoolean,
  TFunction,
  TGeneric,
  TIntersect,
  TLiteral,
  TNumber,
  TObject,
  TRef,
  TRest,
  TString,
  TUnion,
  TVoid,
} from "typebox";

/**
 * A type a schema may hold, which is the set every generator can read.
 *
 * Closed, so a generator can be exhaustive: a kind added here without a case
 * to read it is a compile error where it is read, rather than a throw where it
 * is generated. TypeBox builds far more than this — `Date`, `BigInt`, arrays,
 * template literals — and `Type` in this package exposes only what is listed
 * here, so a schema cannot hold one by accident.
 *
 * Narrower than TypeBox for the same reason TypeBox is narrower than
 * TypeScript: five languages read what a target declares, and a kind is only
 * worth having where all of them can say it.
 */
export type SchemaNode =
  | TString
  | TNumber
  | TBoolean
  | TLiteral
  | TUnion
  | TIntersect
  | TObject
  | TFunction
  | TVoid
  | TRef
  | TRest
  | TGeneric;

/**
 * What a target draws, and what each element accepts.
 *
 * Said once, per target, and read by every generator: the TypeScript an app
 * writes against, the stubs a native client is written against, and whatever
 * else comes to need it. So nothing here is any one generator's — a name is a
 * name whichever language spells it, and `Prop<T>` and `Client<T>` are absent
 * because a client receives a prop already evaluated and has no use for them.
 */
export interface Schema {
  /** Named types the rest refers to by `$ref`. */
  readonly aliases: Readonly<Record<string, SchemaNode>>;
  /** Groups of properties, each an object or an `allOf` of what it extends. */
  readonly interfaces: Readonly<Record<string, SchemaNode>>;
  /** Every tag, and the interface naming what it accepts. */
  readonly elements: Readonly<Record<string, string>>;
}
