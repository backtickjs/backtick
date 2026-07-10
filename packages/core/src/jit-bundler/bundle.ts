import type { Client, ClientUnknown } from "../cs-runtime/index.js";
import { buildAst } from "./ast/buildAst.js";
import { buildBundle } from "./bundle/buildBundle.js";
import { buildEnvelope } from "./envelope/buildEnvelope.js";

export function bundle(client: Client<ClientUnknown>): string {
  const ast = buildAst(client);
  const bundle = buildBundle(ast);
  const envelope = buildEnvelope(bundle);
  return JSON.stringify(envelope, null, 2);
}
