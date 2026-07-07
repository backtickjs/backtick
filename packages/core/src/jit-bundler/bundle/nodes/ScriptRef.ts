import type { Argument } from "./Argument.js";

// A reference into the bundle's script table — how one bundled script embeds
// another (and how the bundle names its entrypoint). `target` selects the
// entry; `args` are the splice values passed to it, in splice order, one per
// parameter of the target `BundledScript`. Each argument may itself be a
// `ScriptRef`.
export class ScriptRef {
  readonly target: number;
  readonly args: Argument[];

  constructor(target: number, args: Argument[]) {
    this.target = target;
    this.args = args;
  }
}
