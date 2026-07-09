import type { BundledElement } from "./BundledElement.js";
import type { ScriptRef } from "./ScriptRef.js";
import type { TreeRef } from "./TreeRef.js";

// An argument threaded into a bundled script's splice hole or carried as an
// element's prop. A nested client script becomes a `ScriptRef` (a reference
// into the bundle's script table); a JSX element becomes a `TreeRef` (a
// reference into the tree table) or — nested unshared inside another element —
// an inline `BundledElement`; every other value is a plain runtime constant.
export type Argument =
  | null
  | number
  | boolean
  | string
  | Argument[]
  | { [key: string]: Argument }
  | ScriptRef
  | TreeRef
  | BundledElement;
