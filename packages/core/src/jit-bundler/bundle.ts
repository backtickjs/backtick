import type { Client, ClientUnknown, JSXElement } from "../cs-runtime/index.js";
import { buildAst } from "./ast/buildAst.js";
import { buildBundle } from "./bundle/buildBundle.js";
import type { Bundle } from "./bundle/nodes/Bundle.js";
import { buildIr } from "./ir/buildIr.js";

// The bundle is plain data; serialize it with `JSON.stringify`.
export function bundle(value: JSXElement | Client<ClientUnknown>): Bundle {
  const ast = buildAst(value);
  const ir = buildIr(ast);
  return buildBundle(ir);
}
