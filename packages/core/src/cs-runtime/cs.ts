import type { Client } from "./Client.js";
import { create } from "./ClientScript.js";
import type { ClientUnknown } from "./ClientUnknown.js";
import type { Spliceable, Spliced } from "./Spliceable.js";
import type { Virtualize } from "./Virtualizable.js";

function lift<const T extends ClientUnknown>(_value: T): Client<T> {
  throw new Error(
    "Don't call `cs.lift` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function lower<const T extends Spliceable>(_value: T): Spliced<T> {
  throw new Error(
    "Don't call `cs.lower` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// Virtualized member access: the receiver of a `.` in a script is viewed as
// `Virtualize<T>`, so `Client`-typed members read as their payloads — what
// the client receives — without the script naming any lowered type. `T` is
// unconstrained because receivers include free host references
// (`console.log`) with arbitrary host interface types.
function virtualize<T>(_value: T): Virtualize<T> {
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
  { lift, lower, virtualize, create },
);
