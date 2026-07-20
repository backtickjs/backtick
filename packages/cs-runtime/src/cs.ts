import type { Client } from "./Client.js";
import { create } from "./ClientScript.js";
import type { ClientUnknown } from "./ClientUnknown.js";
import type { ClientValue } from "./ClientValue.js";
import type { Spliceable, Spliced } from "./Spliceable.js";
import type { Virtualized } from "./Virtualized.js";

// The root of a value script — a block whose every path `return`s
function liftValue<const T extends ClientValue>(_value: T): Client<T> {
  throw new Error(
    "Don't call `cs.liftValue` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// The root of an action — a block with no `return`
function liftAction(_body: void): Client<void> {
  throw new Error(
    "Don't call `cs.liftAction` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function splice<const T extends Spliceable>(_value: T): Spliced<T> {
  throw new Error(
    "Don't call `cs.splice` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function condition(_condition: boolean): boolean {
  throw new Error(
    "Don't call `cs.condition` directly; it's used to generate virtual " +
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
  { create, liftValue, liftAction, splice, condition, virtualize },
);
