import type { Client } from "./Client.js";
import { create } from "./ClientScript.js";
import type { Spliceable } from "./Spliceable.js";
import type { Spliced } from "./Spliceable.js";

// The root of a script
function lift<T>(_: T): Client<T> {
  throw new Error(
    "Don't call `cs.lift` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// A constraint that is `unknown` for a value that splices, rather than
// `Spliceable` itself or an intersection with it: either of those keeps a
// literal a literal instead of widening it.
function splice<T extends [T] extends [Spliceable] ? unknown : Spliceable>(
  _: T,
): Spliced<T> {
  throw new Error(
    "Don't call `cs.splice` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// What hangs off the tag.
const members = {
  create,
  lift,
  splice,
};

/**
 * The globals a project declares — its libs, `@types`, a `declare global` —
 * as an ordinary object type: reading one it doesn't declare is an error
 * however strict the project is, where `typeof globalThis` itself lets it
 * through as `any` without `noImplicitAny`.
 */
export type GlobalThis = {
  [Key in keyof typeof globalThis]: (typeof globalThis)[Key];
};

// `globalThis`, which a name the script didn't bind is read off. In the type
// and not in the object: nothing runs the virtual code it is written in.
export const cs = Object.assign(
  (_strings: TemplateStringsArray, ..._values: unknown[]): Client<unknown> => {
    throw new Error(
      "`cs` was not compiled. Is @backtickjs set up for this project?",
    );
  },
  members as typeof members & {
    readonly globalThis: GlobalThis;
  },
);
