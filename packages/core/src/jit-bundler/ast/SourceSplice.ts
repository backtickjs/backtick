import type { SourceLocation } from "../../cs-runtime/index.js";
import type { SourceNode } from "./AstNode.js";

export class SourceSplice implements SourceNode {
  readonly loc: SourceLocation;
  readonly index: number;

  constructor(loc: SourceLocation, index: number) {
    this.loc = loc;
    this.index = index;
  }
}
