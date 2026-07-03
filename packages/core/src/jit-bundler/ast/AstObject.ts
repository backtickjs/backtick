import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";

export class AstObject implements AstNode {
  private readonly entries: Readonly<Record<string, AstNode>>;

  constructor(_loc: SourceLocation, entries: Record<string, AstNode>) {
    this.entries = entries;
  }

  debugPrint(): string {
    const entries = Object.entries(this.entries);
    if (entries.length === 0) {
      return "{}";
    }
    const body = entries
      .map(([key, value]) => `${key}: ${value.debugPrint()}`)
      .join(", ");
    return `{ ${body} }`;
  }
}
