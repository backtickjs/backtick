import {
  type Client,
  isClientScript,
  type SourceLocation,
} from "../cs-runtime/index.js";
import { AstBuilder } from "./ast/AstBuilder.js";
import { AstClientScript } from "./ast/AstClientScript.js";
import type { AstNode } from "./ast/AstNode.js";

const cache = new Map<string, AstClientScript>();

function cacheKey(loc: SourceLocation): string {
  return `${loc.path}:${loc.start.line}:${loc.start.character}:${loc.end.line}:${loc.end.character}`;
}

export function buildAst(client: Client<unknown>): AstNode {
  if (isClientScript(client)) {
    const key = cacheKey(client.loc);
    const cached = cache.get(key);
    if (cached) {
      const expression = cached.expression;
      return new AstClientScript(client.loc, client.metadata, expression);
    } else {
      const expression = client.visit(new AstBuilder());
      const node = new AstClientScript(client.loc, client.metadata, expression);
      cache.set(key, node);
      return node;
    }
  }
  return client.visit(new AstBuilder());
}
