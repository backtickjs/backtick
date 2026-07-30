import type { BinaryOperator, SourceLocation } from "@backtickjs/cs-runtime";

// A node built from a value spliced into a client script. Splice values are
// resolved at runtime and have no source text, so a value node never has a
// location.
export type Ast =
  | AstScript
  | AstArray
  | AstBoolean
  | AstElement
  | AstExpansion
  | AstHole
  | AstInstance
  | AstNull
  | AstNumber
  | AstObject
  | AstState
  | AstString;

// A state cell (`state(initial)`): the client owns the storage, allocated per
// instance of the tree that declares the cell; what ships is the initial
// value. One node per cell — identity is the cell object — so every splice of
// one cell reaches the same storage.
export interface AstState {
  readonly kind: "AstState";
  readonly initial: Ast;
  readonly declaredIn: AstInstance;
}

// A script node that yields a value.
export type AstScriptExpression =
  | AstScriptArrayLiteralExpression
  | AstScriptArrowFunction
  | AstScriptBinaryExpression
  | AstScriptBooleanLiteral
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
export type AstScriptNode = AstScriptStatement | AstScriptCatchClause;

export interface AstScript {
  readonly kind: "AstScript";
  readonly loc: SourceLocation;
  readonly fileHash: string;
  readonly splices: Readonly<Record<string, Ast>>;
  readonly captures: readonly string[];
  readonly spliceParams: Readonly<Record<string, readonly string[]>>;
  readonly expression: AstScriptBody;
}

export interface AstScriptArrayLiteralExpression {
  readonly kind: "AstScriptArrayLiteralExpression";
  readonly loc: SourceLocation;
  readonly elements: readonly AstScriptExpression[];
}

export interface AstScriptArrowFunction {
  readonly kind: "AstScriptArrowFunction";
  readonly loc: SourceLocation;
  readonly parameters: readonly AstScriptIdentifier[];
  readonly body: AstScriptBody;
}

export interface AstScriptWhileStatement {
  readonly kind: "AstScriptWhileStatement";
  readonly loc: SourceLocation;
  readonly expression: AstScriptExpression;
  readonly statement: AstScriptStatement;
}

// `init` is a declaration or an assignment and `update` an assignment, so both
// are statements rather than expressions.
export interface AstScriptForStatement {
  readonly kind: "AstScriptForStatement";
  readonly loc: SourceLocation;
  readonly initializer: AstScriptStatement | null;
  readonly condition: AstScriptExpression | null;
  readonly incrementor: AstScriptStatement | null;
  readonly statement: AstScriptStatement;
}

export interface AstScriptBreakStatement {
  readonly kind: "AstScriptBreakStatement";
  readonly loc: SourceLocation;
}

export interface AstScriptContinueStatement {
  readonly kind: "AstScriptContinueStatement";
  readonly loc: SourceLocation;
}

export interface AstScriptBinaryExpression {
  readonly kind: "AstScriptBinaryExpression";
  readonly loc: SourceLocation;
  readonly left: AstScriptExpression;
  readonly operatorToken: BinaryOperator;
  readonly right: AstScriptExpression;
}

export interface AstScriptConditionalExpression {
  readonly kind: "AstScriptConditionalExpression";
  readonly loc: SourceLocation;
  readonly condition: AstScriptExpression;
  readonly whenTrue: AstScriptExpression;
  readonly whenFalse: AstScriptExpression;
}

export interface AstScriptBlock {
  readonly kind: "AstScriptBlock";
  readonly loc: SourceLocation;
  readonly statements: readonly AstScriptStatement[];
}

export interface AstScriptBooleanLiteral {
  readonly kind: "AstScriptBooleanLiteral";
  readonly loc: SourceLocation;
  readonly value: boolean;
}

export interface AstScriptCallExpression {
  readonly kind: "AstScriptCallExpression";
  readonly loc: SourceLocation;
  readonly expression: AstScriptExpression;
  readonly questionDotToken: boolean;
  readonly arguments: readonly AstScriptExpression[];
}

export interface AstScriptIdentifier {
  readonly kind: "AstScriptIdentifier";
  readonly loc: SourceLocation;
  readonly text: string;
  readonly bindingKey: string;
}

export interface AstScriptIfStatement {
  readonly kind: "AstScriptIfStatement";
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
  readonly kind: "AstScriptNewExpression";
  readonly loc: SourceLocation;
  readonly expression: AstScriptExpression;
  readonly arguments: readonly AstScriptExpression[];
}

export interface AstScriptNullLiteral {
  readonly kind: "AstScriptNullLiteral";
  readonly loc: SourceLocation;
}

export interface AstScriptNumericLiteral {
  readonly kind: "AstScriptNumericLiteral";
  readonly loc: SourceLocation;
  readonly value: number;
}

export interface AstScriptObjectLiteralExpression {
  readonly kind: "AstScriptObjectLiteralExpression";
  readonly loc: SourceLocation;
  readonly properties: Readonly<Record<string, AstScriptExpression>>;
}

export interface AstScriptPropertyAccessExpression {
  readonly kind: "AstScriptPropertyAccessExpression";
  readonly loc: SourceLocation;
  readonly expression: AstScriptExpression;
  readonly questionDotToken: boolean;
  readonly name: string;
}

// The key is an expression, not a name: `a[i]` and `row[column]` are the point,
// `row["name"]` only incidentally allowed.
export interface AstScriptElementAccessExpression {
  readonly kind: "AstScriptElementAccessExpression";
  readonly loc: SourceLocation;
  readonly expression: AstScriptExpression;
  readonly argumentExpression: AstScriptExpression;
}

export interface AstScriptReturnStatement {
  readonly kind: "AstScriptReturnStatement";
  readonly loc: SourceLocation;
  readonly expression: AstScriptExpression;
}

export interface AstScriptSplice {
  readonly kind: "AstScriptSplice";
  readonly loc: SourceLocation;
  readonly key: string;
}

export interface AstScriptStringLiteral {
  readonly kind: "AstScriptStringLiteral";
  readonly loc: SourceLocation;
  readonly text: string;
}

export interface AstScriptThrowStatement {
  readonly kind: "AstScriptThrowStatement";
  readonly loc: SourceLocation;
  readonly expression: AstScriptExpression;
}

export interface AstScriptTryStatement {
  readonly kind: "AstScriptTryStatement";
  readonly loc: SourceLocation;
  readonly tryBlock: AstScriptBlock;
  readonly catchClause: AstScriptCatchClause;
}

// The clause a try statement catches with. `variableDeclaration` is null
// for a bindingless catch; TypeScript holds a declaration node there, where
// the name is all this needs.
export interface AstScriptCatchClause {
  readonly kind: "AstScriptCatchClause";
  readonly loc: SourceLocation;
  readonly variableDeclaration: AstScriptIdentifier | null;
  readonly block: AstScriptBlock;
}

export interface AstScriptVariableDeclaration {
  readonly kind: "AstScriptVariableDeclaration";
  readonly loc: SourceLocation;
  readonly name: AstScriptIdentifier;
  readonly initializer: AstScriptExpression;
  readonly keyword: "let" | "const";
}

export interface AstArray {
  readonly kind: "AstArray";
  readonly elements: readonly Ast[];
}

export interface AstBoolean {
  readonly kind: "AstBoolean";
  readonly value: boolean;
}

export interface AstElement {
  readonly kind: "AstElement";
  readonly id: string;
  readonly key: Ast;
  readonly props: Readonly<Record<string, Ast>>;
}

// A server component's invocation, wrapping what it resolved to. One node per
// invocation rather than per component: the node is what owns the cells its
// component declares, so it can't depend on how often the component is named.
export interface AstInstance {
  readonly kind: "AstInstance";
  readonly key: Ast;
  child: AstInstance | AstElement | null;
}

// A spliced class's bundle-time expansion: the spliceable the constructor
// returned when applied to one opaque hole per declared parameter (see
// `createHole`), read as an arrow over `params`. It is what the class's
// splice slot holds (see `lowerSpliceable`), so a construction — compiled as
// a plain call of the slot — binds its arguments, client expressions with no
// bundle-time value, to the holes only when the client evaluates the call.
export interface AstExpansion {
  readonly kind: "AstExpansion";
  readonly params: readonly string[];
  readonly body: Ast;
}

// Where a hole surfaced in an expansion's result: a reference to the
// enclosing expansion's parameter of that name.
export interface AstHole {
  readonly kind: "AstHole";
  readonly name: string;
}

export interface AstNull {
  readonly kind: "AstNull";
}

export interface AstNumber {
  readonly kind: "AstNumber";
  readonly value: number;
}

export interface AstObject {
  readonly kind: "AstObject";
  readonly entries: Readonly<Record<string, Ast>>;
}

export interface AstString {
  readonly kind: "AstString";
  readonly value: string;
}
