// The bundle: the JIT bundler's wire format, as plain data — what ships is
// exactly `JSON.stringify` of this. These types are the contract an
// interpreter implements: evaluate `root` against the `functions` and `trees`
// tables. Computation ships as source (a `functions` entry is JavaScript),
// composition as data (a tree and the root are `BundleExpr` values), so a
// tree is parseable and inspectable without evaluating any source.
export interface Bundle {
  // Each entry is the source of an arrow `(params) => body`. A monomorphic
  // entry (one call site, or identical arguments everywhere) has its splice
  // arguments inlined into the body and takes only its captures as
  // parameters. A polymorphic entry additionally takes one nullary-thunk
  // parameter per splice hole, ahead of its captures; the body invokes the
  // thunk at the hole. A `BundleCall` targeting the entry passes arguments in
  // that same order.
  functions: Record<FunctionLabel, string>;
  trees: Record<TreeLabel, BundleTree>;
  root: BundleExpr;
}

export type FunctionLabel = `#f${number}`;
export type TreeLabel = `#t${number}`;

// A tree entry: a JSX tree as data. The element sits under an `element`
// wrapper so instance-scoped additions (per-instance state declarations) can
// land as sibling fields without reshaping the table. A tree is an implicit
// function of its slots: instantiating it supplies one value per `BundleSlot`
// index, exactly as calling a `functions` entry supplies its captures.
export interface BundleTree {
  element: BundleElement;
}

// A JSX element node: static structure carried as data, each prop a
// `BundleExpr` evaluated against the enclosing tree's slots.
export interface BundleElement {
  type: string;
  key: string | number | null;
  props: { [prop: string]: BundleExpr };
}

// The enclosing tree's n-th slot: resolves to the value supplied for that
// position when the tree was instantiated.
export interface BundleSlot {
  "#slot": number;
}

// A free host reference: resolves `name` on the global object.
export interface BundleGlobal {
  "#global": string;
}

// Applies a `functions` or `trees` entry. For a function target, `args`
// mirrors the entry's parameters: thunks for a polymorphic entry's splices
// first, then one value per capture. For a tree target, `args` supplies the
// tree's slots in index order.
export interface BundleCall {
  "#call": FunctionLabel | TreeLabel;
  args: BundleExpr[];
}

// A splice argument passed to a polymorphic entry, evaluated lazily: the
// interpreter passes it as a nullary function yielding the expression's
// value, so the hole evaluates it exactly like an inlined splice.
export interface BundleThunk {
  "#thunk": BundleExpr;
}

// A bundle expression: what a tree entry and the root are made of. Plain JSON
// carries itself; the tagged forms and element nodes compose. A plain data
// object never uses a tag key or the exact element shape (`type`/`key`/
// `props`) — bundling rejects those — so the tagged reading is unambiguous.
export type BundleExpr =
  | null
  | boolean
  | number
  | string
  | BundleExpr[]
  | BundleSlot
  | BundleGlobal
  | BundleCall
  | BundleThunk
  | BundleElement
  | { [key: string]: BundleExpr };
