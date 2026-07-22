import type { Client } from "./Client.js";
import { create } from "./ClientScript.js";
import type { ClientUnknown } from "./ClientUnknown.js";
import type { ClientValue } from "./ClientValue.js";
import type { Spliceable, Spliced } from "./Spliceable.js";
import type { Receiver } from "./Receiver.js";

// The root of a script
function _lift<const T extends ClientUnknown>(_: T): Client<T> {
  throw new Error(
    "Don't call `cs.lift` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// A spliced host value, read as what it becomes on the client
function _splice<const T extends Spliceable>(_: T): Spliced<T> {
  throw new Error(
    "Don't call `cs.splice` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// Used to remove truthiness from the language
function _condition(_: boolean): boolean {
  throw new Error(
    "Don't call `cs.condition` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// A value with `const` semantics
function _const<T extends ClientValue>(_: T): T {
  throw new Error(
    "Don't call `cs.const` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// A value with `let` semantics
function _let<T extends ClientValue>(
  _: T,
): T extends number
  ? number
  : T extends string
    ? string
    : T extends boolean
      ? boolean
      : T {
  throw new Error(
    "Don't call `cs.let` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// Statements should always evaluate to `void`.
// Use `_ = ...` to ignore a return value
function _statement(_: void): void {
  throw new Error(
    "Don't call `cs.statement` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function _receiver<T extends ClientUnknown>(_: T): Receiver<T> {
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
    lift: _lift,
    splice: _splice,
    condition: _condition,
    const: _const,
    let: _let,
    statement: _statement,
    receiver: _receiver,
  },
);
