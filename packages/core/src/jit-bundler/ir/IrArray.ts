import type { IrValue } from "./IrValue.js";

export class IrArray {
  readonly elements: readonly IrValue[];

  constructor(elements: IrValue[]) {
    this.elements = elements;
  }
}
