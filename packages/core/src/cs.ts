import type { Client } from "./Client.js";
import { create } from "./ClientScript.js";
import type { Spliceable, SplicesAs, Spliced } from "./Spliceable.js";

// A string, so the error says it: `void` has no properties for TypeScript to
// name as missing.
type NoValue =
  "a script that makes no value: a script is one value, made at load. To run code where it's used, make it a function, cs`() => …`, and call it";

// The root of a script
function lift<
  // Whether `T` is exactly `void`: two such functions are the same type only
  // when `T` and `void` are, so `never`, `any` and `undefined` pass.
  T extends (<U>() => U extends T ? 1 : 2) extends <U>() => U extends void
    ? 1
    : 2
    ? NoValue
    : unknown,
>(_: T): Client<T> {
  throw new Error(
    "Don't call `cs.lift` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// A constraint that is `unknown` for a value that splices, rather than
// `Spliceable` itself or an intersection with it: either of those keeps a
// literal a literal instead of widening it. Checked member by member, as
// `SplicesAs<T>`, so an interface splices too. What can't be spliced is refused
// once, where it is written, as not `Spliceable`, and is `any` after:
// refused, `T` falls back to `Spliceable`, which splices to `unknown`.
function splice<T extends [T] extends [SplicesAs<T>] ? unknown : Spliceable>(
  _: T,
): unknown extends Spliced<T> ? any : Spliced<T> {
  throw new Error(
    "Don't call `cs.splice` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// `await`, in a splice the host may await in: what the host's `await` gives,
// wherever in the script the splice is written.
function awaited<T>(_: T): Awaited<T> {
  throw new Error(
    "Don't call `cs.awaited` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

/**
 * Writes a client script: code in the host's files that runs on the client.
 * The template is one expression, one block in braces, or one function; a
 * function that returns JSX is a client component. `$name` and
 * `${expression}` splice host values into it. Returns a `Client<T>`, `T`
 * being what the script computes. Compiled when the host loads the file, by
 * a Backtick plugin; called uncompiled, it throws.
 */
export const cs = Object.assign(
  (_strings: TemplateStringsArray, ..._values: unknown[]): Client<unknown> => {
    throw new Error(
      "`cs` was not compiled. Is @backtickjs set up for this project?",
    );
  },
  { awaited, create, lift, splice },
);
