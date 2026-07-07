import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "../../ast/nodes/AstNode.js";

export class BundledScript {
  readonly loc: SourceLocation;
  readonly captures: string[];
  readonly declarations: string[];
  readonly body: AstNode;

  constructor(
    loc: SourceLocation,
    captures: string[],
    declarations: string[],
    body: AstNode,
  ) {
    this.loc = loc;
    this.captures = captures;
    this.declarations = declarations;
    this.body = body;
  }
}
