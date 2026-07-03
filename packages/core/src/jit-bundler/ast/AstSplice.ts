import type { SourceLocation, Spliceable } from "../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class AstSplice implements AstNode {
  readonly loc: SourceLocation;
  readonly expression: Spliceable;

  constructor(loc: SourceLocation, _key: string, expression: Spliceable) {
    this.loc = loc;
    this.expression = expression;
  }
}
