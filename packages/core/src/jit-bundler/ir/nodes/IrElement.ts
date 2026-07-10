import type { IrArgument } from "./IrArgument.js";

// A JSX element lowered into a tree entry: static structure carried as data,
// with each prop lowered to an IR argument. Only a script (an `IrScriptRef`)
// or a shared subtree (an `IrTreeRef`) interrupts the data; an element nested
// unshared inside another appears inline as an `IrElement` prop.
export class IrElement {
  readonly type: string;
  readonly key: string | number | null;
  readonly props: Readonly<Record<string, IrArgument>>;

  constructor(
    type: string,
    key: string | number | null,
    props: Record<string, IrArgument>,
  ) {
    this.type = type;
    this.key = key;
    this.props = props;
  }
}
