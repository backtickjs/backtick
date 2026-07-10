import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstScriptBody } from "../ast/Ast.js";

export interface Ir {
  scripts: IrScriptEntry[];
  trees: IrTreeEntry[];
  root: IrArgument;
}

export interface IrScriptEntry {
  readonly kind: "IrScriptEntry";
  readonly loc: SourceLocation;
  readonly captures: readonly string[];
  readonly declarations: readonly string[];
  readonly body: AstScriptBody;
}

// A tree-table entry. A wrapper rather than the element itself so
// instance-scoped additions — per-instance state declarations — can land as
// sibling fields without reshaping the table.
export interface IrTreeEntry {
  readonly kind: "IrTreeEntry";
  readonly element: IrElement;
}

// A reference into the IR's script table — how one script entry embeds
// another (and how the IR names its entrypoint). `target` selects the
// entry; `args` are the splice values passed to it, in splice order, one per
// parameter of the target `IrScriptEntry`. Each argument may itself be an
// `IrScriptRef`.
export interface IrScriptRef {
  readonly kind: "IrScriptRef";
  readonly target: number;
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
}

// A JSX element lowered into a tree entry: static structure carried as data,
// with each prop lowered to an IR argument. Only a script (an `IrScriptRef`)
// or a shared subtree (an `IrTreeRef`) interrupts the data; an element nested
// unshared inside another appears inline as an `IrElement` prop.
export interface IrElement {
  readonly kind: "IrElement";
  readonly type: string;
  readonly key: string | number | null;
  readonly props: Readonly<Record<string, IrArgument>>;
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
  | IrScriptRef
  | IrTreeRef
  | IrElement;
