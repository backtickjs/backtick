import { lowerSpliceable } from "./ast/lowerSpliceable.js";
import type { Bundle } from "./bundle/Bundle.js";
import { buildBundle } from "./bundle/buildBundle.js";
import { buildIr } from "./ir/buildIr.js";
import type { Client, ClientValue } from "@backtickjs/cs-runtime";

// The bundle is plain data; serialize it with `JSON.stringify`.
export function bundle(value: Client<ClientValue> | Client<void>): Bundle {
  const ast = lowerSpliceable(value, "ClientUnknown");
  const ir = buildIr(ast);
  return buildBundle(ir);
}
