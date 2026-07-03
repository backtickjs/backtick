import type { Client } from "../cs-runtime/index.js";
import { AstBuilder } from "./ast/AstBuilder.js";
import type { AstNode } from "./ast/AstNode.js";

export function buildAst(client: Client<unknown>): AstNode {
  return client.visit(new AstBuilder());
}
