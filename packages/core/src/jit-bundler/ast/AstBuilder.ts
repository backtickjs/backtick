import type { SourceLocation, Visitor } from "../../cs-runtime/index.js";
import type { AstNode } from "./nodes/AstNode.js";
import { AstScriptArray } from "./nodes/AstScriptArray.js";
import { AstScriptArrow } from "./nodes/AstScriptArrow.js";
import { AstScriptAssignment } from "./nodes/AstScriptAssignment.js";
import { AstScriptBinop } from "./nodes/AstScriptBinop.js";
import { AstScriptBlock } from "./nodes/AstScriptBlock.js";
import { AstScriptBoolean } from "./nodes/AstScriptBoolean.js";
import { AstScriptCall } from "./nodes/AstScriptCall.js";
import { AstScriptIdentifier } from "./nodes/AstScriptIdentifier.js";
import { AstScriptIf } from "./nodes/AstScriptIf.js";
import { AstScriptNull } from "./nodes/AstScriptNull.js";
import { AstScriptNumber } from "./nodes/AstScriptNumber.js";
import { AstScriptObject } from "./nodes/AstScriptObject.js";
import { AstScriptPropertyAccess } from "./nodes/AstScriptPropertyAccess.js";
import { AstScriptReturn } from "./nodes/AstScriptReturn.js";
import { AstScriptSplice } from "./nodes/AstScriptSplice.js";
import { AstScriptString } from "./nodes/AstScriptString.js";
import { AstScriptVariableDeclaration } from "./nodes/AstScriptVariableDeclaration.js";

export class AstBuilder implements Visitor<AstNode> {
  splice(loc: SourceLocation, index: number): AstScriptSplice {
    return new AstScriptSplice(loc, index);
  }

  null(loc: SourceLocation): AstScriptNull {
    return new AstScriptNull(loc);
  }

  number(loc: SourceLocation, value: number): AstScriptNumber {
    return new AstScriptNumber(loc, value);
  }

  boolean(loc: SourceLocation, value: boolean): AstScriptBoolean {
    return new AstScriptBoolean(loc, value);
  }

  string(loc: SourceLocation, value: string): AstScriptString {
    return new AstScriptString(loc, value);
  }

  identifier(
    loc: SourceLocation,
    name: string,
    bindingKey: string,
  ): AstScriptIdentifier {
    return new AstScriptIdentifier(loc, name, bindingKey);
  }

  block(loc: SourceLocation, statements: AstNode[]): AstScriptBlock {
    return new AstScriptBlock(loc, statements);
  }

  assignment(
    loc: SourceLocation,
    name: AstNode,
    expression: AstNode,
  ): AstScriptAssignment {
    return new AstScriptAssignment(loc, name, expression);
  }

  variableDeclaration(
    loc: SourceLocation,
    keyword: "let" | "const",
    name: AstNode,
    expression: AstNode,
  ): AstScriptVariableDeclaration {
    return new AstScriptVariableDeclaration(loc, keyword, name, expression);
  }

  if(
    loc: SourceLocation,
    condition: AstNode,
    consequent: AstNode,
    alternate: AstNode | null,
  ): AstScriptIf {
    return new AstScriptIf(loc, condition, consequent, alternate);
  }

  return(loc: SourceLocation, expression: AstNode): AstScriptReturn {
    return new AstScriptReturn(loc, expression);
  }

  propertyAccess(
    loc: SourceLocation,
    expression: AstNode,
    name: string,
  ): AstScriptPropertyAccess {
    return new AstScriptPropertyAccess(loc, expression, name);
  }

  binop(
    loc: SourceLocation,
    lhs: AstNode,
    operator: string,
    rhs: AstNode,
  ): AstScriptBinop {
    return new AstScriptBinop(loc, lhs, operator, rhs);
  }

  array(loc: SourceLocation, elements: AstNode[]): AstScriptArray {
    return new AstScriptArray(loc, elements);
  }

  object(
    loc: SourceLocation,
    entries: { [key: string]: AstNode },
  ): AstScriptObject {
    return new AstScriptObject(loc, entries);
  }

  call(loc: SourceLocation, callee: AstNode, args: AstNode[]): AstScriptCall {
    return new AstScriptCall(loc, callee, args);
  }

  arrow(loc: SourceLocation, params: AstNode[], body: AstNode): AstScriptArrow {
    return new AstScriptArrow(loc, params as AstScriptIdentifier[], body);
  }
}
