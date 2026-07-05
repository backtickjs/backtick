import type { SourceLocation, Visitor } from "../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";
import { SourceArray } from "./SourceArray.js";
import { SourceArrow } from "./SourceArrow.js";
import { SourceAssignment } from "./SourceAssignment.js";
import { SourceBinop } from "./SourceBinop.js";
import { SourceBlock } from "./SourceBlock.js";
import { SourceBoolean } from "./SourceBoolean.js";
import { SourceCall } from "./SourceCall.js";
import { SourceIdentifier } from "./SourceIdentifier.js";
import { SourceIf } from "./SourceIf.js";
import { SourceNull } from "./SourceNull.js";
import { SourceNumber } from "./SourceNumber.js";
import { SourceObject } from "./SourceObject.js";
import { SourcePropertyAccess } from "./SourcePropertyAccess.js";
import { SourceReturn } from "./SourceReturn.js";
import { SourceSplice } from "./SourceSplice.js";
import { SourceString } from "./SourceString.js";

export class AstBuilder implements Visitor<AstNode> {
  splice(loc: SourceLocation, index: number): SourceSplice {
    return new SourceSplice(loc, index);
  }

  null(loc: SourceLocation): SourceNull {
    return new SourceNull(loc);
  }

  number(loc: SourceLocation, value: number): SourceNumber {
    return new SourceNumber(loc, value);
  }

  boolean(loc: SourceLocation, value: boolean): SourceBoolean {
    return new SourceBoolean(loc, value);
  }

  string(loc: SourceLocation, value: string): SourceString {
    return new SourceString(loc, value);
  }

  identifier(loc: SourceLocation, name: string): SourceIdentifier {
    return new SourceIdentifier(loc, name);
  }

  block(loc: SourceLocation, statements: AstNode[]): SourceBlock {
    return new SourceBlock(loc, statements);
  }

  assignment(
    loc: SourceLocation,
    name: AstNode,
    expression: AstNode,
  ): SourceAssignment {
    return new SourceAssignment(loc, name, expression);
  }

  if(
    loc: SourceLocation,
    condition: AstNode,
    consequent: AstNode,
    alternate: AstNode | null,
  ): SourceIf {
    return new SourceIf(loc, condition, consequent, alternate);
  }

  return(loc: SourceLocation, expression: AstNode): SourceReturn {
    return new SourceReturn(loc, expression);
  }

  propertyAccess(
    loc: SourceLocation,
    expression: AstNode,
    name: string,
  ): SourcePropertyAccess {
    return new SourcePropertyAccess(loc, expression, name);
  }

  binop(
    loc: SourceLocation,
    lhs: AstNode,
    operator: string,
    rhs: AstNode,
  ): SourceBinop {
    return new SourceBinop(loc, lhs, operator, rhs);
  }

  array(loc: SourceLocation, elements: AstNode[]): SourceArray {
    return new SourceArray(loc, elements);
  }

  object(
    loc: SourceLocation,
    entries: { [key: string]: AstNode },
  ): SourceObject {
    return new SourceObject(loc, entries);
  }

  call(loc: SourceLocation, callee: AstNode, args: AstNode[]): SourceCall {
    return new SourceCall(loc, callee, args);
  }

  arrow(loc: SourceLocation, params: string[], body: AstNode): SourceArrow {
    return new SourceArrow(loc, params, body);
  }
}
