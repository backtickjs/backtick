import {
  type Client,
  type ClientUnknown,
  isClient,
  isClientScript,
} from "../../cs-runtime/index.js";
import { buildClassAsObject } from "./buildClassAsObject.js";
import { buildClientScript } from "./buildClientScript.js";
import type { AstRoot } from "./nodes/AstNode.js";

export function buildAst(client: Client<ClientUnknown>): AstRoot {
  if (isClientScript(client)) {
    return buildClientScript(client);
  }
  if (isClient(client)) {
    return buildClassAsObject(client);
  }
  const unhandled: never = client;
  throw new Error(`Cannot build AST for: ${JSON.stringify(unhandled)}`);
}
