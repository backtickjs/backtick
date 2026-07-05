import type { Client } from "../cs-runtime/index.js";
import { buildAst } from "./ast/buildAst.js";
import { buildIr } from "./ir/buildIr.js";
import { serialize } from "./serializer/serialize.js";

export function bundle(client: Client<unknown>): string {
  const ast = buildAst(client);
  const ir = buildIr(ast);
  return serialize(ir);
}
