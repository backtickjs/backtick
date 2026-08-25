import type { Client } from "@backtickjs/language-schema";
import { create } from "./ClientScript.js";
import type { ClientUnknown } from "@backtickjs/language-schema";
import type { ClientValue } from "@backtickjs/language-schema";
import type { Spliceable, Spliced } from "@backtickjs/language-schema";
import type { ClientGlobal, IndexKey, Receiver } from "./Receiver.js";

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

// Used to keep `-` arithmetic. TypeScript checks a binary operand — `s * 1` is
// an error — but not a prefixed one, where it types `-s` as a number and lets
// JavaScript coerce. There is no coercion here, so the check is made instead.
function _number(_: number): number {
  throw new Error(
    "Don't call `cs.number` directly; it's used to generate virtual " +
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

// A value with `let` semantics, so the initial widens: what `let n = 0` holds
// is a `number` and `n = 1` is allowed. Written as overloads because inference
// through a `ClientValue` constraint keeps the literal — `0` rather than
// `number` — and the primitives are where that happens.
function _let(_: number): number;
function _let(_: string): string;
function _let(_: boolean): boolean;
function _let<T extends ClientValue>(_: T): T;
function _let(_: ClientValue): ClientValue {
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

function _receiver<T extends ClientValue | ClientGlobal>(_: T): Receiver<T> {
  throw new Error(
    "Don't call `cs.receiver` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// An element or member reached by an expression rather than a name. The
// receiver reads as its client-side view, exactly as it does for `.`, and the
// key has to be one that view names — a number for an array, whatever the type
// says for an object.
//
// A call rather than a real `a[i]`, for one reason: TypeScript reads a numeric
// string literal as a numeric index, so `coins["0"]` would pass against an
// array while the runtime, which indexes an array by number and an object by
// string, reads null. As an argument the key is checked by plain assignability,
// where `"0"` is not a number.
function _index<T extends ClientValue, K extends IndexKey<Receiver<T>>>(
  _: T,
  _key: K,
): Receiver<T>[K & keyof Receiver<T>] {
  throw new Error(
    "Don't call `cs.index` directly; it's used to generate virtual " +
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
    number: _number,
    const: _const,
    let: _let,
    statement: _statement,
    receiver: _receiver,
    index: _index,
  },
);
