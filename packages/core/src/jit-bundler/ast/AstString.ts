import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class AstString implements AstNode {
  readonly loc: SourceLocation;
  readonly value: string;

  constructor(loc: SourceLocation, value: string) {
    this.loc = loc;
    this.value = value;
  }
}
