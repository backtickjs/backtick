import type { Value } from "./Value.js";

// What a `BundleElement` evaluates to: the element with its props reduced to
// runtime values, so a script prop holds the value the script produced — a
// handler stays a function.
//
// Mutable because an instance re-renders in place when one of its cells is
// written: whoever holds the element is holding the instance, so it observes
// the new render rather than a detached copy.
export class Element {
  readonly id: string;
  key: string | number | null;
  props: { [prop: string]: Value };

  constructor(
    id: string,
    key: string | number | null,
    props: { [prop: string]: Value },
  ) {
    this.id = id;
    this.key = key;
    this.props = props;
  }
}
