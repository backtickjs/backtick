import { lowerSpliceable } from "./ast/lowerSpliceable.js";
import type { Bundle } from "./bundle/Bundle.js";
import { buildBundle } from "./bundle/buildBundle.js";
import { buildIr } from "./ir/buildIr.js";
import type { Client, ClientValue } from "@backtickjs/cs-runtime";

// The bundle is plain data; serialize it with `JSON.stringify`.
export async function bundle(
  value: Client<ClientValue> | Client<void>,
): Promise<Bundle> {
  const ast = await lowerSpliceable(value, "ClientUnknown");
  const ir = buildIr(ast);
  return buildBundle(ir);
}
