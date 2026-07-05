import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../ast/AstNode.js";

// One entry in the payload's function table: a single client script hoisted out
// of the tree. `body` is the script's source expression, in which splices
// appear as holes filled positionally by the `args` of each `IrFunctionRef`
// that targets this entry.
export class IrFunction {
  readonly loc: SourceLocation;
  readonly freeVars: string[];
  readonly body: AstNode;

  constructor(loc: SourceLocation, freeVars: string[], body: AstNode) {
    this.loc = loc;
    this.freeVars = freeVars;
    this.body = body;
  }
}
