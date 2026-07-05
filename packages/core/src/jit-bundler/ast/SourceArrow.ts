import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class SourceArrow {
  readonly loc: SourceLocation;
  readonly params: readonly string[];
  readonly body: AstNode;

  constructor(loc: SourceLocation, params: string[], body: AstNode) {
    this.loc = loc;
    this.params = params;
    this.body = body;
  }
}
