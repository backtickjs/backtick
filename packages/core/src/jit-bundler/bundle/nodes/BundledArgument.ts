import type { BundledElement } from "./BundledElement.js";
import type { BundledScriptRef } from "./BundledScriptRef.js";
import type { BundledTreeRef } from "./BundledTreeRef.js";

// An argument threaded into a bundled script's splice hole or carried as an
// element's prop. A nested client script becomes a `BundledScriptRef` (a reference
// into the bundle's script table); a JSX element becomes a `BundledTreeRef` (a
// reference into the tree table) or — nested unshared inside another element —
// an inline `BundledElement`; every other value is a plain runtime constant.
export type BundledArgument =
  | null
  | number
  | boolean
  | string
  | BundledArgument[]
  | { [key: string]: BundledArgument }
  | BundledScriptRef
  | BundledTreeRef
  | BundledElement;
