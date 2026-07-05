import type { SourceLocation } from "../../cs-runtime/index.js";
import type { SourceNode } from "./AstNode.js";

export class AstIdentifier implements SourceNode {
  readonly loc: SourceLocation;
  readonly name: string;

  constructor(loc: SourceLocation, name: string) {
    this.loc = loc;
    this.name = name;
  }
}
