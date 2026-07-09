import type { Argument } from "./Argument.js";

// A JSX element lowered into a tree entry: static structure carried as data,
// with each prop lowered to a bundle argument. Only a script (a `ScriptRef`)
// or a shared subtree (a `TreeRef`) interrupts the data; an element nested
// unshared inside another appears inline as a `BundledElement` prop.
export class BundledElement {
  readonly type: string;
  readonly key: string | number | null;
  readonly props: Readonly<Record<string, Argument>>;

  constructor(
    type: string,
    key: string | number | null,
    props: Record<string, Argument>,
  ) {
    this.type = type;
    this.key = key;
    this.props = props;
  }
}
