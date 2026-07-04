import type { ClientArray } from "./types/ClientArray.js";
import type { ClientBoolean } from "./types/ClientBoolean.js";
import type { ClientNumber } from "./types/ClientNumber.js";
import type { ClientObject } from "./types/ClientObject.js";
import type { ClientString } from "./types/ClientString.js";

export type { ClientArray } from "./types/ClientArray.js";
export type { ClientBoolean } from "./types/ClientBoolean.js";
export type { ClientNumber } from "./types/ClientNumber.js";
export type { ClientObject } from "./types/ClientObject.js";
export type { ClientString } from "./types/ClientString.js";

export interface Client<T> {
  $$type: T;
  visit: <U>(visitor: Visitor<U>) => U;
}

export type Spliceable =
  // biome-ignore lint/suspicious/noConfusingVoidType: a script can yield no value (e.g. a block that never returns)
  | void
  | null
  | number
  | boolean
  | string
  | Client<unknown>
  | Spliceable[]
  | { [key: string]: Spliceable };

// Recursively lowers a Spliceable type:
//   Client<U>        -> U
//   T[]              -> Lower<T>[]
//   { k: T }         -> { k: Lower<T> }
//   primitives       -> unchanged
export type Lower<T> =
  T extends Client<infer U>
    ? U
    : T extends (infer Item)[]
      ? Lower<Item>[]
      : T extends object
        ? { [Tk in keyof T]: Lower<T[Tk]> }
        : T;

export interface Metadata {
  splices: { [key: string]: unknown };
  freeVars: string[];
}

export interface SourceRange {
  start: number;
  end: number;
}

export type SourceLocation = {
  path: string;
  start: { line: number; character: number };
  end: { line: number; character: number };
};

export interface Visitor<U> {
  // e.g. cs`7`
  clientScript(loc: SourceLocation, metadata: Metadata, expression: U): U;

  // e.g. ${ 1 }
  splice(loc: SourceLocation, key: string, expression: Spliceable): U;

  // null
  null(loc: SourceLocation): U;

  // e.g. 3
  number(loc: SourceLocation, value: number): U;

  // e.g. true
  boolean(loc: SourceLocation, value: boolean): U;

  // e.g. "Hello World"
  string(loc: SourceLocation, value: string): U;

  // e.g. i
  identifier(loc: SourceLocation, name: string): U;

  // e.g. { }
  block(loc: SourceLocation, statements: U[]): U;

  // e.g. i = 0;
  assignment(loc: SourceLocation, name: U, expression: U): U;

  // e.g. if (c) { ... } else { ... }
  if(loc: SourceLocation, condition: U, consequent: U, alternate: U | null): U;

  // e.g. return i;
  return(loc: SourceLocation, expression: U): U;

  // e.g. obj.a
  propertyAccess(loc: SourceLocation, expression: U, name: string): U;

  // this
  this(loc: SourceLocation, instance: Client<unknown>): U;

  // e.g. a + b
  binop(loc: SourceLocation, lhs: U, operator: string, rhs: U): U;

  // e.g. [1, 2, 3]
  array(loc: SourceLocation, elements: U[]): U;

  // e.g. { a: 4 }
  object(loc: SourceLocation, entries: { [key: string]: U }): U;

  // e.g. s.concat("!")
  call(loc: SourceLocation, callee: U, args: U[]): U;

  // e.g. new Color(30, 144, 255)
  new: (loc: SourceLocation, callee: U, args: U[]) => U;
}

function lift<const T extends Spliceable>(_value: T): Client<Lower<T>> {
  throw new Error(
    "Don't call `cs.lift` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function lower<const T extends Spliceable>(_value: T): Lower<T> {
  throw new Error(
    "Don't call `cs.lower` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function call<A extends unknown[], R>(_callee: (...args: A) => R, _args: A): R {
  throw new Error(
    "Don't call `cs.call` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

/**
 * Resolves a receiver's virtual type to the type describing which methods it
 * may call in a client script — a standard-library class for built-ins, or the
 * user's own client class for values that carry `$$type`/`visit`.
 *
 * The `Client` branch must precede the `object` branch (a client class is an
 * object), and the array branch must precede both (an array is an object).
 */
export type ClientMethods<T> = T extends string
  ? ClientString
  : T extends number
    ? ClientNumber
    : T extends boolean
      ? ClientBoolean
      : T extends (infer E)[]
        ? ClientArray<E>
        : T extends Client<unknown>
          ? Omit<T, keyof Client<unknown>>
          : T extends object
            ? ClientObject<T>
            : never;

function method<T, M extends keyof ClientMethods<T>>(
  _receiver: T,
  _name: M,
  _args: ClientMethods<T>[M] extends (...args: infer A) => unknown ? A : never,
): ClientMethods<T>[M] extends (...args: never[]) => infer R ? R : never {
  throw new Error(
    "Don't call `cs.method` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

// biome-ignore lint/suspicious/noExplicitAny: runtime value; the real type comes from `cs.lift`
function create(visit: <U>(visitor: Visitor<U>) => U): Client<any> {
  return { $$type: undefined, visit };
}

const cs = Object.assign(
  (_strings: TemplateStringsArray, ..._values: unknown[]): Client<unknown> => {
    throw new Error(
      "`cs` was not compiled. Is @backtickjs/core/compiler set up for this project?",
    );
  },
  { lift, lower, call, method, create },
);

export { cs };
