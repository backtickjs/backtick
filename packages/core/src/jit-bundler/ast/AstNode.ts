import type { SourceLocation } from "../../cs-runtime/index.js";

// A node parsed from a client script's source text. Every script node carries
// the source location it was parsed from.
export type AstScriptNode =
  | AstScript
  | AstScriptArray
  | AstScriptArrow
  | AstScriptAssignment
  | AstScriptBinop
  | AstScriptBlock
  | AstScriptBoolean
  | AstScriptCall
  | AstScriptIdentifier
  | AstScriptIf
  | AstScriptNull
  | AstScriptNumber
  | AstScriptObject
  | AstScriptPropertyAccess
  | AstScriptReturn
  | AstScriptSplice
  | AstScriptString
  | AstScriptVariableDeclaration;

// A node built from a value spliced into a client script. Splice values are
// resolved at runtime and have no source text, so a value node never has a
// location.
export type AstValueNode =
  | AstArray
  | AstBoolean
  | AstElement
  | AstNull
  | AstNumber
  | AstObject
  | AstString;

export type AstNode = AstScriptNode | AstValueNode;

export type AstRoot = AstScript | AstValueNode;

export interface AstScript {
  readonly kind: "AstScript";
  readonly loc: SourceLocation;
  readonly fileHash: string;
  readonly splices: readonly AstRoot[];
  readonly captures: readonly string[];
  readonly declarations: readonly string[];
  readonly expression: AstNode;
}

export interface AstScriptArray {
  readonly kind: "AstScriptArray";
  readonly loc: SourceLocation;
  readonly elements: readonly AstNode[];
}

export interface AstScriptArrow {
  readonly kind: "AstScriptArrow";
  readonly loc: SourceLocation;
  readonly params: readonly AstScriptIdentifier[];
  readonly body: AstNode;
}

export interface AstScriptAssignment {
  readonly kind: "AstScriptAssignment";
  readonly loc: SourceLocation;
  readonly name: AstNode;
  readonly expression: AstNode;
}

export interface AstScriptBinop {
  readonly kind: "AstScriptBinop";
  readonly loc: SourceLocation;
  readonly lhs: AstNode;
  readonly operator: string;
  readonly rhs: AstNode;
}

export interface AstScriptBlock {
  readonly kind: "AstScriptBlock";
  readonly loc: SourceLocation;
  readonly statements: readonly AstNode[];
}

export interface AstScriptBoolean {
  readonly kind: "AstScriptBoolean";
  readonly loc: SourceLocation;
  readonly value: boolean;
}

export interface AstScriptCall {
  readonly kind: "AstScriptCall";
  readonly loc: SourceLocation;
  readonly callee: AstNode;
  readonly args: readonly AstNode[];
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
  readonly condition: AstNode;
  readonly consequent: AstNode;
  readonly alternate: AstNode | null;
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
  readonly entries: Readonly<Record<string, AstNode>>;
}

export interface AstScriptPropertyAccess {
  readonly kind: "AstScriptPropertyAccess";
  readonly loc: SourceLocation;
  readonly expression: AstNode;
  readonly name: string;
}

export interface AstScriptReturn {
  readonly kind: "AstScriptReturn";
  readonly loc: SourceLocation;
  readonly expression: AstNode;
}

export interface AstScriptSplice {
  readonly kind: "AstScriptSplice";
  readonly loc: SourceLocation;
  readonly index: number;
}

export interface AstScriptString {
  readonly kind: "AstScriptString";
  readonly loc: SourceLocation;
  readonly value: string;
}

export interface AstScriptVariableDeclaration {
  readonly kind: "AstScriptVariableDeclaration";
  readonly loc: SourceLocation;
  readonly keyword: "let" | "const";
  readonly name: AstNode;
  readonly expression: AstNode;
}

export interface AstArray {
  readonly kind: "AstArray";
  readonly elements: readonly AstRoot[];
}

export interface AstBoolean {
  readonly kind: "AstBoolean";
  readonly value: boolean;
}

export interface AstElement {
  readonly kind: "AstElement";
  readonly type: string;
  readonly key: string | number | null;
  readonly props: Readonly<Record<string, AstRoot>>;
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
  readonly entries: Readonly<Record<string, AstRoot>>;
}

export interface AstString {
  readonly kind: "AstString";
  readonly value: string;
}
