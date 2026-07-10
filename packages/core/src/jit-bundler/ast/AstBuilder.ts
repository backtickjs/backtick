import type { SourceLocation, Visitor } from "../../cs-runtime/index.js";
import type {
  AstScriptArray,
  AstScriptArrow,
  AstScriptAssignment,
  AstScriptBinop,
  AstScriptBlock,
  AstScriptBoolean,
  AstScriptCall,
  AstScriptIdentifier,
  AstScriptIf,
  AstScriptNode,
  AstScriptNull,
  AstScriptNumber,
  AstScriptObject,
  AstScriptPropertyAccess,
  AstScriptReturn,
  AstScriptSplice,
  AstScriptString,
  AstScriptVariableDeclaration,
} from "./Ast.js";

export class AstBuilder implements Visitor<AstScriptNode> {
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

  block(loc: SourceLocation, statements: AstScriptNode[]): AstScriptBlock {
    return { kind: "AstScriptBlock", loc, statements };
  }

  assignment(
    loc: SourceLocation,
    name: AstScriptIdentifier,
    expression: AstScriptNode,
  ): AstScriptAssignment {
    return { kind: "AstScriptAssignment", loc, name, expression };
  }

  variableDeclaration(
    loc: SourceLocation,
    keyword: "let" | "const",
    name: AstScriptIdentifier,
    expression: AstScriptNode,
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
    condition: AstScriptNode,
    consequent: AstScriptNode,
    alternate: AstScriptNode | null,
  ): AstScriptIf {
    return { kind: "AstScriptIf", loc, condition, consequent, alternate };
  }

  return(loc: SourceLocation, expression: AstScriptNode): AstScriptReturn {
    return { kind: "AstScriptReturn", loc, expression };
  }

  propertyAccess(
    loc: SourceLocation,
    expression: AstScriptNode,
    name: string,
  ): AstScriptPropertyAccess {
    return { kind: "AstScriptPropertyAccess", loc, expression, name };
  }

  binop(
    loc: SourceLocation,
    lhs: AstScriptNode,
    operator: string,
    rhs: AstScriptNode,
  ): AstScriptBinop {
    return { kind: "AstScriptBinop", loc, lhs, operator, rhs };
  }

  array(loc: SourceLocation, elements: AstScriptNode[]): AstScriptArray {
    return { kind: "AstScriptArray", loc, elements };
  }

  object(
    loc: SourceLocation,
    entries: { [key: string]: AstScriptNode },
  ): AstScriptObject {
    return { kind: "AstScriptObject", loc, entries };
  }

  call(
    loc: SourceLocation,
    callee: AstScriptNode,
    args: AstScriptNode[],
  ): AstScriptCall {
    return { kind: "AstScriptCall", loc, callee, args };
  }

  arrow(
    loc: SourceLocation,
    params: AstScriptIdentifier[],
    body: AstScriptNode,
  ): AstScriptArrow {
    return {
      kind: "AstScriptArrow",
      loc,
      params: params,
      body,
    };
  }
}
