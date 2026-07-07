import {
  type Client,
  isClient,
  isClientScript,
} from "../../cs-runtime/index.js";
import { buildClassAsObject } from "./buildClassAsObject.js";
import { buildClientScript } from "./buildClientScript.js";
import { buildSplice } from "./buildSplice.js";
import type { AstNode } from "./nodes/AstNode.js";

export function buildAst(client: Client<unknown>): AstNode {
  if (isClientScript(client)) {
    return buildClientScript(client);
  }
  if (isClient(client)) {
    return buildClassAsObject(client);
  }
  return buildSplice(client);
}
