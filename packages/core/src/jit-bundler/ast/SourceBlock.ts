import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode, SourceNode } from "./AstNode.js";

export class SourceBlock implements SourceNode {
  readonly loc: SourceLocation;
  readonly statements: readonly AstNode[];

  constructor(loc: SourceLocation, statements: AstNode[]) {
    this.loc = loc;
    this.statements = statements;
  }
}
