import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class AstSplice implements AstNode {
  readonly loc: SourceLocation;
  readonly index: number;

  constructor(loc: SourceLocation, index: number) {
    this.loc = loc;
    this.index = index;
  }
}
