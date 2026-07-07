import type { Argument } from "./Argument.js";

export class ConstObject {
  readonly entries: Readonly<Record<string, Argument>>;

  constructor(entries: Record<string, Argument>) {
    this.entries = entries;
  }
}
