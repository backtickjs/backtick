import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";

export class AstNull implements AstNode {
  readonly loc: SourceLocation;

  constructor(loc: SourceLocation) {
    this.loc = loc;
  }
}
