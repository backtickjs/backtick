import type { IrElement } from "./IrElement.js";
import type { IrScriptRef } from "./IrScriptRef.js";
import type { IrTreeRef } from "./IrTreeRef.js";

// An argument threaded into a script entry's splice hole or carried as an
// element's prop. A nested client script becomes an `IrScriptRef` (a reference
// into the IR's script table); a JSX element becomes an `IrTreeRef` (a
// reference into the tree table) or — nested unshared inside another element —
// an inline `IrElement`; every other value is a plain runtime constant.
export type IrArgument =
  | null
  | number
  | boolean
  | string
  | IrArgument[]
  | { [key: string]: IrArgument }
  | IrScriptRef
  | IrTreeRef
  | IrElement;
