import type { BundledArgument } from "./BundledArgument.js";

// A reference into the bundle's script table — how one bundled script embeds
// another (and how the bundle names its entrypoint). `target` selects the
// entry; `args` are the splice values passed to it, in splice order, one per
// parameter of the target `BundledScriptEntry`. Each argument may itself be a
// `BundledScriptRef`.
export class BundledScriptRef {
  readonly target: number;
  readonly args: BundledArgument[];

  constructor(target: number, args: BundledArgument[]) {
    this.target = target;
    this.args = args;
  }
}
