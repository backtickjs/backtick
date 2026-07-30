import type { SourceLocation } from "./SourceLocation.js";

// The operators a script may write. `=` is one of them, because an assignment
// is a binary expression here exactly as it is in TypeScript — see
// `Visitor.binaryExpression`.
export type BinaryOperator =
  | "="
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

// A script's syntax, one method per construct. Every method is named for the
// TypeScript node it mirrors — `ts.IfStatement` is `ifStatement` — so a visitor
// is written against an AST its author already knows. Only `splice` is this
// language's own, having no TypeScript counterpart.
//
// The parameters follow the same rule, in three parts:
//
//   `loc` first, which is this format's own — TypeScript keeps `pos` and `end`
//   on every node rather than passing them.
//
//   Then TypeScript's own slots, named and *ordered* as TypeScript declares
//   them: `questionDotToken` sits between a receiver and what is read off it,
//   because that is where `ts.PropertyAccessExpression` puts it.
//
//   Then anything this language adds, last: an identifier's `bindingKey`, a
//   declaration's `keyword`.
//
// Two of TypeScript's slots are missing wherever they appear, because nothing
// here can fill them: the type positions (`typeArguments`, `type`,
// `exclamationToken`, `modifiers`), and the punctuation a parser keeps for
// formatting (`questionToken`, `colonToken`, `equalsGreaterThanToken`). So are
// the slots for syntax this language rejects — a `try` has no `finallyBlock`, a
// jump takes no `label`, and an element access takes no `questionDotToken`,
// since `?.[` isn't written here.
//
// Two names can't be TypeScript's. A call's arguments arrive as
// `argumentsArray`, since `arguments` is not a legal parameter name in strict
// mode — which is what TypeScript's own `factory.createCallExpression` calls
// it, for the same reason. And a numeric or boolean literal carries its
// `value`, where TypeScript's `NumericLiteral` carries the source `text` and a
// boolean is a `TrueLiteral` or a `FalseLiteral` whose kind is the value: a
// literal is data in this language, not a node with the value spelled out.
export interface Visitor<U> {
  // e.g. ${ 1 } — `key` names the value in the script's `splices` metadata
  splice(loc: SourceLocation, key: string): U;

  // null
  nullLiteral(loc: SourceLocation): U;

  // e.g. 3
  numericLiteral(loc: SourceLocation, value: number): U;

  // e.g. true
  booleanLiteral(loc: SourceLocation, value: boolean): U;

  // e.g. "Hello World"
  stringLiteral(loc: SourceLocation, text: string): U;

  // e.g. i
  identifier(loc: SourceLocation, text: string, bindingKey: string): U;

  // e.g. { }
  block(loc: SourceLocation, statements: U[]): U;

  // e.g. const i = 0; — `keyword` is this language's, TypeScript keeping it as
  // flags on the declaration list this format has no node for
  variableDeclaration(
    loc: SourceLocation,
    name: U,
    initializer: U,
    keyword: "let" | "const",
  ): U;

  // e.g. if (c) { ... } else { ... }
  ifStatement(
    loc: SourceLocation,
    expression: U,
    thenStatement: U,
    elseStatement: U | null,
  ): U;

  // e.g. while (i < n) { ... } — the condition is boolean, as everywhere else
  whileStatement(loc: SourceLocation, expression: U, statement: U): U;

  // e.g. for (let i = 0; i < n; i = i + 1) { ... } — each header part is null
  // when omitted, and an absent condition loops forever. `i++` is not an
  // operator here, so the incrementor is an assignment like any other.
  forStatement(
    loc: SourceLocation,
    initializer: U | null,
    condition: U | null,
    incrementor: U | null,
    statement: U,
  ): U;

  // e.g. break; — ends the nearest enclosing loop. There are no labels, so
  // there is nothing to name and nothing to pass.
  breakStatement(loc: SourceLocation): U;

  // e.g. continue; — starts that loop's next turn, after a `for`'s incrementor.
  continueStatement(loc: SourceLocation): U;

  // e.g. return i;
  returnStatement(loc: SourceLocation, expression: U): U;

  // e.g. throw "message";
  throwStatement(loc: SourceLocation, expression: U): U;

  // e.g. try { ... } catch (e) { ... } — there is no `finallyBlock`, which the
  // compiler rejects, and no `try` without a clause to catch it
  tryStatement(loc: SourceLocation, tryBlock: U, catchClause: U): U;

  // e.g. catch (e) { ... } — `variableDeclaration` is null for `catch { ... }`
  catchClause(loc: SourceLocation, variableDeclaration: U | null, block: U): U;

  // e.g. obj.a — `questionDotToken` for `obj?.a`, which reads as null (the
  // language's absent value, never `undefined`) when the receiver is null
  propertyAccessExpression(
    loc: SourceLocation,
    expression: U,
    questionDotToken: boolean,
    name: string,
  ): U;

  // e.g. a[i], row["name"] — the key is an expression, so unlike a property
  // name it need not be written in the source. Reading is total: a key the
  // array or object doesn't have reads as null, the language's absent value.
  elementAccessExpression(
    loc: SourceLocation,
    expression: U,
    argumentExpression: U,
  ): U;

  // e.g. a + b, and i = 0 — an assignment is a binary expression over `=`, as
  // it is in TypeScript. Its left is always an identifier: nothing else in this
  // language can be assigned to.
  binaryExpression(
    loc: SourceLocation,
    left: U,
    operatorToken: BinaryOperator,
    right: U,
  ): U;

  // e.g. c ? 1 : 2 — the condition is boolean (no truthiness), and only
  // the taken branch evaluates
  conditionalExpression(
    loc: SourceLocation,
    condition: U,
    whenTrue: U,
    whenFalse: U,
  ): U;

  // e.g. [1, 2, 3]
  arrayLiteralExpression(loc: SourceLocation, elements: U[]): U;

  // e.g. { a: 4 } — TypeScript carries a list of `PropertyAssignment` nodes
  // where this takes the properties by name, since a key here is always a name
  // and never an expression.
  objectLiteralExpression(
    loc: SourceLocation,
    properties: { [name: string]: U },
  ): U;

  // e.g. s.concat("!") — `questionDotToken` for `cb?.(…)`, which yields null
  // (never `undefined`) for a null callee, the arguments unevaluated
  callExpression(
    loc: SourceLocation,
    expression: U,
    questionDotToken: boolean,
    argumentsArray: U[],
  ): U;

  // e.g. (r, g, b) => { ... }
  arrowFunction(loc: SourceLocation, parameters: U[], body: U): U;

  // e.g. new $Foo(1)
  newExpression(loc: SourceLocation, expression: U, argumentsArray: U[]): U;
}
