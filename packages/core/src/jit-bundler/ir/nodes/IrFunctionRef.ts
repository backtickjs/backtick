import type { IrValue } from "./IrValue.js";

// A call into the payload's function table. `index` selects the entry; `args`
// are the splice values passed to it, in splice order (each may itself be an
// `IrFunctionRef`).
export class IrFunctionRef {
  readonly index: number;
  readonly args: IrValue[];

  constructor(index: number, args: IrValue[]) {
    this.index = index;
    this.args = args;
  }
}
