import type { BinaryOperator } from "./BinaryOperator.js";
import type { PrefixUnaryOperator } from "./PrefixUnaryOperator.js";
import type { SourceLocation } from "./SourceLocation.js";

// The syntax of a client script, as the compiler writes it. A `cs` template
// compiles to a thunk returning one of these, so this is the contract between
// what the compiler emits and what the bundler reads — the emitted code is
// checked against it in the project it was compiled in.

// A script node that yields a value.
export type ClientScriptExpression =
  | ClientScriptArrayLiteralExpression
  | ClientScriptArrowFunction
  | ClientScriptBinaryExpression
  | ClientScriptPrefixUnaryExpression
  | ClientScriptTrueLiteral
  | ClientScriptFalseLiteral
  | ClientScriptCall
  | ClientScriptIdentifier
  | ClientScriptNullLiteral
  | ClientScriptUndefinedLiteral
  | ClientScriptNumericLiteral
  | ClientScriptObjectLiteralExpression
  | ClientScriptPropertyAccess
  | ClientScriptElementAccessExpression
  | ClientScriptSplice
  | ClientScriptBuiltin
  | ClientScriptJsxElement
  | ClientScriptStringLiteral
  | ClientScriptConditionalExpression;

// A script node a block runs in order: control flow, bindings, or an
// expression evaluated for its effect.
export type ClientScriptStatement =
  | ClientScriptExpression
  | ClientScriptBlock
  | ClientScriptIfStatement
  | ClientScriptWhileStatement
  | ClientScriptForStatement
  | ClientScriptBreakStatement
  | ClientScriptContinueStatement
  | ClientScriptReturnStatement
  | ClientScriptThrowStatement
  | ClientScriptTryStatement
  | ClientScriptDeclaration;

// The body of a script or an arrow: a block, or an expression whose value is
// implicitly returned.
export type ClientScriptBody = ClientScriptExpression | ClientScriptBlock;

// Any node at all: the statements, which cover the expressions, and the rest —
// each admitted only by a particular list or clause. Spread is TypeScript's one
// disagreement: `ts.SpreadElement` is an `Expression` there, where here it is
// only what an array or an argument list may hold.
export type ClientScriptNode =
  | ClientScriptStatement
  | ClientScriptSpreadElement
  | ClientScriptParameterDeclaration
  | ClientScriptPropertyAssignment
  | ClientScriptCatchClause;

// Each node below is named for the TypeScript node it mirrors — `ts.IfStatement`
// is `ClientScriptIfStatement` — and its fields are TypeScript's, in TypeScript's
// order, so a reader who knows that AST knows this one. Anything this language
// adds comes last: an identifier's `bindingKey`, a declaration's `keyword`.
// Only `ClientScriptSplice` has no counterpart, having no counterpart in
// JavaScript either.

export interface ClientScriptArrayLiteralExpression {
  readonly kind: "arr";
  readonly loc: SourceLocation;
  readonly elements: readonly ClientScriptArrayElement[];
}

// `...xs`, which is not an expression: it stands where an element or an
// argument stands and contributes however many the array it spreads has. Named
// only by the two lists that admit it, so nothing else has to consider it.
export interface ClientScriptSpreadElement {
  readonly kind: "...";
  readonly loc: SourceLocation;
  readonly expression: ClientScriptExpression;
}

export type ClientScriptArrayElement =
  | ClientScriptExpression
  | ClientScriptSpreadElement;

export interface ClientScriptArrowFunction {
  readonly kind: "=>";
  readonly loc: SourceLocation;
  readonly parameters: readonly ClientScriptParameterDeclaration[];
  readonly body: ClientScriptBody;
}

export interface ClientScriptWhileStatement {
  readonly kind: "while";
  readonly loc: SourceLocation;
  readonly expression: ClientScriptExpression;
  readonly statement: ClientScriptStatement;
}

export interface ClientScriptForStatement {
  readonly kind: "for";
  readonly loc: SourceLocation;
  // The list, not the statement — `ts.ForInitializer` is the same union.
  readonly initializer: ClientScriptDeclaration | ClientScriptExpression | null;
  readonly condition: ClientScriptExpression | null;
  readonly incrementor: ClientScriptExpression | null;
  readonly statement: ClientScriptStatement;
}

export interface ClientScriptBreakStatement {
  readonly kind: "break";
  readonly loc: SourceLocation;
}

export interface ClientScriptContinueStatement {
  readonly kind: "continue";
  readonly loc: SourceLocation;
}

export interface ClientScriptBinaryExpression {
  readonly kind: "binop";
  readonly loc: SourceLocation;
  readonly left: ClientScriptExpression;
  readonly operatorToken: BinaryOperator;
  readonly right: ClientScriptExpression;
}

// `!x`, whose operand is boolean like every other tested position: there is no
// truthiness for it to negate.
export interface ClientScriptPrefixUnaryExpression {
  readonly kind: "unop";
  readonly loc: SourceLocation;
  readonly operator: PrefixUnaryOperator;
  readonly operand: ClientScriptExpression;
}

export interface ClientScriptConditionalExpression {
  readonly kind: "?:";
  readonly loc: SourceLocation;
  readonly condition: ClientScriptExpression;
  readonly whenTrue: ClientScriptExpression;
  readonly whenFalse: ClientScriptExpression;
}

export interface ClientScriptBlock {
  readonly kind: "{}";
  readonly loc: SourceLocation;
  readonly statements: readonly ClientScriptStatement[];
}

// Two kinds rather than one with a value, as ts.TrueLiteral and
// ts.FalseLiteral are: the kind is the value.
export interface ClientScriptTrueLiteral {
  readonly kind: "true";
  readonly loc: SourceLocation;
}

export interface ClientScriptFalseLiteral {
  readonly kind: "false";
  readonly loc: SourceLocation;
}

// `f(…)` and `f?.(…)`, which are two kinds rather than one with a flag: what
// short-circuits is what the node is, not something it carries.
export interface ClientScriptCallExpression {
  readonly kind: "()";
  readonly loc: SourceLocation;
  readonly expression: ClientScriptExpression;
  readonly arguments: readonly ClientScriptArrayElement[];
}

export interface ClientScriptOptionalCallExpression {
  readonly kind: "?.()";
  readonly loc: SourceLocation;
  readonly expression: ClientScriptExpression;
  readonly arguments: readonly ClientScriptArrayElement[];
}

export type ClientScriptCall =
  | ClientScriptCallExpression
  | ClientScriptOptionalCallExpression;

export interface ClientScriptIdentifier {
  readonly kind: "id";
  readonly loc: SourceLocation;
  readonly text: string;
  readonly bindingKey: string;
}

export interface ClientScriptIfStatement {
  readonly kind: "if";
  readonly loc: SourceLocation;
  readonly expression: ClientScriptExpression;
  readonly thenStatement: ClientScriptStatement;
  readonly elseStatement: ClientScriptStatement | null;
}

// e.g. new ${Point}(1, 2) — a construction, mirrored 1:1 from the source.
// The class only exists on the host: its splice lowers to its expansion — a
// function with one hole per constructor parameter (see `lowerSpliceable`) —
// so the bundler expands the construction into a plain call of its callee
// (see `lowerScriptBody`).

export interface ClientScriptNullLiteral {
  readonly kind: "null";
  readonly loc: SourceLocation;
}

// What an absent value is. `null` is written; this is what a `?.` that
// short-circuits, a missing argument and a bodiless `return` all produce.
export interface ClientScriptUndefinedLiteral {
  readonly kind: "undefined";
  readonly loc: SourceLocation;
}

export interface ClientScriptNumericLiteral {
  readonly kind: "number";
  readonly loc: SourceLocation;
  readonly value: number;
}

export interface ClientScriptObjectLiteralExpression {
  readonly kind: "obj";
  readonly loc: SourceLocation;
  readonly properties: readonly ClientScriptObjectMember[];
}

// `object.name` and `object?.name`, told apart the same way.
export interface ClientScriptPropertyAccessExpression {
  readonly kind: ".";
  readonly loc: SourceLocation;
  readonly expression: ClientScriptExpression;
  readonly name: string;
}

export interface ClientScriptOptionalPropertyAccessExpression {
  readonly kind: "?.";
  readonly loc: SourceLocation;
  readonly expression: ClientScriptExpression;
  readonly name: string;
}

export type ClientScriptPropertyAccess =
  | ClientScriptPropertyAccessExpression
  | ClientScriptOptionalPropertyAccessExpression;

export interface ClientScriptElementAccessExpression {
  readonly kind: "[]";
  readonly loc: SourceLocation;
  readonly expression: ClientScriptExpression;
  readonly argumentExpression: ClientScriptExpression;
}

export interface ClientScriptReturnStatement {
  readonly kind: "return";
  readonly loc: SourceLocation;
  readonly expression: ClientScriptExpression;
}

export interface ClientScriptBuiltin {
  readonly kind: "bltn";
  readonly loc: SourceLocation;
  readonly name: string;
}

export interface ClientScriptSplice {
  readonly kind: "splice";
  readonly loc: SourceLocation;
  readonly key: string;
}

// `<tr class={…}>{…}</tr>`: an element the script builds where it stands. Its
// children are its own, in source order, and an attribute's initializer is an
// expression like any other — so a name written inside one resolves against the
// script's scopes, not the host's.
//
// One node where TypeScript has two: `ts.JsxSelfClosingElement` exists because
// that AST keeps the syntax, and `<td />` and `<td></td>` are the same element
// here. The fields are the opening tag's, in its order, and then the children
// `ts.JsxElement` carries.
export interface ClientScriptJsxElement {
  readonly kind: "jsx";
  readonly loc: SourceLocation;
  readonly type:
    | ClientScriptStringLiteral
    | ClientScriptSplice
    | ClientScriptIdentifier;
  readonly attributes: readonly ClientScriptJsxAttribute[];
  readonly children: readonly ClientScriptExpression[];
}

// Not a node: an attribute stands only where an element's opening tag admits
// one, the way a parameter stands only in a parameter list. Its initializer is
// required where `ts.JsxAttribute` leaves it optional — a valueless `disabled`
// is written as the `true` it means, so nothing downstream reads an absence.
export interface ClientScriptJsxAttribute {
  readonly name: string;
  readonly initializer: ClientScriptExpression;
}

export interface ClientScriptStringLiteral {
  readonly kind: "string";
  readonly loc: SourceLocation;
  readonly text: string;
}

export interface ClientScriptThrowStatement {
  readonly kind: "throw";
  readonly loc: SourceLocation;
  readonly expression: ClientScriptExpression;
}

export interface ClientScriptTryStatement {
  readonly kind: "try";
  readonly loc: SourceLocation;
  readonly tryBlock: ClientScriptBlock;
  readonly catchClause: ClientScriptCatchClause;
}

// The clause a try statement catches with. `variableDeclaration` is null
// for a bindingless catch; TypeScript holds a declaration node there, where
// the name is all this needs.
export interface ClientScriptCatchClause {
  readonly kind: "catch";
  readonly loc: SourceLocation;
  readonly variableDeclaration: ClientScriptIdentifier | null;
  readonly block: ClientScriptBlock;
}

// A parameter is the name it binds: TypeScript's `dotDotDotToken`,
// `questionToken`, `type` and `initializer` are each rejected here.
export interface ClientScriptParameterDeclaration {
  readonly kind: "param";
  readonly loc: SourceLocation;
  readonly name: ClientScriptIdentifier;
}

// A pair, or a spread of another object — the two things an object literal's
// list admits, the way an array's admits an element or a spread of one.
export type ClientScriptObjectMember =
  | ClientScriptPropertyAssignment
  | ClientScriptSpreadElement;

// One `a: 4` or `[key]: 4` of an object literal. The key is an expression
// that yields a string either way; a written one is a string literal.
export interface ClientScriptPropertyAssignment {
  readonly kind: ":";
  readonly loc: SourceLocation;
  readonly name: ClientScriptExpression;
  readonly initializer: ClientScriptExpression;
}

// `const x = 1` and `let x = 1`, which are one node and not three: the
// keyword is the kind, as `true` and `false` are two kinds rather than one
// with a value. TypeScript's statement-holding-a-list-holding-a-declaration
// says two things this language has no second case for — a list may hold
// several, and a declaration may have no initializer — so it says neither.
export interface ClientScriptConstDeclaration {
  readonly kind: "const";
  readonly loc: SourceLocation;
  readonly name: ClientScriptIdentifier;
  readonly initializer: ClientScriptExpression;
}

export interface ClientScriptLetDeclaration {
  readonly kind: "let";
  readonly loc: SourceLocation;
  readonly name: ClientScriptIdentifier;
  readonly initializer: ClientScriptExpression;
}

export type ClientScriptDeclaration =
  | ClientScriptConstDeclaration
  | ClientScriptLetDeclaration;

// Every kind there is, read off the nodes rather than listed beside them.
export type ClientScriptKind = ClientScriptNode["kind"];
