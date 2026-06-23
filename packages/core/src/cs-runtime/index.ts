export interface Client<T> {
  $$type: () => T;
  visit: <U>(visitor: Visitor<U>) => U;
}

export type Spliceable =
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

export interface Visitor<U> {
  // e.g. `7`
  backtick(loc: null, metadata: Metadata, expression: U): U;

  // e.g. ${ 1 }
  splice(loc: null, key: string, expression: Spliceable): U;

  // null
  null(loc: null): U;

  // e.g. 3
  number(loc: null, value: number): U;

  // e.g. true
  boolean(loc: null, value: boolean): U;

  // e.g. "Hello World"
  string(loc: null, value: string): U;

  // e.g. i
  identifier(loc: null, name: string): U;

  // e.g. { }
  block(loc: null, statements: U[]): U;

  // e.g. i = 0;
  assignment(loc: null, name: U, expression: U): U;

  // e.g. if (c) { ... } else { ... }
  if(loc: null, condition: U, consequent: U, alternate: U | null): U;

  // e.g. return i;
  return(loc: null, expression: U): U;

  // e.g. obj.a
  propertyAccess(loc: null, expression: U, name: string): U;

  // e.g. a + b
  binop(loc: null, lhs: U, operator: string, rhs: U): U;

  // e.g. [1, 2, 3]
  array(loc: null, elements: U[]): U;

  // e.g. { a: 4 }
  object(loc: null, entries: { [key: string]: U }): U;
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

function create(visit: <U>(visitor: Visitor<U>) => U): Client<any> {
  return { $$type: () => {}, visit };
}

const cs = Object.assign(
  (_strings: TemplateStringsArray, ..._values: unknown[]): Client<unknown> => {
    throw new Error(
      "`cs` was not compiled. Is @backtick/core/compiler set up for this project?",
    );
  },
  { lift, lower, create },
);

export { cs };
