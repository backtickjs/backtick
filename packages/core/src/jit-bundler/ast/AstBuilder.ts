import type {
  BinaryOperator,
  Client,
  ClientUnknown,
  SourceLocation,
  Spliceable,
  Visitor,
} from "../../cs-runtime/index.js";
import type {
  AstScriptArray,
  AstScriptArrow,
  AstScriptAssignment,
  AstScriptBinop,
  AstScriptBlock,
  AstScriptBody,
  AstScriptBoolean,
  AstScriptCall,
  AstScriptExpression,
  AstScriptIdentifier,
  AstScriptIf,
  AstScriptNode,
  AstScriptNull,
  AstScriptNumber,
  AstScriptObject,
  AstScriptPropertyAccess,
  AstScriptReturn,
  AstScriptSplice,
  AstScriptStatement,
  AstScriptString,
  AstScriptThrow,
  AstScriptTry,
  AstScriptVariableDeclaration,
} from "./Ast.js";
import { createHole } from "./holes.js";

// A macro's raw expansion: the spliceable a bundle-time evaluation returned
// when applied to one hole per parameter. `buildClientScript` serializes the
// value into the `AstExpansion` filling the synthetic splice slot the
// expanded node calls.
export interface MacroExpansion {
  readonly params: readonly string[];
  readonly value: Spliceable;
}

export class AstBuilder implements Visitor<AstScriptNode> {
  // Expansions collected by `new`, in visit order; the expansion at position
  // `i` occupies splice slot `splices.length + i`. Expanding evaluates live
  // host values (which differ per script instance even at one source
  // location), so a builder must visit on behalf of a single client.
  readonly expansions: MacroExpansion[] = [];
  // Splice slots consumed by an expansion (a `new` callee): the raw value —
  // a class, which isn't spliceable — stays on the host, so the slot
  // serializes as null.
  readonly consumedSplices = new Set<number>();
  private readonly splices: readonly Spliceable[];

  constructor(splices: readonly Spliceable[]) {
    this.splices = splices;
  }

  splice(loc: SourceLocation, index: number): AstScriptSplice {
    return { kind: "AstScriptSplice", loc, index };
  }

  null(loc: SourceLocation): AstScriptNull {
    return { kind: "AstScriptNull", loc };
  }

  number(loc: SourceLocation, value: number): AstScriptNumber {
    return { kind: "AstScriptNumber", loc, value };
  }

  boolean(loc: SourceLocation, value: boolean): AstScriptBoolean {
    return { kind: "AstScriptBoolean", loc, value };
  }

  string(loc: SourceLocation, value: string): AstScriptString {
    return { kind: "AstScriptString", loc, value };
  }

  identifier(
    loc: SourceLocation,
    name: string,
    bindingKey: string,
  ): AstScriptIdentifier {
    return { kind: "AstScriptIdentifier", loc, name, bindingKey };
  }

  block(loc: SourceLocation, statements: AstScriptStatement[]): AstScriptBlock {
    return { kind: "AstScriptBlock", loc, statements };
  }

  assignment(
    loc: SourceLocation,
    name: AstScriptIdentifier,
    expression: AstScriptExpression,
  ): AstScriptAssignment {
    return { kind: "AstScriptAssignment", loc, name, expression };
  }

  variableDeclaration(
    loc: SourceLocation,
    keyword: "let" | "const",
    name: AstScriptIdentifier,
    expression: AstScriptExpression,
  ): AstScriptVariableDeclaration {
    return {
      kind: "AstScriptVariableDeclaration",
      loc,
      keyword,
      name,
      expression,
    };
  }

  if(
    loc: SourceLocation,
    condition: AstScriptExpression,
    consequent: AstScriptStatement,
    alternate: AstScriptStatement | null,
  ): AstScriptIf {
    return { kind: "AstScriptIf", loc, condition, consequent, alternate };
  }

  return(
    loc: SourceLocation,
    expression: AstScriptExpression,
  ): AstScriptReturn {
    return { kind: "AstScriptReturn", loc, expression };
  }

  throw(loc: SourceLocation, expression: AstScriptExpression): AstScriptThrow {
    return { kind: "AstScriptThrow", loc, expression };
  }

  try(
    loc: SourceLocation,
    block: AstScriptBlock,
    param: AstScriptIdentifier | null,
    handler: AstScriptBlock,
  ): AstScriptTry {
    return { kind: "AstScriptTry", loc, block, param, handler };
  }

  propertyAccess(
    loc: SourceLocation,
    expression: AstScriptExpression,
    name: string,
  ): AstScriptPropertyAccess {
    return { kind: "AstScriptPropertyAccess", loc, expression, name };
  }

  binop(
    loc: SourceLocation,
    lhs: AstScriptExpression,
    operator: BinaryOperator,
    rhs: AstScriptExpression,
  ): AstScriptBinop {
    return { kind: "AstScriptBinop", loc, lhs, operator, rhs };
  }

  array(loc: SourceLocation, elements: AstScriptExpression[]): AstScriptArray {
    return { kind: "AstScriptArray", loc, elements };
  }

  object(
    loc: SourceLocation,
    entries: { [key: string]: AstScriptExpression },
  ): AstScriptObject {
    return { kind: "AstScriptObject", loc, entries };
  }

  call(
    loc: SourceLocation,
    callee: AstScriptExpression,
    args: AstScriptExpression[],
  ): AstScriptCall {
    return { kind: "AstScriptCall", loc, callee, args };
  }

  arrow(
    loc: SourceLocation,
    params: AstScriptIdentifier[],
    body: AstScriptBody,
  ): AstScriptArrow {
    return {
      kind: "AstScriptArrow",
      loc,
      params: params,
      body,
    };
  }

  // The construction is a macro, expanded here: the constructor — the
  // callee's splice value, live on the host — runs once with one opaque hole
  // per argument, and the instance it returns fills a synthetic splice slot
  // as a function of those holes (see `AstExpansion`). The node itself reads
  // as an ordinary call of that slot:
  // new ${Point}(1, 2) -> (($0, $1) => new Point($0, $1))(1, 2)
  new(
    loc: SourceLocation,
    callee: AstScriptSplice,
    args: AstScriptExpression[],
  ): AstScriptCall {
    const splicedClass = this.splices[callee.index] as unknown as new (
      ...args: Client<ClientUnknown>[]
    ) => Spliceable;
    const params = args.map((_, position) => `$${position}`);
    const index = this.splices.length + this.expansions.length;
    this.expansions.push({
      params,
      value: new splicedClass(...params.map(createHole)),
    });
    this.consumedSplices.add(callee.index);
    return {
      kind: "AstScriptCall",
      loc,
      callee: { kind: "AstScriptSplice", loc: callee.loc, index },
      args,
    };
  }
}
