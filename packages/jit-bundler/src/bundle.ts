import { lowerSpliceable } from "./ast/lowerSpliceable.js";
import type { Bundle } from "./bundle/Bundle.js";
import { buildBundle } from "./bundle/buildBundle.js";
import { buildIr } from "./ir/buildIr.js";
import type { Spliceable } from "@backtickjs/cs-runtime";

export interface BundleOptions {
  // What names a `functions` entry.
  //
  // `"index"` (the default) — where the entry landed in the table. Short, and
  // all a client reading one response needs.
  //
  // `"location"` — where the script was written, as `<fileHash>:<line>:<char>`.
  // Longer on the wire, and the same in every response carrying that script.
  readonly functionLabels?: "index" | "location";
}

// The bundle is plain data; serialize it with `JSON.stringify`.
export async function bundle(
  value: Spliceable,
  options: BundleOptions = {},
): Promise<Bundle> {
  const ast = await lowerSpliceable(value, "ClientUnknown");
  const ir = buildIr(ast);
  return buildBundle(ir, options);
}
