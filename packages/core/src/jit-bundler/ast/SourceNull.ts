import type { SourceLocation } from "../../cs-runtime/index.js";
import type { SourceNode } from "./AstNode.js";

export class SourceNull implements SourceNode {
  readonly loc: SourceLocation;

  constructor(loc: SourceLocation) {
    this.loc = loc;
  }
}
