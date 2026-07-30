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
  | ClientScriptNewExpression
  | ClientScriptNullLiteral
  | ClientScriptNumericLiteral
  | ClientScriptObjectLiteralExpression
  | ClientScriptPropertyAccessExpression
  | ClientScriptElementAccessExpression
  | ClientScriptSplice
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

// Each node below is named for the TypeScript node it mirrors — `ts.IfStatement`
// is `ClientScriptIfStatement` — and its fields are TypeScript's, in TypeScript's
// order, so a reader who knows that AST knows this one. Anything this language
// adds comes last: an identifier's `bindingKey`, a declaration's `keyword`.
// Only `ClientScriptSplice` has no counterpart, having no counterpart in
// JavaScript either.
export interface ClientScriptNode {
  readonly kind: SyntaxKind;
  readonly loc: SourceLocation;
}

export interface ClientScriptArrayLiteralExpression extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.ArrayLiteralExpression;
  readonly elements: readonly ClientScriptExpression[];
}

export interface ClientScriptArrowFunction extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.ArrowFunction;
  readonly parameters: readonly ClientScriptParameterDeclaration[];
  readonly body: ClientScriptBody;
}

export interface ClientScriptWhileStatement extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.WhileStatement;
  readonly expression: ClientScriptExpression;
  readonly statement: ClientScriptStatement;
}

// The incrementor is an assignment, which is a statement's worth of syntax
// here even though TypeScript reads it as an expression.
export interface ClientScriptForStatement extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.ForStatement;
  // The list, not the statement — `ts.ForInitializer` is the same union.
  readonly initializer:
    | ClientScriptVariableDeclarationList
    | ClientScriptExpression
    | null;
  readonly condition: ClientScriptExpression | null;
  readonly incrementor: ClientScriptStatement | null;
  readonly statement: ClientScriptStatement;
}

export interface ClientScriptBreakStatement extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.BreakStatement;
}

export interface ClientScriptContinueStatement extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.ContinueStatement;
}

export interface ClientScriptBinaryExpression extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.BinaryExpression;
  readonly left: ClientScriptExpression;
  readonly operatorToken: BinaryOperator;
  readonly right: ClientScriptExpression;
}

// `!x`, whose operand is boolean like every other tested position: there is no
// truthiness for it to negate.
export interface ClientScriptPrefixUnaryExpression extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.PrefixUnaryExpression;
  readonly operator: PrefixUnaryOperator;
  readonly operand: ClientScriptExpression;
}

export interface ClientScriptConditionalExpression extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.ConditionalExpression;
  readonly condition: ClientScriptExpression;
  readonly whenTrue: ClientScriptExpression;
  readonly whenFalse: ClientScriptExpression;
}

export interface ClientScriptBlock extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.Block;
  readonly statements: readonly ClientScriptStatement[];
}

// Two kinds rather than one with a value, as ts.TrueLiteral and
// ts.FalseLiteral are: the kind is the value.
export interface ClientScriptTrueLiteral extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.TrueKeyword;
}

export interface ClientScriptFalseLiteral extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.FalseKeyword;
}

export interface ClientScriptCallExpression extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.CallExpression;
  readonly expression: ClientScriptExpression;
  readonly questionDotToken: boolean;
  readonly arguments: readonly ClientScriptExpression[];
}

export interface ClientScriptIdentifier extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.Identifier;
  readonly text: string;
  readonly bindingKey: string;
}

export interface ClientScriptIfStatement extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.IfStatement;
  readonly expression: ClientScriptExpression;
  readonly thenStatement: ClientScriptStatement;
  readonly elseStatement: ClientScriptStatement | null;
}

// e.g. new ${Point}(1, 2) — a construction, mirrored 1:1 from the source.
// The class only exists on the host: its splice lowers to its expansion — a
// function with one hole per constructor parameter (see `lowerSpliceable`) —
// so the bundler expands the construction into a plain call of its callee
// (see `lowerScriptBody`).
export interface ClientScriptNewExpression extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.NewExpression;
  readonly expression: ClientScriptExpression;
  readonly arguments: readonly ClientScriptExpression[];
}

export interface ClientScriptNullLiteral extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.NullKeyword;
}

export interface ClientScriptNumericLiteral extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.NumericLiteral;
  readonly value: number;
}

export interface ClientScriptObjectLiteralExpression extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.ObjectLiteralExpression;
  readonly properties: readonly ClientScriptPropertyAssignment[];
}

export interface ClientScriptPropertyAccessExpression extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.PropertyAccessExpression;
  readonly expression: ClientScriptExpression;
  readonly questionDotToken: boolean;
  readonly name: string;
}

// The key is an expression, not a name: `a[i]` and `row[column]` are the point,
// `row["name"]` only incidentally allowed.
export interface ClientScriptElementAccessExpression extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.ElementAccessExpression;
  readonly expression: ClientScriptExpression;
  readonly argumentExpression: ClientScriptExpression;
}

export interface ClientScriptReturnStatement extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.ReturnStatement;
  readonly expression: ClientScriptExpression;
}

export interface ClientScriptSplice extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.Splice;
  readonly key: string;
}

export interface ClientScriptStringLiteral extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.StringLiteral;
  readonly text: string;
}

export interface ClientScriptThrowStatement extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.ThrowStatement;
  readonly expression: ClientScriptExpression;
}

export interface ClientScriptTryStatement extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.TryStatement;
  readonly tryBlock: ClientScriptBlock;
  readonly catchClause: ClientScriptCatchClause;
}

// The clause a try statement catches with. `variableDeclaration` is null
// for a bindingless catch; TypeScript holds a declaration node there, where
// the name is all this needs.
export interface ClientScriptCatchClause extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.CatchClause;
  readonly variableDeclaration: ClientScriptIdentifier | null;
  readonly block: ClientScriptBlock;
}

// A parameter is the name it binds: TypeScript's `dotDotDotToken`,
// `questionToken`, `type` and `initializer` are each rejected here.
export interface ClientScriptParameterDeclaration extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.Parameter;
  readonly name: ClientScriptIdentifier;
}

// One `a: 4` of an object literal. A key is always a plain name here, so
// `name` is that name rather than the `PropertyName` node TypeScript holds.
export interface ClientScriptPropertyAssignment extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.PropertyAssignment;
  readonly name: string;
  readonly initializer: ClientScriptExpression;
}

// A declaration in statement position, wrapping the list that holds it —
// TypeScript spends the same three nodes, and for the same reason: a `for`
// header takes the list without this wrapper (see
// `ClientScriptForStatement.initializer`).
export interface ClientScriptVariableStatement extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.VariableStatement;
  readonly declarationList: ClientScriptVariableDeclarationList;
}

// Always one declaration: the compiler rejects `let a = 1, b = 2`, so the array
// is TypeScript's shape rather than something this language uses.
//
// `keyword` is the one field with no TypeScript counterpart, and this is the
// node TypeScript keeps the same fact on — as `NodeFlags.Const` or
// `NodeFlags.Let` in `Node.flags`, where this spells the word.
export interface ClientScriptVariableDeclarationList extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.VariableDeclarationList;
  readonly declarations: readonly ClientScriptVariableDeclaration[];
  readonly keyword: "let" | "const";
}

export interface ClientScriptVariableDeclaration extends ClientScriptNode {
  readonly kind: typeof SyntaxKind.VariableDeclaration;
  readonly name: ClientScriptIdentifier;
  readonly initializer: ClientScriptExpression;
}
