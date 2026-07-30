import type { SourceLocation } from "./SourceLocation.js";
import type { SyntaxKind } from "./SyntaxKind.js";

// The syntax of a client script, as the compiler writes it. A `cs` template
// compiles to a thunk returning one of these, so this is the contract between
// what the compiler emits and what the bundler reads — the emitted code is
// checked against it in the project it was compiled in.
//
// Every node is named for the TypeScript node it mirrors — `ts.IfStatement` is
// `AstScriptIfStatement` — and its fields are TypeScript's, in TypeScript's
// order, so a reader who knows that AST knows this one. Anything this language
// adds comes last: an identifier's `bindingKey`, a declaration's `keyword`.
// Only `AstScriptSplice` has no counterpart, having no counterpart in
// JavaScript either.
//
// What TypeScript has and this hasn't: the type positions (`typeArguments`,
// `type`, `exclamationToken`, `modifiers`), the punctuation a parser keeps for
// formatting (`questionToken`, `colonToken`, `equalsGreaterThanToken`), and the
// slots for syntax this language rejects — a `try` has no `finallyBlock`, a
// jump takes no `label`, an element access takes no `questionDotToken`. A
// literal carries its value rather than the source text TypeScript keeps.

// The operators a script may write. `=` is one of them, because an assignment
// is a binary expression here exactly as it is in TypeScript.
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

// A script node that yields a value.
export type AstScriptExpression =
  | AstScriptArrayLiteralExpression
  | AstScriptArrowFunction
  | AstScriptBinaryExpression
  | AstScriptTrueLiteral
  | AstScriptFalseLiteral
  | AstScriptCallExpression
  | AstScriptIdentifier
  | AstScriptNewExpression
  | AstScriptNullLiteral
  | AstScriptNumericLiteral
  | AstScriptObjectLiteralExpression
  | AstScriptPropertyAccessExpression
  | AstScriptElementAccessExpression
  | AstScriptSplice
  | AstScriptStringLiteral
  | AstScriptConditionalExpression;

// A script node a block runs in order: control flow, bindings, or an
// expression evaluated for its effect.
export type AstScriptStatement =
  | AstScriptExpression
  | AstScriptBlock
  | AstScriptIfStatement
  | AstScriptWhileStatement
  | AstScriptForStatement
  | AstScriptBreakStatement
  | AstScriptContinueStatement
  | AstScriptReturnStatement
  | AstScriptThrowStatement
  | AstScriptTryStatement
  | AstScriptVariableDeclaration;

// The body of a script or an arrow: a block, or an expression whose value is
// implicitly returned.
export type AstScriptBody = AstScriptExpression | AstScriptBlock;

// Any node parsed from a client script's source text: the statement union
// spans the grammar, apart from the one clause that is neither a statement nor
// an expression. Every script node carries the source location it was parsed
// from.
export type AstScriptNode =
  | AstScriptStatement
  | AstScriptCatchClause
  | AstScriptParameterDeclaration
  | AstScriptPropertyAssignment;

export interface AstScriptArrayLiteralExpression {
  readonly kind: typeof SyntaxKind.ArrayLiteralExpression;
  readonly loc: SourceLocation;
  readonly elements: readonly AstScriptExpression[];
}

export interface AstScriptArrowFunction {
  readonly kind: typeof SyntaxKind.ArrowFunction;
  readonly loc: SourceLocation;
  readonly parameters: readonly AstScriptParameterDeclaration[];
  readonly body: AstScriptBody;
}

export interface AstScriptWhileStatement {
  readonly kind: typeof SyntaxKind.WhileStatement;
  readonly loc: SourceLocation;
  readonly expression: AstScriptExpression;
  readonly statement: AstScriptStatement;
}

// `init` is a declaration or an assignment and `update` an assignment, so both
// are statements rather than expressions.
export interface AstScriptForStatement {
  readonly kind: typeof SyntaxKind.ForStatement;
  readonly loc: SourceLocation;
  readonly initializer: AstScriptStatement | null;
  readonly condition: AstScriptExpression | null;
  readonly incrementor: AstScriptStatement | null;
  readonly statement: AstScriptStatement;
}

export interface AstScriptBreakStatement {
  readonly kind: typeof SyntaxKind.BreakStatement;
  readonly loc: SourceLocation;
}

export interface AstScriptContinueStatement {
  readonly kind: typeof SyntaxKind.ContinueStatement;
  readonly loc: SourceLocation;
}

export interface AstScriptBinaryExpression {
  readonly kind: typeof SyntaxKind.BinaryExpression;
  readonly loc: SourceLocation;
  readonly left: AstScriptExpression;
  readonly operatorToken: BinaryOperator;
  readonly right: AstScriptExpression;
}

export interface AstScriptConditionalExpression {
  readonly kind: typeof SyntaxKind.ConditionalExpression;
  readonly loc: SourceLocation;
  readonly condition: AstScriptExpression;
  readonly whenTrue: AstScriptExpression;
  readonly whenFalse: AstScriptExpression;
}

export interface AstScriptBlock {
  readonly kind: typeof SyntaxKind.Block;
  readonly loc: SourceLocation;
  readonly statements: readonly AstScriptStatement[];
}

// Two kinds rather than one with a value, as ts.TrueLiteral and
// ts.FalseLiteral are: the kind is the value.
export interface AstScriptTrueLiteral {
  readonly kind: typeof SyntaxKind.TrueKeyword;
  readonly loc: SourceLocation;
}

export interface AstScriptFalseLiteral {
  readonly kind: typeof SyntaxKind.FalseKeyword;
  readonly loc: SourceLocation;
}

export interface AstScriptCallExpression {
  readonly kind: typeof SyntaxKind.CallExpression;
  readonly loc: SourceLocation;
  readonly expression: AstScriptExpression;
  readonly questionDotToken: boolean;
  readonly arguments: readonly AstScriptExpression[];
}

export interface AstScriptIdentifier {
  readonly kind: typeof SyntaxKind.Identifier;
  readonly loc: SourceLocation;
  readonly text: string;
  readonly bindingKey: string;
}

export interface AstScriptIfStatement {
  readonly kind: typeof SyntaxKind.IfStatement;
  readonly loc: SourceLocation;
  readonly expression: AstScriptExpression;
  readonly thenStatement: AstScriptStatement;
  readonly elseStatement: AstScriptStatement | null;
}

// e.g. new ${Point}(1, 2) — a construction, mirrored 1:1 from the source.
// The class only exists on the host: its splice lowers to its expansion — a
// function with one hole per constructor parameter (see `lowerSpliceable`) —
// so the bundler expands the construction into a plain call of its callee
// (see `lowerScriptBody`).
export interface AstScriptNewExpression {
  readonly kind: typeof SyntaxKind.NewExpression;
  readonly loc: SourceLocation;
  readonly expression: AstScriptExpression;
  readonly arguments: readonly AstScriptExpression[];
}

export interface AstScriptNullLiteral {
  readonly kind: typeof SyntaxKind.NullKeyword;
  readonly loc: SourceLocation;
}

export interface AstScriptNumericLiteral {
  readonly kind: typeof SyntaxKind.NumericLiteral;
  readonly loc: SourceLocation;
  readonly value: number;
}

export interface AstScriptObjectLiteralExpression {
  readonly kind: typeof SyntaxKind.ObjectLiteralExpression;
  readonly loc: SourceLocation;
  readonly properties: readonly AstScriptPropertyAssignment[];
}

export interface AstScriptPropertyAccessExpression {
  readonly kind: typeof SyntaxKind.PropertyAccessExpression;
  readonly loc: SourceLocation;
  readonly expression: AstScriptExpression;
  readonly questionDotToken: boolean;
  readonly name: string;
}

// The key is an expression, not a name: `a[i]` and `row[column]` are the point,
// `row["name"]` only incidentally allowed.
export interface AstScriptElementAccessExpression {
  readonly kind: typeof SyntaxKind.ElementAccessExpression;
  readonly loc: SourceLocation;
  readonly expression: AstScriptExpression;
  readonly argumentExpression: AstScriptExpression;
}

export interface AstScriptReturnStatement {
  readonly kind: typeof SyntaxKind.ReturnStatement;
  readonly loc: SourceLocation;
  readonly expression: AstScriptExpression;
}

export interface AstScriptSplice {
  readonly kind: typeof SyntaxKind.Splice;
  readonly loc: SourceLocation;
  readonly key: string;
}

export interface AstScriptStringLiteral {
  readonly kind: typeof SyntaxKind.StringLiteral;
  readonly loc: SourceLocation;
  readonly text: string;
}

export interface AstScriptThrowStatement {
  readonly kind: typeof SyntaxKind.ThrowStatement;
  readonly loc: SourceLocation;
  readonly expression: AstScriptExpression;
}

export interface AstScriptTryStatement {
  readonly kind: typeof SyntaxKind.TryStatement;
  readonly loc: SourceLocation;
  readonly tryBlock: AstScriptBlock;
  readonly catchClause: AstScriptCatchClause;
}

// The clause a try statement catches with. `variableDeclaration` is null
// for a bindingless catch; TypeScript holds a declaration node there, where
// the name is all this needs.
export interface AstScriptCatchClause {
  readonly kind: typeof SyntaxKind.CatchClause;
  readonly loc: SourceLocation;
  readonly variableDeclaration: AstScriptIdentifier | null;
  readonly block: AstScriptBlock;
}

// A parameter is the name it binds: TypeScript's `dotDotDotToken`,
// `questionToken`, `type` and `initializer` are each rejected here.
export interface AstScriptParameterDeclaration {
  readonly kind: typeof SyntaxKind.Parameter;
  readonly loc: SourceLocation;
  readonly name: AstScriptIdentifier;
}

// One `a: 4` of an object literal. A key is always a plain name here, so
// `name` is that name rather than the `PropertyName` node TypeScript holds.
export interface AstScriptPropertyAssignment {
  readonly kind: typeof SyntaxKind.PropertyAssignment;
  readonly loc: SourceLocation;
  readonly name: string;
  readonly initializer: AstScriptExpression;
}

export interface AstScriptVariableDeclaration {
  readonly kind: typeof SyntaxKind.VariableDeclaration;
  readonly loc: SourceLocation;
  readonly name: AstScriptIdentifier;
  readonly initializer: AstScriptExpression;
  readonly keyword: "let" | "const";
}
