import type {
  BinaryOperator,
  SourceLocation,
  Visitor,
} from "@backtickjs/cs-runtime";
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
  AstScriptNew,
  AstScriptNode,
  AstScriptNull,
  AstScriptNumber,
  AstScriptObject,
  AstScriptPropertyAccess,
  AstScriptReturn,
  AstScriptSplice,
  AstScriptStatement,
  AstScriptString,
  AstScriptTernary,
  AstScriptThrow,
  AstScriptTry,
  AstScriptVariableDeclaration,
  AstScriptWhile,
} from "./Ast.js";

// Mirrors a client script's source 1:1: each visitor method returns the node
// for the construct it was called with, so the built body is pure syntax —
// client-independent and cacheable by source location.
export class AstBuilder implements Visitor<AstScriptNode> {
  splice(loc: SourceLocation, key: string): AstScriptSplice {
    return { kind: "AstScriptSplice", loc, key };
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

  while(
    loc: SourceLocation,
    condition: AstScriptExpression,
    body: AstScriptStatement,
  ): AstScriptWhile {
    return { kind: "AstScriptWhile", loc, condition, body };
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
    optional = false,
  ): AstScriptPropertyAccess {
    return { kind: "AstScriptPropertyAccess", loc, expression, name, optional };
  }

  binop(
    loc: SourceLocation,
    lhs: AstScriptExpression,
    operator: BinaryOperator,
    rhs: AstScriptExpression,
  ): AstScriptBinop {
    return { kind: "AstScriptBinop", loc, lhs, operator, rhs };
  }

  ternary(
    loc: SourceLocation,
    condition: AstScriptExpression,
    consequent: AstScriptExpression,
    alternate: AstScriptExpression,
  ): AstScriptTernary {
    return { kind: "AstScriptTernary", loc, condition, consequent, alternate };
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
    optional = false,
  ): AstScriptCall {
    return { kind: "AstScriptCall", loc, callee, args, optional };
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

  new(
    loc: SourceLocation,
    callee: AstScriptExpression,
    args: AstScriptExpression[],
  ): AstScriptNew {
    return { kind: "AstScriptNew", loc, callee, args };
  }
}
