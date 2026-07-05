import type { IrCall } from "./nodes/IrCall.js";
import type { IrFunction } from "./nodes/IrFunction.js";

// A bundled client script: a flat table holding every distinct client script
// (deduplicated by source location) plus a call that names the entrypoint.
export interface IrPayload {
  functions: IrFunction[];
  root: IrCall;
}
