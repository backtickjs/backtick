import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "../../ast/nodes/AstNode.js";

// One entry in the payload's function table: a single client script hoisted out
// of the tree, modeled as a function `(args, captures) => body`.
//
//   - `arity` is how many positional `args` the entry takes — one per splice
//     hole in `body`. Every `IrCall` that targets this entry supplies exactly
//     this many arguments.
//   - `captures` are the free variables the body closes over; they are resolved
//     by name from the scope in which the bundle runs (they are not passed by
//     callers).
//   - `body` is the script's source expression, in which splices appear as holes
//     bound positionally to `args`.
export class IrFunction {
  readonly loc: SourceLocation;
  readonly arity: number;
  readonly captures: string[];
  readonly body: AstNode;

  constructor(
    loc: SourceLocation,
    arity: number,
    captures: string[],
    body: AstNode,
  ) {
    this.loc = loc;
    this.arity = arity;
    this.captures = captures;
    this.body = body;
  }
}
