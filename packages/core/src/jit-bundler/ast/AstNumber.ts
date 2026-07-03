import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";

export class AstNumber implements AstNode {
  readonly loc: SourceLocation;
  readonly value: number;

  constructor(loc: SourceLocation, value: number) {
    this.loc = loc;
    this.value = value;
  }
}
