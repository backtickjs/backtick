import type { ConstArray } from "./ConstArray.js";
import type { ConstBoolean } from "./ConstBoolean.js";
import type { ConstNull } from "./ConstNull.js";
import type { ConstNumber } from "./ConstNumber.js";
import type { ConstObject } from "./ConstObject.js";
import type { ConstString } from "./ConstString.js";
import type { ScriptRef } from "./ScriptRef.js";

// An argument threaded into a bundled script's splice hole. A nested client
// script becomes a `ScriptRef` (a reference into the bundle's script table);
// every other value is a plain runtime constant.
export type Argument =
  | ConstArray
  | ConstBoolean
  | ConstNull
  | ConstNumber
  | ConstObject
  | ConstString
  | ScriptRef;
