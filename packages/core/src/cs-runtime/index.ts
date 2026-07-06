export interface Client<T> {
  $$type: T;
  visit: <U>(visitor: Visitor<U>) => U;
}

export interface ClientScript<T> extends Client<T> {
  loc: SourceLocation;
  metadata: Metadata;
}

export type Spliceable =
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
  splices: Spliceable[];
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
  // e.g. ${ 1 }
  splice(loc: SourceLocation, index: number): U;

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

  // e.g. const i = 0;
  variableDeclaration(
    loc: SourceLocation,
    keyword: "let" | "const",
    name: U,
    expression: U,
  ): U;

  // e.g. if (c) { ... } else { ... }
  if(loc: SourceLocation, condition: U, consequent: U, alternate: U | null): U;

  // e.g. return i;
  return(loc: SourceLocation, expression: U): U;

  // e.g. obj.a
  propertyAccess(loc: SourceLocation, expression: U, name: string): U;

  // e.g. a + b
  binop(loc: SourceLocation, lhs: U, operator: string, rhs: U): U;

  // e.g. [1, 2, 3]
  array(loc: SourceLocation, elements: U[]): U;

  // e.g. { a: 4 }
  object(loc: SourceLocation, entries: { [key: string]: U }): U;

  // e.g. s.concat("!")
  call(loc: SourceLocation, callee: U, args: U[]): U;

  // e.g. (r, g, b) => { ... }
  arrow(loc: SourceLocation, params: string[], body: U): U;
}

export function isClient(value: unknown): value is Client<unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    "visit" in value &&
    typeof value.visit === "function"
  );
}

export function isClientScript(
  value: Client<unknown>,
): value is ClientScript<unknown> {
  return "loc" in value && "metadata" in value;
}

function lift<const T>(_value: T): Client<T> {
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

function create(
  loc: SourceLocation,
  metadata: Metadata,
  visit: <U>(visitor: Visitor<U>) => U,
  // biome-ignore lint/suspicious/noExplicitAny: runtime value; the real type comes from `cs.lift`
): ClientScript<any> {
  return {
    $$type: undefined,
    loc,
    metadata,
    visit,
  };
}

const cs = Object.assign(
  (_strings: TemplateStringsArray, ..._values: unknown[]): Client<unknown> => {
    throw new Error(
      "`cs` was not compiled. Is @backtickjs set up for this project?",
    );
  },
  { lift, lower, create },
);

export { cs };
