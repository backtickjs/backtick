import type { BinaryOperator } from "./BinaryOperator.js";
import type { PrefixUnaryOperator } from "./PrefixUnaryOperator.js";
import type { SourceLocation } from "./SourceLocation.js";
import type { SyntaxKind } from "./SyntaxKind.js";

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
  | ClientScriptCallExpression
  | ClientScriptIdentifier
  | ClientScriptNullLiteral
  | ClientScriptNumericLiteral
  | ClientScriptObjectLiteralExpression
  | ClientScriptPropertyAccessExpression
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
  | ClientScriptVariableStatement;

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
  | ClientScriptCatchClause
  | ClientScriptVariableDeclarationList
  | ClientScriptVariableDeclaration;

// Each node below is named for the TypeScript node it mirrors — `ts.IfStatement`
// is `ClientScriptIfStatement` — and its fields are TypeScript's, in TypeScript's
// order, so a reader who knows that AST knows this one. Anything this language
// adds comes last: an identifier's `bindingKey`, a declaration's `keyword`.
// Only `ClientScriptSplice` has no counterpart, having no counterpart in
// JavaScript either.

export interface ClientScriptArrayLiteralExpression {
  readonly kind: typeof SyntaxKind.ArrayLiteralExpression;
  readonly loc: SourceLocation;
  readonly elements: readonly ClientScriptArrayElement[];
}

// `...xs`, which is not an expression: it stands where an element or an
// argument stands and contributes however many the array it spreads has. Named
// only by the two lists that admit it, so nothing else has to consider it.
export interface ClientScriptSpreadElement {
  readonly kind: typeof SyntaxKind.SpreadElement;
  readonly loc: SourceLocation;
  readonly expression: ClientScriptExpression;
}

export type ClientScriptArrayElement =
  | ClientScriptExpression
  | ClientScriptSpreadElement;

export interface ClientScriptArrowFunction {
  readonly kind: typeof SyntaxKind.ArrowFunction;
  readonly loc: SourceLocation;
  readonly parameters: readonly ClientScriptParameterDeclaration[];
  readonly body: ClientScriptBody;
}

export interface ClientScriptWhileStatement {
  readonly kind: typeof SyntaxKind.WhileStatement;
  readonly loc: SourceLocation;
  readonly expression: ClientScriptExpression;
  readonly statement: ClientScriptStatement;
}

// The incrementor is an assignment, which is a statement's worth of syntax
// here even though TypeScript reads it as an expression.
export interface ClientScriptForStatement {
  readonly kind: typeof SyntaxKind.ForStatement;
  readonly loc: SourceLocation;
  // The list, not the statement — `ts.ForInitializer` is the same union.
  readonly initializer:
    | ClientScriptVariableDeclarationList
    | ClientScriptExpression
    | null;
  readonly condition: ClientScriptExpression | null;
  readonly incrementor: ClientScriptStatement | null;
  readonly statement: ClientScriptStatement;
}

export interface ClientScriptBreakStatement {
  readonly kind: typeof SyntaxKind.BreakStatement;
  readonly loc: SourceLocation;
}

export interface ClientScriptContinueStatement {
  readonly kind: typeof SyntaxKind.ContinueStatement;
  readonly loc: SourceLocation;
}

export interface ClientScriptBinaryExpression {
  readonly kind: typeof SyntaxKind.BinaryExpression;
  readonly loc: SourceLocation;
  readonly left: ClientScriptExpression;
  readonly operatorToken: BinaryOperator;
  readonly right: ClientScriptExpression;
}

// `!x`, whose operand is boolean like every other tested position: there is no
// truthiness for it to negate.
export interface ClientScriptPrefixUnaryExpression {
  readonly kind: typeof SyntaxKind.PrefixUnaryExpression;
  readonly loc: SourceLocation;
  readonly operator: PrefixUnaryOperator;
  readonly operand: ClientScriptExpression;
}

export interface ClientScriptConditionalExpression {
  readonly kind: typeof SyntaxKind.ConditionalExpression;
  readonly loc: SourceLocation;
  readonly condition: ClientScriptExpression;
  readonly whenTrue: ClientScriptExpression;
  readonly whenFalse: ClientScriptExpression;
}

export interface ClientScriptBlock {
  readonly kind: typeof SyntaxKind.Block;
  readonly loc: SourceLocation;
  readonly statements: readonly ClientScriptStatement[];
}

// Two kinds rather than one with a value, as ts.TrueLiteral and
// ts.FalseLiteral are: the kind is the value.
export interface ClientScriptTrueLiteral {
  readonly kind: typeof SyntaxKind.TrueKeyword;
  readonly loc: SourceLocation;
}

export interface ClientScriptFalseLiteral {
  readonly kind: typeof SyntaxKind.FalseKeyword;
  readonly loc: SourceLocation;
}

export interface ClientScriptCallExpression {
  readonly kind: typeof SyntaxKind.CallExpression;
  readonly loc: SourceLocation;
  readonly expression: ClientScriptExpression;
  readonly questionDotToken: boolean;
  readonly arguments: readonly ClientScriptArrayElement[];
}

export interface ClientScriptIdentifier {
  readonly kind: typeof SyntaxKind.Identifier;
  readonly loc: SourceLocation;
  readonly text: string;
  readonly bindingKey: string;
}

export interface ClientScriptIfStatement {
  readonly kind: typeof SyntaxKind.IfStatement;
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
  readonly kind: typeof SyntaxKind.NullKeyword;
  readonly loc: SourceLocation;
}

export interface ClientScriptNumericLiteral {
  readonly kind: typeof SyntaxKind.NumericLiteral;
  readonly loc: SourceLocation;
  readonly value: number;
}

export interface ClientScriptObjectLiteralExpression {
  readonly kind: typeof SyntaxKind.ObjectLiteralExpression;
  readonly loc: SourceLocation;
  readonly properties: readonly ClientScriptPropertyAssignment[];
}

export interface ClientScriptPropertyAccessExpression {
  readonly kind: typeof SyntaxKind.PropertyAccessExpression;
  readonly loc: SourceLocation;
  readonly expression: ClientScriptExpression;
  readonly questionDotToken: boolean;
  readonly name: string;
}

// The key is an expression, not a name: `a[i]` and `row[column]` are the point,
// `row["name"]` only incidentally allowed.
export interface ClientScriptElementAccessExpression {
  readonly kind: typeof SyntaxKind.ElementAccessExpression;
  readonly loc: SourceLocation;
  readonly expression: ClientScriptExpression;
  readonly argumentExpression: ClientScriptExpression;
}

export interface ClientScriptReturnStatement {
  readonly kind: typeof SyntaxKind.ReturnStatement;
  readonly loc: SourceLocation;
  readonly expression: ClientScriptExpression;
}

export interface ClientScriptBuiltin {
  readonly kind: typeof SyntaxKind.Builtin;
  readonly loc: SourceLocation;
  readonly name: string;
}

export interface ClientScriptSplice {
  readonly kind: typeof SyntaxKind.Splice;
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
  readonly kind: typeof SyntaxKind.JsxElement;
  readonly loc: SourceLocation;
  readonly type: ClientScriptStringLiteral | ClientScriptSplice;
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
  readonly kind: typeof SyntaxKind.StringLiteral;
  readonly loc: SourceLocation;
  readonly text: string;
}

export interface ClientScriptThrowStatement {
  readonly kind: typeof SyntaxKind.ThrowStatement;
  readonly loc: SourceLocation;
  readonly expression: ClientScriptExpression;
}

export interface ClientScriptTryStatement {
  readonly kind: typeof SyntaxKind.TryStatement;
  readonly loc: SourceLocation;
  readonly tryBlock: ClientScriptBlock;
  readonly catchClause: ClientScriptCatchClause;
}

// The clause a try statement catches with. `variableDeclaration` is null
// for a bindingless catch; TypeScript holds a declaration node there, where
// the name is all this needs.
export interface ClientScriptCatchClause {
  readonly kind: typeof SyntaxKind.CatchClause;
  readonly loc: SourceLocation;
  readonly variableDeclaration: ClientScriptIdentifier | null;
  readonly block: ClientScriptBlock;
}

// A parameter is the name it binds: TypeScript's `dotDotDotToken`,
// `questionToken`, `type` and `initializer` are each rejected here.
export interface ClientScriptParameterDeclaration {
  readonly kind: typeof SyntaxKind.Parameter;
  readonly loc: SourceLocation;
  readonly name: ClientScriptIdentifier;
}

// One `a: 4` of an object literal. A key is always a plain name here, so
// `name` is that name rather than the `PropertyName` node TypeScript holds.
export interface ClientScriptPropertyAssignment {
  readonly kind: typeof SyntaxKind.PropertyAssignment;
  readonly loc: SourceLocation;
  readonly name: string;
  readonly initializer: ClientScriptExpression;
}

// A declaration in statement position, wrapping the list that holds it —
// TypeScript spends the same three nodes, and for the same reason: a `for`
// header takes the list without this wrapper (see
// `ClientScriptForStatement.initializer`).
export interface ClientScriptVariableStatement {
  readonly kind: typeof SyntaxKind.VariableStatement;
  readonly loc: SourceLocation;
  readonly declarationList: ClientScriptVariableDeclarationList;
}

// Always one declaration: the compiler rejects `let a = 1, b = 2`, so the array
// is TypeScript's shape rather than something this language uses.
//
// `keyword` is the one field with no TypeScript counterpart, and this is the
// node TypeScript keeps the same fact on — as `NodeFlags.Const` or
// `NodeFlags.Let` in `Node.flags`, where this spells the word.
export interface ClientScriptVariableDeclarationList {
  readonly kind: typeof SyntaxKind.VariableDeclarationList;
  readonly loc: SourceLocation;
  readonly declarations: readonly ClientScriptVariableDeclaration[];
  readonly keyword: "let" | "const";
}

export interface ClientScriptVariableDeclaration {
  readonly kind: typeof SyntaxKind.VariableDeclaration;
  readonly loc: SourceLocation;
  readonly name: ClientScriptIdentifier;
  readonly initializer: ClientScriptExpression;
}
