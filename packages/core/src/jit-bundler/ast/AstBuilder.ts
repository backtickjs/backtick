import type { SourceLocation, Visitor } from "../../cs-runtime/index.js";
import { AstArray } from "./AstArray.js";
import { AstArrow } from "./AstArrow.js";
import { AstAssignment } from "./AstAssignment.js";
import { AstBinop } from "./AstBinop.js";
import { AstBlock } from "./AstBlock.js";
import { AstBoolean } from "./AstBoolean.js";
import { AstCall } from "./AstCall.js";
import { AstIdentifier } from "./AstIdentifier.js";
import { AstIf } from "./AstIf.js";
import type { AstNode } from "./AstNode.js";
import { AstNull } from "./AstNull.js";
import { AstNumber } from "./AstNumber.js";
import { AstObject } from "./AstObject.js";
import { AstPropertyAccess } from "./AstPropertyAccess.js";
import { AstReturn } from "./AstReturn.js";
import { AstSplice } from "./AstSplice.js";
import { AstString } from "./AstString.js";

export class AstBuilder implements Visitor<AstNode> {
  splice(loc: SourceLocation, index: number): AstSplice {
    return new AstSplice(loc, index);
  }

  null(loc: SourceLocation): AstNull {
    return new AstNull(loc);
  }

  number(loc: SourceLocation, value: number): AstNumber {
    return new AstNumber(loc, value);
  }

  boolean(loc: SourceLocation, value: boolean): AstBoolean {
    return new AstBoolean(loc, value);
  }

  string(loc: SourceLocation, value: string): AstString {
    return new AstString(loc, value);
  }

  identifier(loc: SourceLocation, name: string): AstIdentifier {
    return new AstIdentifier(loc, name);
  }

  block(loc: SourceLocation, statements: AstNode[]): AstBlock {
    return new AstBlock(loc, statements);
  }

  assignment(
    loc: SourceLocation,
    name: AstNode,
    expression: AstNode,
  ): AstAssignment {
    return new AstAssignment(loc, name, expression);
  }

  if(
    loc: SourceLocation,
    condition: AstNode,
    consequent: AstNode,
    alternate: AstNode | null,
  ): AstIf {
    return new AstIf(loc, condition, consequent, alternate);
  }

  return(loc: SourceLocation, expression: AstNode): AstReturn {
    return new AstReturn(loc, expression);
  }

  propertyAccess(
    loc: SourceLocation,
    expression: AstNode,
    name: string,
  ): AstPropertyAccess {
    return new AstPropertyAccess(loc, expression, name);
  }

  binop(
    loc: SourceLocation,
    lhs: AstNode,
    operator: string,
    rhs: AstNode,
  ): AstBinop {
    return new AstBinop(loc, lhs, operator, rhs);
  }

  array(loc: SourceLocation, elements: AstNode[]): AstArray {
    return new AstArray(loc, elements);
  }

  object(loc: SourceLocation, entries: { [key: string]: AstNode }): AstObject {
    return new AstObject(loc, entries);
  }

  call(loc: SourceLocation, callee: AstNode, args: AstNode[]): AstCall {
    return new AstCall(loc, callee, args);
  }

  arrow(loc: SourceLocation, params: string[], body: AstNode): AstArrow {
    return new AstArrow(loc, params, body);
  }
}
