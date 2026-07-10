import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class AstScriptCall {
  readonly loc: SourceLocation;
  readonly callee: AstNode;
  readonly args: readonly AstNode[];

  constructor(loc: SourceLocation, callee: AstNode, args: AstNode[]) {
    this.loc = loc;
    this.callee = callee;
    this.args = args;
  }
}
