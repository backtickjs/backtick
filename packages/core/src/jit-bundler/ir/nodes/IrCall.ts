import type { IrValue } from "./IrValue.js";

// A call into the payload's function table — how one entry references another
// (and how the payload names its entrypoint). `target` selects the entry;
// `args` are the splice values passed to it, in splice order, one per parameter
// of the target `IrFunction`. Each argument may itself be an `IrCall`.
export class IrCall {
  readonly target: number;
  readonly args: IrValue[];

  constructor(target: number, args: IrValue[]) {
    this.target = target;
    this.args = args;
  }
}
