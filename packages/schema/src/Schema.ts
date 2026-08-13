import type {
  TArray,
  TBoolean,
  TElement,
  TFunction,
  TGeneric,
  TInterface,
  TLiteral,
  TNull,
  TNumber,
  TObject,
  TRef,
  TRest,
  TString,
  TUnion,
  TUnknown,
  TVoid,
} from "./types/index.js";

/**
 * A type a schema may hold, which is the set every generator can read.
 *
 * Closed, so a generator can be exhaustive: a kind added here without a case
 * to read it is a compile error where it is read, rather than a throw where it
 * is generated.
 *
 * Narrower than the languages that read it for the same reason: five of them
 * do, and a kind is only worth having where all of them can say it.
 */
export type SchemaNode =
  | TString
  | TNumber
  | TBoolean
  | TLiteral
  | TUnion
  | TInterface
  | TObject
  | TArray
  | TFunction
  | TVoid
  | TNull
  | TUnknown
  | TRef
  | TRest
  | TGeneric;

/** What a group of properties holds, each name against what it admits. */
export type TProperties = Readonly<Record<string, SchemaNode>>;

/**
 * What every node is, beneath the one thing each of them says.
 *
 * One key, because it is all any two nodes have in common: what a generator
 * writes a doc comment from, and what JSON Schema already calls it.
 */
export interface TSchema {
  readonly description?: string;
}

/**
 * What a node may be given when one is built.
 *
 * The same keys a node carries, under the name that says where they are being
 * passed rather than what they are on.
 */
export interface TSchemaOptions extends TSchema {}

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
  /** Groups of properties, each with what it extends. */
  readonly interfaces: Readonly<Record<string, SchemaNode>>;
  /** Every tag, and what it accepts. */
  readonly elements: Readonly<Record<string, TElement>>;
}
