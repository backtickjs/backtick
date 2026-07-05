import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class SourceArray {
  readonly loc: SourceLocation;
  readonly elements: readonly AstNode[];

  constructor(loc: SourceLocation, elements: AstNode[]) {
    this.loc = loc;
    this.elements = elements;
  }
}
