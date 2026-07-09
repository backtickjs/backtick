import type { Client, ClientUnknown } from "../cs-runtime/index.js";
import { buildAst } from "./ast/buildAst.js";
import { buildBundle } from "./bundle/buildBundle.js";
import { serializeBundle } from "./serializer/serializeBundle.js";

export function bundle(client: Client<ClientUnknown>): string {
  const ast = buildAst(client);
  const bundle = buildBundle(ast);
  return serializeBundle(bundle);
}
