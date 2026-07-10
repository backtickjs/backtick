import type { BundledElement } from "./BundledElement.js";

// A tree-table entry. A wrapper rather than the element itself so
// instance-scoped additions — per-instance state declarations — can land as
// sibling fields without reshaping the table.
export class BundledTreeEntry {
  readonly element: BundledElement;

  constructor(element: BundledElement) {
    this.element = element;
  }
}
