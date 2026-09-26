import type { Client } from "@backtickjs/platform-sdk";
import { create } from "./ClientScript.js";
import type { ClientUnknown, Spliceable } from "@backtickjs/platform-sdk";
import type { Spliced } from "@backtickjs/platform-sdk";

// The root of a script
function lift<T>(_: T): Client<T> {
  throw new Error(
    "Don't call `cs.lift` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function splice<T>(_: T): Spliced<T> {
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

// `Spliceable`, for the `satisfies` the transform writes inside a splice, and
// `globalThis`, which a name the script didn't bind is read off. In the type and
// not in the object: nothing runs the virtual code they are written in.
export const cs = Object.assign(
  (
    _strings: TemplateStringsArray,
    ..._values: unknown[]
  ): Client<ClientUnknown> => {
    throw new Error(
      "`cs` was not compiled. Is @backtickjs set up for this project?",
    );
  },
  members as typeof members & {
    readonly Spliceable: Spliceable;
    readonly globalThis: GlobalThis;
  },
);
