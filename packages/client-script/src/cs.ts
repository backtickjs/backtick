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

// `Spliceable`, for the `satisfies` the transform writes inside a splice.
// In the type and not in the object: nothing reads it, and there is nothing to
// read — `typeof cs.Spliceable` is the whole of what it is for.
export const cs = Object.assign(
  (
    _strings: TemplateStringsArray,
    ..._values: unknown[]
  ): Client<ClientUnknown> => {
    throw new Error(
      "`cs` was not compiled. Is @backtickjs set up for this project?",
    );
  },
  members as typeof members & { readonly Spliceable: Spliceable },
);
