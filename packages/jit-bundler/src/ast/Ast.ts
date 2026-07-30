import type { AstScriptBody, SourceLocation } from "@backtickjs/cs-runtime";

// The value grammar: what a splice becomes. A script's own syntax is the other
// half of this AST and lives in `cs-runtime`, since that is where the compiler's
// output has to be able to name it — the compiler emits those nodes directly.

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

export interface AstScript {
  readonly kind: "AstScript";
  readonly loc: SourceLocation;
  readonly fileHash: string;
  readonly splices: Readonly<Record<string, Ast>>;
  readonly captures: readonly string[];
  readonly spliceParams: Readonly<Record<string, readonly string[]>>;
  readonly expression: AstScriptBody;
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
