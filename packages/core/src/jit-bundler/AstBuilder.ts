import type { SourceLocation, Visitor } from "../cs-runtime/index.js";
import type { AstNode } from "./ast/AstNode.js";
import { StringLiteral } from "./ast/StringLiteral.js";

export class AstBuilder implements Visitor<AstNode> {
  string(loc: SourceLocation, value: string): StringLiteral {
    return new StringLiteral(loc, value);
  }

  clientScript(): AstNode {
    throw new Error("jit-bundler: `clientScript` is not implemented yet");
  }
  splice(): AstNode {
    throw new Error("jit-bundler: `splice` is not implemented yet");
  }
  null(): AstNode {
    throw new Error("jit-bundler: `null` is not implemented yet");
  }
  number(): AstNode {
    throw new Error("jit-bundler: `number` is not implemented yet");
  }
  boolean(): AstNode {
    throw new Error("jit-bundler: `boolean` is not implemented yet");
  }
  identifier(): AstNode {
    throw new Error("jit-bundler: `identifier` is not implemented yet");
  }
  block(): AstNode {
    throw new Error("jit-bundler: `block` is not implemented yet");
  }
  assignment(): AstNode {
    throw new Error("jit-bundler: `assignment` is not implemented yet");
  }
  if(): AstNode {
    throw new Error("jit-bundler: `if` is not implemented yet");
  }
  return(): AstNode {
    throw new Error("jit-bundler: `return` is not implemented yet");
  }
  propertyAccess(): AstNode {
    throw new Error("jit-bundler: `propertyAccess` is not implemented yet");
  }
  binop(): AstNode {
    throw new Error("jit-bundler: `binop` is not implemented yet");
  }
  array(): AstNode {
    throw new Error("jit-bundler: `array` is not implemented yet");
  }
  object(): AstNode {
    throw new Error("jit-bundler: `object` is not implemented yet");
  }
}
