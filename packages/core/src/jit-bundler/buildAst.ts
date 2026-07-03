import type { Client } from "../cs-runtime/index.js";
import { AstBuilder } from "./AstBuilder.js";
import type { AstNode } from "./AstNode.js";

export function buildAst(client: Client<unknown>): AstNode {
  return client.visit(new AstBuilder());
}
