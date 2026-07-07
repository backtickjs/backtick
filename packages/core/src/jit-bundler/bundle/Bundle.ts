import type { BundledScript } from "./nodes/BundledScript.js";
import type { ScriptRef } from "./nodes/ScriptRef.js";

// A bundled client script: a flat table holding every distinct client script
// (deduplicated by source location) plus a reference that names the entrypoint.
export interface Bundle {
  scripts: BundledScript[];
  root: ScriptRef;
}
