import type { ScriptRef } from "./ScriptRef.js";

// An argument threaded into a bundled script's splice hole. A nested client
// script becomes a `ScriptRef` (a reference into the bundle's script table);
// every other value is a plain runtime constant.
export type Argument =
  | null
  | number
  | boolean
  | string
  | Argument[]
  | { [key: string]: Argument }
  | ScriptRef;
