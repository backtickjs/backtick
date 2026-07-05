import type { IrFunction } from "./nodes/IrFunction.js";
import type { IrFunctionRef } from "./nodes/IrFunctionRef.js";

// A bundled client script: a flat table holding every distinct client script
// (deduplicated by source location) plus a reference to the entrypoint.
export interface IrPayload {
  functions: IrFunction[];
  root: IrFunctionRef;
}
