export type ClientUnknown =
  | UIElement
  // biome-ignore lint/suspicious/noConfusingVoidType: script whose block completes without a `return`
  | void
  | null
  | number
  | boolean
  | string
  | ((...args: never[]) => ClientUnknown)
  | ClientUnknown[]
  | { [key: string]: ClientUnknown };

export interface Client<T extends ClientUnknown> {
  "@backtickjs/Client": T;
}

export interface ClientScript<T extends ClientUnknown> extends Client<T> {
  fileHash: string;
  loc: SourceLocation;
  metadata: Metadata;
  visit: <U>(visitor: Visitor<U>) => U;
}

export type Prop<T extends ClientUnknown> = T | Client<T>;

declare const element: unique symbol;

// Client scripts can pass elements around but not look inside one.
// The only way to produce a `UIElement` is lowering `JSXElement`.
export interface UIElement {
  readonly [element]: typeof element;
}

export interface JSXElement {
  "@backtickjs/JSXElement": undefined;
  readonly type: string;
  readonly key: string | number | null;
  readonly props: { [key: string]: unknown };
}

export type Spliceable =
  | JSXElement
  | Client<ClientUnknown>
  | null
  | number
  | boolean
  | string
  | Spliceable[]
  | { [key: string]: Spliceable };

export type AsObject<T> = {
  [K in Exclude<keyof T, "@backtickjs/Client"> as T[K] extends Spliceable
    ? K
    : never]: Lower<T[K]>;
};

// Recursively lowers a Spliceable type:
//   JSXElement       -> UIElement
//   Client<U>        -> U
//   T[]              -> Lower<T>[]
//   { k: T }         -> { k: Lower<T> }
//   primitives       -> unchanged
export type Lower<T> = T extends JSXElement
  ? UIElement
  : T extends Client<infer U>
    ? U
    : T extends (infer Item)[]
      ? Lower<Item>[]
      : T extends object
        ? { [Tk in keyof T]: Lower<T[Tk]> }
        : T;

export interface Metadata {
  splices: Spliceable[];
  // binding keys the script captures from an enclosing scope
  captures: string[];
  // binding keys the script declares itself
  declarations: string[];
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

export type BinaryOperator =
  | "&&"
  | "||"
  | "??"
  | "+"
  | "-"
  | "*"
  | "/"
  | "%"
  | "==="
  | "!=="
  | "<"
  | "<="
  | ">"
  | ">=";

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
  identifier(loc: SourceLocation, name: string, bindingKey: string): U;

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

  // e.g. throw "message";
  throw(loc: SourceLocation, expression: U): U;

  // e.g. try { ... } catch (e) { ... } — `param` is null for `catch { ... }`
  try(loc: SourceLocation, block: U, param: U | null, handler: U): U;

  // e.g. obj.a
  propertyAccess(loc: SourceLocation, expression: U, name: string): U;

  // e.g. a + b
  binop(loc: SourceLocation, lhs: U, operator: BinaryOperator, rhs: U): U;

  // e.g. [1, 2, 3]
  array(loc: SourceLocation, elements: U[]): U;

  // e.g. { a: 4 }
  object(loc: SourceLocation, entries: { [key: string]: U }): U;

  // e.g. s.concat("!")
  call(loc: SourceLocation, callee: U, args: U[]): U;

  // e.g. (r, g, b) => { ... }
  arrow(loc: SourceLocation, params: U[], body: U): U;
}

export function isClient(value: unknown): value is Client<ClientUnknown> {
  return (
    typeof value === "object" && value !== null && "@backtickjs/Client" in value
  );
}

export function isClientScript(
  value: unknown,
): value is ClientScript<ClientUnknown> {
  return (
    isClient(value) &&
    "fileHash" in value &&
    "loc" in value &&
    "metadata" in value &&
    "visit" in value
  );
}

export function isJSXElement(value: unknown): value is JSXElement {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs/JSXElement" in value
  );
}

export function spliceableEntries(
  value: Client<ClientUnknown>,
): [string, Spliceable][] {
  const entries: [string, Spliceable][] = [];
  for (const key of objectKeys(value)) {
    if (key === "@backtickjs/Client") {
      continue;
    }
    const entry = (value as unknown as Record<string, unknown>)[key];
    if (isSpliceable(entry)) {
      entries.push([key, entry]);
    }
  }
  return entries;
}

function objectKeys(value: Client<ClientUnknown>): string[] {
  const keys: string[] = [];
  const seen = new Set<string>();
  let current: object | null = value;
  while (current && current !== Object.prototype) {
    for (const key of Object.getOwnPropertyNames(current)) {
      if (!seen.has(key)) {
        seen.add(key);
        keys.push(key);
      }
    }
    current = Object.getPrototypeOf(current);
  }
  return keys;
}

export function isSpliceable(value: unknown): value is Spliceable {
  if (value === undefined) {
    return false;
  }
  if (
    isJSXElement(value) ||
    isClient(value) ||
    value === null ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "string"
  ) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.every(isSpliceable);
  }
  const prototype = Object.getPrototypeOf(value);
  return (
    (prototype === Object.prototype || prototype === null) &&
    Object.values(value).every(isSpliceable)
  );
}

function lift<const T extends ClientUnknown>(_value: T): Client<T> {
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
  fileHash: string,
  metadata: Metadata,
  visit: <U>(visitor: Visitor<U>) => U,
  // biome-ignore lint/suspicious/noExplicitAny: runtime value; the real type comes from `cs.lift`
): ClientScript<any> {
  return {
    "@backtickjs/Client": undefined,
    loc,
    fileHash,
    metadata,
    visit,
  };
}

const cs = Object.assign(
  (
    _strings: TemplateStringsArray,
    ..._values: unknown[]
  ): Client<ClientUnknown> => {
    throw new Error(
      "`cs` was not compiled. Is @backtickjs set up for this project?",
    );
  },
  { lift, lower, create },
);

export { cs };
