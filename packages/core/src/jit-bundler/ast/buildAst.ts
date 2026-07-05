import {
  type Client,
  isClientScript,
  type SourceLocation,
} from "../../cs-runtime/index.js";
import { AstBuilder } from "./AstBuilder.js";
import type { AstNode } from "./nodes/AstNode.js";
import { SourceClientScript } from "./nodes/SourceClientScript.js";
import { buildSplice } from "./buildSplice.js";

const cache = new Map<string, SourceClientScript>();

function cacheKey(loc: SourceLocation): string {
  return `${loc.path}:${loc.start.line}:${loc.start.character}:${loc.end.line}:${loc.end.character}`;
}

export function buildAst(client: Client<unknown>): AstNode {
  if (isClientScript(client)) {
    const splices = client.metadata.splices.map(buildSplice);
    const key = cacheKey(client.loc);
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
