import type { Client } from "./Client.js";
import { create } from "./ClientScript.js";
import type { ClientUnknown } from "./ClientUnknown.js";
import type { ClientValue } from "./ClientValue.js";
import type { SpliceableValue, Spliced } from "./Spliceable.js";
import type { Receiver } from "./Receiver.js";

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

// A splice in any value position
function spliceValue<const T extends SpliceableValue>(_value: T): Spliced<T> {
  throw new Error(
    "Don't call `cs.spliceValue` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// A splice in statement position
function spliceAction(_value: Client<void>): void {
  throw new Error(
    "Don't call `cs.spliceAction` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function condition(_condition: boolean): boolean {
  throw new Error(
    "Don't call `cs.condition` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function receiver<T extends ClientUnknown>(_value: T): Receiver<T> {
  throw new Error(
    "Don't call `cs.receiver` directly; it's used to generate virtual " +
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
  {
    create,
    liftValue,
    liftAction,
    spliceValue,
    spliceAction,
    condition,
    receiver,
  },
);
