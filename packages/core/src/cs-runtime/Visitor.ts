import type { Client } from "./Client.js";
import type { ClientUnknown } from "./ClientUnknown.js";
import type { SourceLocation } from "./SourceLocation.js";
import type { Spliceable } from "./Spliceable.js";

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

  // A node the compiler synthesizes rather than parses — `loc` is null
  // because no source text is its own. `expand` packages syntax only the
  // host can evaluate (e.g. constructing a spliced class) as a function of
  // the node's arguments; applying it yields the spliceable value the node
  // stands for.
  // e.g. new ${Foo}(1) -> macro(($0) => new Foo($0), [1])
  macro(
    loc: null,
    expand: (...args: Client<ClientUnknown>[]) => Spliceable,
    args: U[],
  ): U;
}
