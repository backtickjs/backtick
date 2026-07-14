import type { Client } from "./Client.js";
import type { ClientObject } from "./ClientObject.js";
import { create } from "./ClientScript.js";
import type { ClientUnknown } from "./ClientUnknown.js";
import type { Spliceable, Spliced } from "./Spliceable.js";
import type { Virtualized } from "./Virtualizable.js";

function lift<const T extends ClientUnknown>(_value: T): Client<T> {
  throw new Error(
    "Don't call `cs.lift` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// The `ClientObject` overload keeps `Spliced` out of user-facing types:
// `Spliced<T>`'s `ClientObject` branch is the identity, but a conditional
// type never reduces over an unresolved type parameter, so generic code
// splicing a `T extends ClientObject` would read as the internal
// `Spliced<T>` instead of `T`.
function splice<T extends ClientObject>(_value: T): T;
function splice<const T extends Spliceable>(_value: T): Spliced<T>;
function splice(_value: Spliceable): unknown {
  throw new Error(
    "Don't call `cs.splice` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function virtualize<T extends ClientUnknown>(_value: T): Virtualized<T> {
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
