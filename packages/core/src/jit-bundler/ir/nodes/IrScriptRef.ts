import type { IrArgument } from "./IrArgument.js";

// A reference into the IR's script table — how one script entry embeds
// another (and how the IR names its entrypoint). `target` selects the
// entry; `args` are the splice values passed to it, in splice order, one per
// parameter of the target `IrScriptEntry`. Each argument may itself be a
// `IrScriptRef`.
export class IrScriptRef {
  readonly target: number;
  readonly args: IrArgument[];

  constructor(target: number, args: IrArgument[]) {
    this.target = target;
    this.args = args;
  }
}
