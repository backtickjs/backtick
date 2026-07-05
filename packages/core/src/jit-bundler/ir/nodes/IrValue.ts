import type { IrArray } from "./IrArray.js";
import type { IrBoolean } from "./IrBoolean.js";
import type { IrCall } from "./IrCall.js";
import type { IrNull } from "./IrNull.js";
import type { IrNumber } from "./IrNumber.js";
import type { IrObject } from "./IrObject.js";
import type { IrString } from "./IrString.js";

// A value in the bundler IR: the data threaded between function-table entries.
// A nested client script becomes an `IrCall` (a call into the table); every
// other value is a plain runtime constant.
export type IrValue =
  | IrArray
  | IrBoolean
  | IrCall
  | IrNull
  | IrNumber
  | IrObject
  | IrString;
