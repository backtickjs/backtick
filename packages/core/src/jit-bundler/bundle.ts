import type { Client, ClientUnknown } from "../cs-runtime/index.js";
import { buildAst } from "./ast/buildAst.js";
import type { Bundle } from "./bundle/Bundle.js";
import { buildBundle } from "./bundle/buildBundle.js";
import { buildIr } from "./ir/buildIr.js";

// The bundle is plain data; serialize it with `JSON.stringify`.
export function bundle(value: Client<ClientUnknown>): Bundle {
  const ast = buildAst(value);
  const ir = buildIr(ast);
  return buildBundle(ir);
}
