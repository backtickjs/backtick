import type { Client, ClientUnknown } from "../cs-runtime/index.js";
import { buildAst } from "./ast/buildAst.js";
import { buildBundle } from "./bundle/buildBundle.js";
import { buildIr } from "./ir/buildIr.js";

export function bundle(client: Client<ClientUnknown>): string {
  const ast = buildAst(client);
  const ir = buildIr(ast);
  const bundle = buildBundle(ir);
  return JSON.stringify(bundle, null, 2);
}
