import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class AstIdentifier implements AstNode {
  readonly loc: SourceLocation;
  readonly name: string;

  constructor(loc: SourceLocation, name: string) {
    this.loc = loc;
    this.name = name;
  }
}
