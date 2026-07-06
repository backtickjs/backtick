import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "../../ast/nodes/AstNode.js";

export class IrFunction {
  readonly loc: SourceLocation;
  readonly arity: number;
  readonly captures: string[];
  readonly declarations: string[];
  readonly body: AstNode;

  constructor(
    loc: SourceLocation,
    arity: number,
    captures: string[],
    declarations: string[],
    body: AstNode,
  ) {
    this.loc = loc;
    this.arity = arity;
    this.captures = captures;
    this.declarations = declarations;
    this.body = body;
  }
}
