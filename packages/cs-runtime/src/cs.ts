import type { Client } from "./Client.js";
import { create } from "./ClientScript.js";
import type { ClientUnknown } from "./ClientUnknown.js";
import type { ClientValue } from "./ClientValue.js";
import type { SpliceableUnknown, Spliced } from "./Spliceable.js";
import type { Receiver } from "./Receiver.js";

// The root of a value script — a block whose every path `return`s
function liftValue<const T extends ClientValue>(_: T): Client<T> {
  throw new Error(
    "Don't call `cs.liftValue` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// The root of an action — a block with no `return`
function liftAction(_: void): Client<void> {
  throw new Error(
    "Don't call `cs.liftAction` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// A splice in any value position
function spliceValue<const T extends SpliceableUnknown>(_: T): Spliced<T> {
  throw new Error(
    "Don't call `cs.spliceValue` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// A splice in statement position
function spliceAction<const T extends SpliceableUnknown>(_: T): Spliced<T> {
  throw new Error(
    "Don't call `cs.spliceAction` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function condition(_: boolean): boolean {
  throw new Error(
    "Don't call `cs.condition` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function value(_: ClientValue): ClientValue {
  throw new Error(
    "Don't call `cs.value` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// A statement discards its expression, which is only silent for `void`
function statement(_: void): void {
  throw new Error(
    "Don't call `cs.statement` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function receiver<T extends ClientUnknown>(_: T): Receiver<T> {
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
    value,
    statement,
    receiver,
  },
);
