import type { Client } from "./Client.js";
import { create } from "./ClientScript.js";
import type { ClientUnknown } from "./ClientUnknown.js";
import type { Spliceable, Spliced } from "./Spliceable.js";
import type { Virtualizable, Virtualized } from "./Virtualizable.js";

function lift<const T extends ClientUnknown>(_value: T): Client<T> {
  throw new Error(
    "Don't call `cs.lift` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function splice<const T extends Spliceable>(_value: T): Spliced<T> {
  throw new Error(
    "Don't call `cs.splice` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function virtualize<T extends Virtualizable>(_value: T): Virtualized<T> {
  throw new Error(
    "Don't call `cs.virtualize` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

export const cs = Object.assign(
  (
    _strings: TemplateStringsArray,
    ..._values: unknown[]
  ): Client<ClientUnknown> => {
    throw new Error(
      "`cs` was not compiled. Is @backtickjs set up for this project?",
    );
  },
  { lift, splice, virtualize, create },
);
