import type { IrValue } from "./IrValue.js";

export class IrObject {
  readonly entries: Readonly<Record<string, IrValue>>;

  constructor(entries: Record<string, IrValue>) {
    this.entries = entries;
  }
}
