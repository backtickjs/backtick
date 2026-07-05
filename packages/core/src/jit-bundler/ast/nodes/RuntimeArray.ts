import type { AstNode } from "./AstNode.js";

export class RuntimeArray {
  readonly elements: readonly AstNode[];

  constructor(elements: AstNode[]) {
    this.elements = elements;
  }
}
