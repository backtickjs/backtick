import type { Client, ClientUnknown } from "../cs-runtime/index.js";
import { buildAst } from "./ast/buildAst.js";
import { buildBundle } from "./bundle/buildBundle.js";
import { serializeBundle } from "./serializer/serialize.js";

export function bundle(client: Client<ClientUnknown>): string {
  const ast = buildAst(client);
  const bundled = buildBundle(ast);
  return serializeBundle(bundled);
}
