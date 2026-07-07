import type { Argument } from "./Argument.js";

export class ConstArray {
  readonly elements: readonly Argument[];

  constructor(elements: Argument[]) {
    this.elements = elements;
  }
}
