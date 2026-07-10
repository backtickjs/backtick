import type { IrElement } from "./IrElement.js";

// A tree-table entry. A wrapper rather than the element itself so
// instance-scoped additions — per-instance state declarations — can land as
// sibling fields without reshaping the table.
export class IrTreeEntry {
  readonly element: IrElement;

  constructor(element: IrElement) {
    this.element = element;
  }
}
