import { type Client, isClientScript } from "../cs-runtime/index.js";
import { AstBuilder } from "./ast/AstBuilder.js";
import { AstClientScript } from "./ast/AstClientScript.js";
import type { AstNode } from "./ast/AstNode.js";

export function buildAst(client: Client<unknown>): AstNode {
  const expression = client.visit(new AstBuilder());
  if (isClientScript(client)) {
    return new AstClientScript(client.loc, client.metadata, expression);
  }
  return expression;
}
