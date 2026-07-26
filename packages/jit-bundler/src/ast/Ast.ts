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
  | AstFragment
  | AstHole
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
}

// A script node that yields a value.
export type AstScriptExpression =
  | AstScriptArray
  | AstScriptArrow
  | AstScriptBinop
  | AstScriptBoolean
  | AstScriptCall
  | AstScriptIdentifier
  | AstScriptNew
  | AstScriptNull
  | AstScriptNumber
  | AstScriptObject
  | AstScriptPropertyAccess
  | AstScriptSplice
  | AstScriptString
  | AstScriptTernary;

// A script node a block runs in order: control flow, bindings, or an
// expression evaluated for its effect.
export type AstScriptStatement =
  | AstScriptExpression
  | AstScriptAssignment
  | AstScriptBlock
  | AstScriptIf
  | AstScriptReturn
  | AstScriptThrow
  | AstScriptTry
  | AstScriptVariableDeclaration;

// The body of a script or an arrow: a block, or an expression whose value is
// implicitly returned.
export type AstScriptBody = AstScriptExpression | AstScriptBlock;

// Any node parsed from a client script's source text — the statement union
// already spans the grammar. Every script node carries the source location it
// was parsed from.
export type AstScriptNode = AstScriptStatement;

export interface AstScript {
  readonly kind: "AstScript";
  readonly loc: SourceLocation;
  readonly fileHash: string;
  readonly splices: Readonly<Record<string, Ast>>;
  readonly captures: readonly string[];
  readonly declarations: readonly string[];
  readonly expression: AstScriptBody;
}

export interface AstScriptArray {
  readonly kind: "AstScriptArray";
  readonly loc: SourceLocation;
  readonly elements: readonly AstScriptExpression[];
}

export interface AstScriptArrow {
  readonly kind: "AstScriptArrow";
  readonly loc: SourceLocation;
  readonly params: readonly AstScriptIdentifier[];
  readonly body: AstScriptBody;
}

export interface AstScriptAssignment {
  readonly kind: "AstScriptAssignment";
  readonly loc: SourceLocation;
  readonly name: AstScriptIdentifier;
  readonly expression: AstScriptExpression;
}

export interface AstScriptBinop {
  readonly kind: "AstScriptBinop";
  readonly loc: SourceLocation;
  readonly lhs: AstScriptExpression;
  readonly operator: BinaryOperator;
  readonly rhs: AstScriptExpression;
}

export interface AstScriptTernary {
  readonly kind: "AstScriptTernary";
  readonly loc: SourceLocation;
  readonly condition: AstScriptExpression;
  readonly consequent: AstScriptExpression;
  readonly alternate: AstScriptExpression;
}

export interface AstScriptBlock {
  readonly kind: "AstScriptBlock";
  readonly loc: SourceLocation;
  readonly statements: readonly AstScriptStatement[];
}

export interface AstScriptBoolean {
  readonly kind: "AstScriptBoolean";
  readonly loc: SourceLocation;
  readonly value: boolean;
}

export interface AstScriptCall {
  readonly kind: "AstScriptCall";
  readonly loc: SourceLocation;
  readonly callee: AstScriptExpression;
  readonly args: readonly AstScriptExpression[];
  readonly optional: boolean;
}

export interface AstScriptIdentifier {
  readonly kind: "AstScriptIdentifier";
  readonly loc: SourceLocation;
  readonly name: string;
  readonly bindingKey: string;
}

export interface AstScriptIf {
  readonly kind: "AstScriptIf";
  readonly loc: SourceLocation;
  readonly condition: AstScriptExpression;
  readonly consequent: AstScriptStatement;
  readonly alternate: AstScriptStatement | null;
}

// e.g. new ${Point}(1, 2) — a construction, mirrored 1:1 from the source.
// The class only exists on the host: its splice lowers to its expansion — a
// function with one hole per constructor parameter (see `lowerSpliceable`) —
// so the bundler expands the construction into a plain call of its callee
// (see `lowerScriptBody`).
export interface AstScriptNew {
  readonly kind: "AstScriptNew";
  readonly loc: SourceLocation;
  readonly callee: AstScriptExpression;
  readonly args: readonly AstScriptExpression[];
}

export interface AstScriptNull {
  readonly kind: "AstScriptNull";
  readonly loc: SourceLocation;
}

export interface AstScriptNumber {
  readonly kind: "AstScriptNumber";
  readonly loc: SourceLocation;
  readonly value: number;
}

export interface AstScriptObject {
  readonly kind: "AstScriptObject";
  readonly loc: SourceLocation;
  readonly entries: Readonly<Record<string, AstScriptExpression>>;
}

export interface AstScriptPropertyAccess {
  readonly kind: "AstScriptPropertyAccess";
  readonly loc: SourceLocation;
  readonly expression: AstScriptExpression;
  readonly name: string;
  readonly optional: boolean;
}

export interface AstScriptReturn {
  readonly kind: "AstScriptReturn";
  readonly loc: SourceLocation;
  readonly expression: AstScriptExpression;
}

export interface AstScriptSplice {
  readonly kind: "AstScriptSplice";
  readonly loc: SourceLocation;
  readonly key: string;
}

export interface AstScriptString {
  readonly kind: "AstScriptString";
  readonly loc: SourceLocation;
  readonly value: string;
}

export interface AstScriptThrow {
  readonly kind: "AstScriptThrow";
  readonly loc: SourceLocation;
  readonly expression: AstScriptExpression;
}

export interface AstScriptTry {
  readonly kind: "AstScriptTry";
  readonly loc: SourceLocation;
  readonly block: AstScriptBlock;
  readonly param: AstScriptIdentifier | null;
  readonly handler: AstScriptBlock;
}

export interface AstScriptVariableDeclaration {
  readonly kind: "AstScriptVariableDeclaration";
  readonly loc: SourceLocation;
  readonly keyword: "let" | "const";
  readonly name: AstScriptIdentifier;
  readonly expression: AstScriptExpression;
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

export interface AstFragment {
  readonly kind: "AstFragment";
  readonly key: Ast;
  readonly child: AstFragment | AstElement;
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
