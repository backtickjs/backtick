import type { Client } from "../cs-runtime/index.js";
import { buildAst } from "./buildAst.js";
import { buildIr } from "./buildIr.js";
import { serialize } from "./serialize.js";

export function bundle(client: Client<unknown>): string {
  const ast = buildAst(client);
  const ir = buildIr(ast);
  return serialize(ir);
}
