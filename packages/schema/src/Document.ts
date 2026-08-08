import type { SchemaProperties, SchemaType } from "./Vocabulary.js";

// What a target draws: the artifact, one file per target, and the only thing a
// generator reads. `Vocabulary.ts` is the type language it reaches for.
export interface SchemaDocument {
  /** The target this describes, e.g. `"web"`. Names the generated output. */
  readonly name: string;
  // Aliases, objects and interfaces alike, reached by `{ kind: "reference" }`.
  // An alias is transparent — `Color` *is* a string — so what a name buys is a
  // `typealias` where the language has one and one place to change.
  readonly types: { readonly [name: string]: SchemaType };
  // Keyed by tag, which is also the id the wire carries and the string
  // `createElement` receives. Nothing says whether an element is an intrinsic
  // or a value: TypeScript decides that on the tag's spelling, and a generator
  // splits the same way.
  readonly elements: { readonly [tag: string]: SchemaElement };
}

// An interface that also says what may go inside it.
export interface SchemaElement {
  /** Names interfaces, which are the only thing an element extends. */
  readonly extends: readonly string[];
  readonly properties: SchemaProperties;
  readonly children: SchemaChildren;
}

// What an element may hold: nothing (a void element), a string, elements, or
// either. Four cases rather than a type, because the wire gives children a slot
// of their own and every host answers them with an operation of its own —
// `setText` for a string, `addChild` for the rest.
//
// `<For />` is the shape this cannot say: its children are a script the client
// applies per member. It is undeclarable for another reason anyway — `T` is
// inferred from `each`, and there are no type variables here.
export type SchemaChildren = "none" | "text" | "elements" | "content";
