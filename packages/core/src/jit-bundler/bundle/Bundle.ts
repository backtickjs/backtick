// The bundle: the JIT bundler's wire format, as plain data — what ships is
// exactly `JSON.stringify` of this. These types are the contract an
// interpreter implements: evaluate `root` against the `functions` and `trees`
// tables. Computation ships as `BundleNode` ASTs (no JavaScript parsing
// required), composition as data (a tree and the root are `BundleExpr`
// values), so the whole bundle is parseable and inspectable as JSON.
export interface Bundle {
  // Each entry is an arrow node — evaluating it yields a function, exactly
  // as for an arrow nested inside a body. A monomorphic entry (one call
  // site, or identical arguments everywhere) has its splice arguments
  // inlined into the body and takes only its captures as parameters. A
  // polymorphic entry additionally takes one nullary-thunk parameter per
  // splice hole (named `$0`, `$1`, …), ahead of its captures; the body
  // invokes the thunk at the hole. A `BundleApply` targeting the entry passes
  // arguments in that same order.
  functions: Record<FunctionLabel, BundleArrowNode>;
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
  "#": "element";
  type: string;
  key: string | number | null;
  props: { [prop: string]: BundleExpr };
}

// The enclosing tree's n-th slot: resolves to the value supplied for that
// position when the tree was instantiated.
export interface BundleSlot {
  "#": "slot";
  index: number;
}

// A free host reference: resolves `name` on the global object.
export interface BundleGlobal {
  "#": "global";
  name: string;
}

// Applies a `functions` or `trees` entry. For a function target, `args`
// mirrors the entry's parameters: thunks for a polymorphic entry's splices
// first, then one value per capture. For a tree target, `args` supplies the
// tree's slots in index order. (Named `apply` on the wire: a body's `call`
// node has a different schema — it evaluates a `callee` node — while this
// form targets a table entry by label.)
export interface BundleApply {
  "#": "apply";
  label: FunctionLabel | TreeLabel;
  args: BundleExpr[];
}

// A splice argument passed to a polymorphic entry, evaluated lazily: the
// interpreter passes it as a nullary function yielding the expression's
// value, so the hole evaluates it exactly like an inlined splice.
export interface BundleThunk {
  "#": "thunk";
  expression: BundleExpr;
}

// A bundle expression: what a tree entry and the root are made of. Plain JSON
// carries itself; the `#`-discriminated forms compose. `#` is the
// bundle's one reserved key — a plain data object never uses it (bundling
// rejects it), so the structured reading is unambiguous.
export type BundleExpr =
  | null
  | boolean
  | number
  | string
  | BundleExpr[]
  | BundleSlot
  | BundleGlobal
  | BundleApply
  | BundleThunk
  | BundleElement
  | { [key: string]: BundleExpr };

// A node of a function body's AST, discriminated by `#` — a reserved key
// like the tagged expression forms, so a node can never be confused with
// user data anywhere in the bundle. Bodies are the
// inverse of tree expressions: all structure, with plain data as the
// exception — every object in a body is a node, and raw JSON only ever
// appears under a `value` node's `value` field, so nodes can never collide
// with user data. Scoping is lexical and names are pre-resolved: identifiers
// refer to parameters of an enclosing arrow (including the entry itself),
// locals declared in an enclosing block, or — when neither binds them —
// properties of the global object.
export type BundleNode =
  | BundleValueNode
  | BundleArrayNode
  | BundleObjectNode
  | BundleIdentifierNode
  | BundleEntryNode
  | BundleCallNode
  | BundlePropertyNode
  | BundleBinopNode
  | BundleArrowNode
  | BundleBlockNode
  | BundleDeclarationNode
  | BundleAssignmentNode
  | BundleIfNode
  | BundleReturnNode;

// A primitive constant: evaluates to `value` itself. Serves source literals
// and inlined runtime primitives alike.
export interface BundleValueNode {
  "#": "value";
  value: null | boolean | number | string;
}

// An array: evaluates each element in order. Containers recurse as nodes —
// an inlined runtime array can contain entry calls — so only primitives are
// leaves.
export interface BundleArrayNode {
  "#": "array";
  elements: BundleNode[];
}

// An object: evaluates each entry's value under its key.
export interface BundleObjectNode {
  "#": "object";
  entries: { [key: string]: BundleNode };
}

// A variable reference: resolves `name` in the enclosing scope, or on the
// global object when no parameter or declaration binds it.
export interface BundleIdentifierNode {
  "#": "identifier";
  name: string;
}

// A `functions` or `trees` entry as a value: the function the entry
// evaluates to. Calling it applies the entry; passed bare it is already a
// nullary thunk.
export interface BundleEntryNode {
  "#": "entry";
  label: FunctionLabel | TreeLabel;
}

// A call: evaluates the callee to a function and applies it. When the callee
// is an `entry` node targeting a function, `args` mirrors that entry's
// parameters (thunks for a polymorphic entry's splices first, then one value
// per capture); targeting a tree, `args` supplies the tree's slots in index
// order.
export interface BundleCallNode {
  "#": "call";
  callee: BundleNode;
  args: BundleNode[];
}

// A static property access: `object.name`.
export interface BundlePropertyNode {
  "#": "property";
  object: BundleNode;
  name: string;
}

// A binary operation with JavaScript semantics for `operator`.
export interface BundleBinopNode {
  "#": "binop";
  operator: string;
  left: BundleNode;
  right: BundleNode;
}

// An arrow function: evaluates to a closure over the enclosing scope. The
// body is an expression node (implicit return) or a `block`. Every
// `functions` entry is an arrow node.
export interface BundleArrowNode {
  "#": "arrow";
  params: string[];
  body: BundleNode;
}

// A statement block: executes statements in order; a `return` yields the
// enclosing arrow's result. Declarations are hoisted to the block, matching
// the compiler's scoping (a use before its declaration resolves to the
// local).
export interface BundleBlockNode {
  "#": "block";
  statements: BundleNode[];
}

// A variable declaration: binds `name` in the enclosing block.
export interface BundleDeclarationNode {
  "#": "declaration";
  keyword: "let" | "const";
  name: string;
  expression: BundleNode;
}

// An assignment to a resolved name (targets are always identifiers).
export interface BundleAssignmentNode {
  "#": "assignment";
  name: string;
  expression: BundleNode;
}

// An if statement; `alternate` is null when there is no else branch.
export interface BundleIfNode {
  "#": "if";
  condition: BundleNode;
  consequent: BundleNode;
  alternate: BundleNode | null;
}

// Returns the expression's value from the enclosing arrow.
export interface BundleReturnNode {
  "#": "return";
  expression: BundleNode;
}
