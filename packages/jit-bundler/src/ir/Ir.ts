import type { SourceLocation } from "@backtickjs/cs-runtime";
import type { ClientScriptBody } from "@backtickjs/cs-runtime";

export interface Ir {
  scripts: IrScriptEntry[];
  root: IrArgument;
}

export interface IrScriptEntry {
  readonly kind: "IrScriptEntry";
  readonly loc: SourceLocation;
  readonly fileHash: string;
  readonly splices: readonly string[];
  readonly captures: readonly string[];
  readonly spliceParams: Readonly<Record<string, readonly string[]>>;
  readonly body: ClientScriptBody;
}

// How one script entry embeds another (and how the IR names its entrypoint).
// `target` is the entry itself — `scripts` orders the table, it doesn't name
// it, and an entry is interned by source location so two references to one
// script are two references to one object. `args` are the splice values passed
// to it, in splice order, one per parameter of the target. Each argument may
// itself be an `IrScriptRef`.
export interface IrScriptRef {
  readonly kind: "IrScriptRef";
  readonly target: IrScriptEntry;
  readonly args: readonly IrArgument[];
}

// A JSX element as data, with each prop lowered to an IR argument. Structure
// goes where it stands — an element is never an entry, the same way a builtin
// is never one — so only a script (an `IrScriptRef`) interrupts the data.
export interface IrElement {
  readonly kind: "IrElement";
  readonly id: string;
  readonly props: Readonly<Record<string, IrArgument>>;
}

// A construction's expansion carried through the IR: an arrow over `params`
// whose body is the expanded spliceable, with `IrHole` leaves where the
// client arguments bind (see `AstExpansion`).
export interface IrExpansion {
  readonly kind: "IrExpansion";
  readonly params: readonly string[];
  readonly body: IrArgument;
}

// A reference to the enclosing expansion's parameter of that name.
export interface IrHole {
  readonly kind: "IrHole";
  readonly name: string;
}

// A runtime primitive carried through the IR as data.
export interface IrValue {
  readonly kind: "IrValue";
  readonly value: null | boolean | number | string;
}

// A runtime array carried through the IR as data, each element an argument.
export interface IrArray {
  readonly kind: "IrArray";
  readonly elements: readonly IrArgument[];
}

// A runtime plain object carried through the IR as data, each entry's value
// an argument. Raw user data only ever appears under `IrValue.value`, so a
// data object can never be mistaken for an IR node.
export interface IrObject {
  readonly kind: "IrObject";
  readonly entries: Readonly<Record<string, IrArgument>>;
}

// An argument threaded into a script entry's splice hole or carried as an
// element's prop. A nested client script becomes an `IrScriptRef` — a
// reference into the IR's script table, the only table there is; every other
// value is written where it stands, as an element, or as a runtime constant
// wrapped in a value, array, or object node.
export type IrArgument =
  | IrValue
  | IrArray
  | IrObject
  | IrExpansion
  | IrHole
  | IrScriptRef
  | IrElement;
