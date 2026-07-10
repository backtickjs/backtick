import type { AstRoot } from "./AstNode.js";

export class AstObject {
  readonly entries: Readonly<Record<string, AstRoot>>;

  constructor(entries: Record<string, AstRoot>) {
    this.entries = entries;
  }
}
