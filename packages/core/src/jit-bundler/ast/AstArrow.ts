import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode, SourceNode } from "./AstNode.js";

export class AstArrow implements SourceNode {
  readonly loc: SourceLocation;
  readonly params: readonly string[];
  readonly body: AstNode;

  constructor(loc: SourceLocation, params: string[], body: AstNode) {
    this.loc = loc;
    this.params = params;
    this.body = body;
  }
}
