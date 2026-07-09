import type { Argument } from "./nodes/Argument.js";
import type { BundledScript } from "./nodes/BundledScript.js";
import type { BundledTree } from "./nodes/BundledTree.js";

export interface Bundle {
  scripts: BundledScript[];
  trees: BundledTree[];
  root: Argument;
}
