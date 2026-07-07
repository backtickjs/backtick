import type { Argument } from "./nodes/Argument.js";
import type { BundledScript } from "./nodes/BundledScript.js";

export interface Bundle {
  scripts: BundledScript[];
  root: Argument;
}
