// The types a schema may name. What a document is made of is `Document.ts`.
//
// Closed, and smaller than TypeScript's: a generator per language reads it —
// TypeScript, Java, Kotlin, Objective-C, Swift — so every kind has to exist in
// all of them. Nothing here is optional, so a missing key is a malformed
// document rather than a default four other parsers would have to know.

// What can stand where a value's type stands: a property, a union member, a
// list's element, a parameter, what a reference names.
export type SchemaValue =
  | SchemaString
  | SchemaNumber
  | SchemaBoolean
  | SchemaEnum
  | SchemaUnion
  | SchemaList
  | SchemaObject
  | SchemaFunction
  | SchemaReference;

/** What a document may name. An interface is one, and holds no value. */
export type SchemaType = SchemaValue | SchemaInterface;

// Answering with nothing, which is not a type a schema may name and stands in
// no position that holds one — only where a function says what it answers with.
// Java has no `void` type either, which is the same fact from the other side.
//
// The nothing an action already is: a script the bundler will not lower as data
// (`Client<void>`, `kind: "action"`). Not `null`, which is a value a script
// produces and a client holds.
export interface SchemaVoid {
  readonly kind: "void";
}

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
  readonly of: readonly SchemaValue[];
}

export interface SchemaList {
  readonly kind: "list";
  readonly of: SchemaValue;
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

// A client function. `Client<(…) => R>` has no plain form, so this is the one
// kind a host value cannot fill.
//
// A handler is one answering with nothing, which is the common case and the
// only one either vocabulary has today. One answering with something is what
// `<For />`'s children are, and what a target declaring a list of its own would
// need. The one position a `void` may stand in.
export interface SchemaFunction {
  readonly kind: "function";
  readonly params: readonly SchemaParameter[];
  readonly returns: SchemaValue | SchemaVoid;
}

// What a function is handed: what to call it, what it holds, and whether it may
// hold nothing.
//
// The name is the one a generated signature reads — `onLayout(width, height)`
// rather than `arg0, arg1` — and it is a parameter's alone: nothing references
// one, so it is not a declaration and never reaches `types`.
//
// A record rather than the type alone, because a parameter is also the one
// place nullability has to be said: a property has optionality to say it with,
// and an absent one already reads as `null` on the client, where a parameter
// list has no absence to lean on. A flag rather than a `null` in a union,
// because that is what every target writes — `String?` in Kotlin and Swift,
// `_Nullable` in Objective-C, `@Nullable` in Java — and none of them writes a
// union.
export interface SchemaParameter {
  readonly name: string;
  readonly type: SchemaValue;
  readonly nullable: boolean;
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
export type SchemaProperties = { readonly [name: string]: SchemaProperty };

// What an element or an object holds under one name.
//
// Required unless it says otherwise, which is TypeScript's default and
// TypeBox's, and the opposite of JSON Schema's. A record for the same reason a
// parameter is one: whether it may be left out is a fact about the position,
// not about the type standing in it, and a type that carried it would carry it
// into a list and a union where it means nothing.
export interface SchemaProperty {
  readonly type: SchemaValue;
  readonly optional: boolean;
  // What a generated setter's doc comment reads. `null` where there is none —
  // written either way, since a reader in Java has no source to fall back on
  // and a generator should not have to guess whether the key was meant.
  readonly description: string | null;
}
