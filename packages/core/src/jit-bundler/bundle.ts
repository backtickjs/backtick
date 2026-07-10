import type { Client, ClientUnknown } from "../cs-runtime/index.js";
import { buildAst } from "./ast/buildAst.js";
import { buildBundle } from "./bundle/buildBundle.js";
import type { Bundle } from "./bundle/nodes/Bundle.js";
import { buildIr } from "./ir/buildIr.js";

// The bundle is plain data; serialize it with `JSON.stringify`.
export function bundle(client: Client<ClientUnknown>): Bundle {
  const ast = buildAst(client);
  const ir = buildIr(ast);
  return buildBundle(ir);
}
