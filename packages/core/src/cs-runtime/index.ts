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

// Recursively lowers a Spliceable (or method) type:
//   Client<U>        -> U
//   (...A) => R      -> (...Lower<A>) => Lower<R>   (a virtualized method)
//   T[]              -> Lower<T>[]
//   { k: T }         -> { k: Lower<T> }
//   primitives       -> unchanged
//
// A method lowers to a callable whose parameters and return are both lowered, so
// it's invoked with the raw values already flowing through the surrounding
// script and yields a raw value back. A user client method's `Client<…>` params
// lower to their underlying values and a built-in's raw params stay raw — so
// either way the call site passes plain arguments, not `cs.lift(…)` wrappers.
export type Lower<T> =
  T extends Client<infer U>
    ? U
    : T extends (...args: infer A) => infer R
      ? (...args: { [K in keyof A]: Lower<A[K]> }) => Lower<R>
      : T extends (infer Item)[]
        ? Lower<Item>[]
        : T extends object
          ? { [Tk in keyof T]: Lower<T[Tk]> }
          : T;

// A method reference (`receiver.method`) captured for virtualization. It isn't a
// `Spliceable`, so `cs.lift`/`cs.lower` admit it explicitly: `cs.lower` turns it
// into a callable (see `Lower`) invoked with the script's raw values.
type Method = (...args: never[]) => unknown;

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

function lift<const T extends Spliceable | Method>(
  _value: T,
): Client<Lower<T>> {
  throw new Error(
    "Don't call `cs.lift` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function lower<const T extends Spliceable | Method>(_value: T): Lower<T> {
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
  { lift, lower, call, create },
);

export { cs };
