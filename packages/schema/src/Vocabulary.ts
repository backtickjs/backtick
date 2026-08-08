// The types a schema may name, and the whole of what can stand where a
// property's type stands. What a document is made of is `Document.ts`.
//
// Closed, and smaller than TypeScript's: a generator per language reads it —
// TypeScript, Java, Kotlin, Objective-C, Swift — so every kind has to exist in
// all of them. Nothing here is optional, so a missing key is a malformed
// document rather than a default four other parsers would have to know.
export type SchemaType =
  | SchemaString
  | SchemaNumber
  | SchemaBoolean
  | SchemaEnum
  | SchemaUnion
  | SchemaList
  | SchemaObject
  | SchemaInterface
  | SchemaHandler
  | SchemaReference;

export interface SchemaString {
  readonly kind: "string";
}

export interface SchemaNumber {
  readonly kind: "number";
}

export interface SchemaBoolean {
  readonly kind: "boolean";
}

// Always the whole set: TypeScript's `(string & {})` idiom has no counterpart
// in Java or Kotlin, so an open enum is a string until it earns the split.
export interface SchemaEnum {
  readonly kind: "enum";
  readonly values: readonly string[];
}

// A union of objects is a type in every target — a sealed interface in Java, an
// enum with associated values in Swift. A union of primitives is not, and is
// one setter per member where it is used, so it may stand directly on a
// property and nowhere else: not in a list, and not as a callback's parameter,
// where there is no second signature to expand into.
export interface SchemaUnion {
  readonly kind: "union";
  readonly of: readonly SchemaType[];
}

export interface SchemaList {
  readonly kind: "list";
  readonly of: SchemaType;
}

// A value with members: a style a property holds, or one arm of a union.
// `includes` flattens — `TextStyleProps` is `ViewStyleProps & { … }`, having
// another object's members rather than being one of them.
export interface SchemaObject {
  readonly kind: "object";
  readonly includes: readonly string[];
  readonly properties: SchemaProperties;
}

// A group of properties an element has, and may share. Inherited where an
// object is flattened, and several at once — so an interface rather than a base
// class, since Java allows one of the second and any number of the first.
export interface SchemaInterface {
  readonly kind: "interface";
  readonly extends: readonly string[];
  readonly properties: SchemaProperties;
}

// A client function answering with nothing. `Client<(…) => void>` has no plain
// form, so this is the one kind a host value cannot fill.
export interface SchemaHandler {
  readonly kind: "handler";
  readonly params: readonly SchemaType[];
}

// A use of a type the document named, not its declaration — which is why it
// reaches an alias and an object alike, and never an interface.
export interface SchemaReference {
  readonly kind: "reference";
  readonly name: string;
}

// Every property is optional. A required one could only be checked where an app
// is written, since a bundle may set a property or not, and on the client an
// absent member already reads as `null`.
export type SchemaProperties = { readonly [name: string]: SchemaType };
