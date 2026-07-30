import type { SourceLocation } from "@backtickjs/cs-runtime";
import type { AstScriptBody } from "@backtickjs/cs-runtime";

export interface Ir {
  scripts: IrScriptEntry[];
  trees: IrTreeEntry[];
  root: IrArgument;
}

// A cell. Every splice of one cell is the same reference, so every reader and
// writer shares the storage.
//
// `target` numbers the cell across the whole IR, not within its entry: a script
// can capture two cells at once — one its own component declared and one
// reaching in from an enclosing component — and per-entry numbers would give
// both the same binding key.
export interface IrStateRef {
  readonly kind: "IrStateRef";
  readonly target: number;
}

export interface IrScriptEntry {
  readonly kind: "IrScriptEntry";
  readonly loc: SourceLocation;
  readonly fileHash: string;
  readonly splices: readonly string[];
  readonly captures: readonly string[];
  readonly spliceParams: Readonly<Record<string, readonly string[]>>;
  readonly body: AstScriptBody;
}

// A tree-table entry. A wrapper rather than the element itself so
// instance-scoped additions — per-instance state declarations — can land as
// sibling fields without reshaping the table.
// A tree-table entry: one instance's content. Usually the element it renders;
// a reference when the instance is a component that renders another component,
// since that inner invocation is an instance of its own.
export interface IrTreeEntry {
  readonly kind: "IrTreeEntry";
  // Null when the instance renders nothing. The entry still exists — it is what
  // owns the instance's state and what a re-render re-evaluates — so what is
  // absent is the content, not the entry.
  //
  // Written after the entry exists, like `AstInstance.child`: the entry is
  // minted before its subtree is lowered, because a cell interned down there
  // has to land in the entry its component became.
  content: IrElement | IrTreeRef | null;
  // The cells this instance declares, each under the number its references
  // carry (`IrStateRef.target`) and holding the cell's initial value.
  // Instantiating the entry allocates storage for each, so ownership is where a
  // cell sits rather than something recorded on it. Empty for an element entry:
  // only a component invocation can declare state.
  state: Record<number, IrArgument>;
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

// A reference into the IR's tree table — how a script body, another tree,
// or the IR root embeds a JSX tree. Unlike an `IrScriptRef` it carries no
// arguments: a tree's data is baked into its entry, and the captures its
// scripts need (the tree's slot signature) are derived and threaded by the
// serializer.
export interface IrTreeRef {
  readonly kind: "IrTreeRef";
  readonly target: number;
  readonly key: IrArgument;
}

// A JSX element lowered into a tree entry: static structure carried as data,
// with each prop lowered to an IR argument. Only a script (an `IrScriptRef`)
// or a shared subtree (an `IrTreeRef`) interrupts the data; an element nested
// unshared inside another appears inline as an `IrElement` prop.
export interface IrElement {
  readonly kind: "IrElement";
  readonly id: string;
  readonly key: IrArgument;
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
// element's prop. A nested client script becomes an `IrScriptRef` (a
// reference into the IR's script table); a JSX element becomes an `IrTreeRef`
// (a reference into the tree table) or — nested unshared inside another
// element — an inline `IrElement`; every other value is a runtime constant
// wrapped in a value, array, or object node.
export type IrArgument =
  | IrValue
  | IrArray
  | IrObject
  | IrExpansion
  | IrHole
  | IrScriptRef
  | IrTreeRef
  | IrStateRef
  | IrElement;
