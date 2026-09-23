import type { Client } from "@backtickjs/platform-sdk";
import { create } from "./ClientScript.js";
import type { ClientUnknown } from "@backtickjs/platform-sdk";
import type { ClientValue } from "@backtickjs/platform-sdk";
import type { Spliced } from "@backtickjs/platform-sdk";

// The root of a script
function _lift<T extends ClientUnknown>(_: T): Client<T> {
  throw new Error(
    "Don't call `cs.lift` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function _splice<T>(_: T): Spliced<T> {
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

// Used to keep `-` arithmetic. TypeScript checks a binary operand — `s * 1` is
// an error — but not a prefixed one, where it types `-s` as a number and lets
// JavaScript coerce. There is no coercion here, so the check is made instead.
function _number(_: number): number {
  throw new Error(
    "Don't call `cs.number` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// Used to keep computed keys strings. TypeScript also takes a number or a
// symbol there, and JavaScript would convert either one; nothing does here.
function _string(_: string): string {
  throw new Error(
    "Don't call `cs.string` directly; it's used to generate virtual " +
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

// Statements should always evaluate to `void`.
// Use `_ = ...` to ignore a return value
function _statement(_: void): void {
  throw new Error(
    "Don't call `cs.statement` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// What hangs off the tag.
const members = {
  create,
  lift: _lift,
  splice: _splice,
  condition: _condition,
  number: _number,
  string: _string,
  const: _const,
  statement: _statement,
};

// `ClientUnknown`, for the `satisfies` the transform writes beside a splice.
// In the type and not in the object: nothing reads it, and there is nothing to
// read — `typeof cs.ClientUnknown` is the whole of what it is for.
export const cs = Object.assign(
  (
    _strings: TemplateStringsArray,
    ..._values: unknown[]
  ): Client<ClientUnknown> => {
    throw new Error(
      "`cs` was not compiled. Is @backtickjs set up for this project?",
    );
  },
  members as typeof members & { readonly ClientUnknown: ClientUnknown },
);
