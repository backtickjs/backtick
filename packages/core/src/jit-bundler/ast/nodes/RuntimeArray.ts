import type { AstRoot } from "./AstNode.js";

export class RuntimeArray {
  readonly elements: readonly AstRoot[];

  constructor(elements: AstRoot[]) {
    this.elements = elements;
  }
}
