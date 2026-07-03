import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";

export class AstBlock implements AstNode {
  readonly loc: SourceLocation;
  readonly statements: readonly AstNode[];

  constructor(loc: SourceLocation, statements: AstNode[]) {
    this.loc = loc;
    this.statements = statements;
  }
}
