import type { SourceLocation, Visitor } from "../../cs-runtime/index.js";
import type {
  AstNode,
  AstScriptArray,
  AstScriptArrow,
  AstScriptAssignment,
  AstScriptBinop,
  AstScriptBlock,
  AstScriptBoolean,
  AstScriptCall,
  AstScriptIdentifier,
  AstScriptIf,
  AstScriptNull,
  AstScriptNumber,
  AstScriptObject,
  AstScriptPropertyAccess,
  AstScriptReturn,
  AstScriptSplice,
  AstScriptString,
  AstScriptVariableDeclaration,
} from "./AstNode.js";

export class AstBuilder implements Visitor<AstNode> {
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

  block(loc: SourceLocation, statements: AstNode[]): AstScriptBlock {
    return { kind: "AstScriptBlock", loc, statements };
  }

  assignment(
    loc: SourceLocation,
    name: AstNode,
    expression: AstNode,
  ): AstScriptAssignment {
    return { kind: "AstScriptAssignment", loc, name, expression };
  }

  variableDeclaration(
    loc: SourceLocation,
    keyword: "let" | "const",
    name: AstNode,
    expression: AstNode,
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
    condition: AstNode,
    consequent: AstNode,
    alternate: AstNode | null,
  ): AstScriptIf {
    return { kind: "AstScriptIf", loc, condition, consequent, alternate };
  }

  return(loc: SourceLocation, expression: AstNode): AstScriptReturn {
    return { kind: "AstScriptReturn", loc, expression };
  }

  propertyAccess(
    loc: SourceLocation,
    expression: AstNode,
    name: string,
  ): AstScriptPropertyAccess {
    return { kind: "AstScriptPropertyAccess", loc, expression, name };
  }

  binop(
    loc: SourceLocation,
    lhs: AstNode,
    operator: string,
    rhs: AstNode,
  ): AstScriptBinop {
    return { kind: "AstScriptBinop", loc, lhs, operator, rhs };
  }

  array(loc: SourceLocation, elements: AstNode[]): AstScriptArray {
    return { kind: "AstScriptArray", loc, elements };
  }

  object(
    loc: SourceLocation,
    entries: { [key: string]: AstNode },
  ): AstScriptObject {
    return { kind: "AstScriptObject", loc, entries };
  }

  call(loc: SourceLocation, callee: AstNode, args: AstNode[]): AstScriptCall {
    return { kind: "AstScriptCall", loc, callee, args };
  }

  arrow(loc: SourceLocation, params: AstNode[], body: AstNode): AstScriptArrow {
    return {
      kind: "AstScriptArrow",
      loc,
      params: params as AstScriptIdentifier[],
      body,
    };
  }
}
