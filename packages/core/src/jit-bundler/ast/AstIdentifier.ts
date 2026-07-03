import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";

export class AstIdentifier implements AstNode {
  private readonly name: string;

  constructor(_loc: SourceLocation, name: string) {
    this.name = name;
  }

  debugPrint(): string {
    return this.name;
  }
}
