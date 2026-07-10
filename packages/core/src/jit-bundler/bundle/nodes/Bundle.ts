import type { BundledArgument } from "./BundledArgument.js";
import type { BundledScriptEntry } from "./BundledScriptEntry.js";
import type { BundledTreeEntry } from "./BundledTreeEntry.js";

export interface Bundle {
  scripts: BundledScriptEntry[];
  trees: BundledTreeEntry[];
  root: BundledArgument;
}
