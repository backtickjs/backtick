import type { AstRoot } from "./AstNode.js";

export class AstArray {
  readonly elements: readonly AstRoot[];

  constructor(elements: AstRoot[]) {
    this.elements = elements;
  }
}
