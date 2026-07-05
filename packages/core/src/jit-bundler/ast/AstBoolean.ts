import type { SourceLocation } from "../../cs-runtime/index.js";
import type { SourceNode } from "./AstNode.js";

export class AstBoolean implements SourceNode {
  readonly loc: SourceLocation;
  readonly value: boolean;

  constructor(loc: SourceLocation, value: boolean) {
    this.loc = loc;
    this.value = value;
  }
}
