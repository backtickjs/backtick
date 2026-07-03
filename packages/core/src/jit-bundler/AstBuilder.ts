import type {
  Metadata,
  SourceLocation,
  Spliceable,
  Visitor,
} from "../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";
import { AstArray } from "./ast/AstArray.js";
import { AstAssignment } from "./ast/AstAssignment.js";
import { AstBinop } from "./ast/AstBinop.js";
import { AstBlock } from "./ast/AstBlock.js";
import { AstBoolean } from "./ast/AstBoolean.js";
import { AstClientScript } from "./ast/AstClientScript.js";
import { AstIdentifier } from "./ast/AstIdentifier.js";
import { AstIf } from "./ast/AstIf.js";
import { AstNull } from "./ast/AstNull.js";
import { AstNumber } from "./ast/AstNumber.js";
import { AstObject } from "./ast/AstObject.js";
import { AstPropertyAccess } from "./ast/AstPropertyAccess.js";
import { AstReturn } from "./ast/AstReturn.js";
import { AstSplice } from "./ast/AstSplice.js";
import { AstString } from "./ast/AstString.js";

export class AstBuilder implements Visitor<AstNode> {
  clientScript(
    loc: SourceLocation,
    metadata: Metadata,
    expression: AstNode,
  ): AstClientScript {
    return new AstClientScript(loc, metadata, expression);
  }

  splice(loc: SourceLocation, key: string, expression: Spliceable): AstSplice {
    return new AstSplice(loc, key, expression);
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
}
