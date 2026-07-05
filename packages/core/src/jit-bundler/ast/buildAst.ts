import { type Client, isClientScript } from "../../cs-runtime/index.js";
import { locKey } from "../locKey.js";
import { AstBuilder } from "./AstBuilder.js";
import { buildSplice } from "./buildSplice.js";
import type { AstNode } from "./nodes/AstNode.js";
import { SourceClientScript } from "./nodes/SourceClientScript.js";

const cache = new Map<string, SourceClientScript>();

export function buildAst(client: Client<unknown>): AstNode {
  if (isClientScript(client)) {
    const splices = client.metadata.splices.map(buildSplice);
    const key = locKey(client.loc);
    const cached = cache.get(key);
    if (cached) {
      const expression = cached.expression;
      return new SourceClientScript(
        client.loc,
        splices,
        client.metadata.freeVars,
        expression,
      );
    } else {
      const expression = client.visit(new AstBuilder());
      const node = new SourceClientScript(
        client.loc,
        splices,
        client.metadata.freeVars,
        expression,
      );
      cache.set(key, node);
      return node;
    }
  }
  return client.visit(new AstBuilder());
}
