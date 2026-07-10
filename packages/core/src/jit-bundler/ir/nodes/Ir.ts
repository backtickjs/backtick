import type { IrArgument } from "./IrArgument.js";
import type { IrScriptEntry } from "./IrScriptEntry.js";
import type { IrTreeEntry } from "./IrTreeEntry.js";

export interface Ir {
  scripts: IrScriptEntry[];
  trees: IrTreeEntry[];
  root: IrArgument;
}
