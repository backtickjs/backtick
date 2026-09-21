// Every name TypeScript would lend a receiver — its lib's `Object`, and
// `Function` too for a function — is one the receiver declares or one it
// refuses through platform-sdk's `unsupportedBuiltins.ts`. A name it did
// neither would be lent again, and no client would answer it.
// Never executed — typechecked by `tsc -b`.
import type { Receiver } from "../src/Receiver.js";

// The names `From` lends that `R` neither declares nor refuses.
type Lent<R, From> = Exclude<Extract<keyof From, string>, keyof R>;
type None<T extends never> = T;

export type Strings = None<Lent<Receiver<string>, Object>>;
export type Numbers = None<Lent<Receiver<number>, Object>>;
export type Booleans = None<Lent<Receiver<boolean>, Object>>;
export type Arrays = None<Lent<Receiver<number[]>, Object>>;
export type PlainObjects = None<Lent<Receiver<{ a: number }>, Object>>;
export type Functions = None<Lent<Receiver<(a: number) => number>, Function>>;
export type JSONs = None<Lent<Receiver<typeof globalThis.JSON>, Object>>;
export type Maths = None<Lent<Receiver<typeof globalThis.Math>, Object>>;
export type ArrayStatics = None<
  Lent<Receiver<typeof globalThis.Array>, Object>
>;
export type NumberStatics = None<
  Lent<Receiver<typeof globalThis.Number>, Object>
>;
export type ObjectStatics = None<
  Lent<Receiver<typeof globalThis.Object>, Object>
>;
export type StringStatics = None<
  Lent<Receiver<typeof globalThis.String>, Object>
>;
