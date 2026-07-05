import type { AstNode } from "./AstNode.js";

export class RuntimeObject {
  readonly entries: Readonly<Record<string, AstNode>>;

  constructor(entries: Record<string, AstNode>) {
    this.entries = entries;
  }
}
