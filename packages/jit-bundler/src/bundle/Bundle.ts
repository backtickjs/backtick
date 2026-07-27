// The bundle: the JIT bundler's wire format, as plain data — what ships is
// exactly `JSON.stringify` of this. These types are the contract an
// interpreter implements: evaluate `root` against the `functions` and `trees`
// tables. Computation ships as `BundleNode` ASTs (no JavaScript parsing
// required), composition as data (a tree and the root are `BundleExpr`
// values), so the whole bundle is parseable and inspectable as JSON.
//
// Two guarantees an interpreter may rely on, and must uphold:
//
// `undefined` never arises in evaluation — `null` is the language's only
// absent value. The closed set of rules that makes it so:
//   - a missing argument binds `null` (parameters are otherwise required:
//     compiled call sites always pass every argument);
//   - `?.` on a null receiver yields `null` — for a call, the arguments
//     unevaluated;
//   - reading an absent property yields `null`;
//   - an arrow body that completes without `return` completes with `null`;
//   - a capture is a value, never a variable: a nested script reads its
//     captures but can't assign them.
//
// An empty container is omitted rather than spelled out: a node carries `args`,
// `params`, `statements` or `props` only when it has some. Absent means empty,
// everywhere, so a client reads them the same way each time. A spliced empty
// array or object is untouched — that is data the client asked for.
//
// Evaluation is effect-free and deterministic: materializing the root, a
// tree, or any entry a data position references runs no effects — an
// action never ships as data — so re-evaluating any value is unobservable.
// This is the caching license: an interpreter may cache, re-run, or share
// evaluations freely. Effects happen only when the client itself invokes a
// function value it holds.
export interface Bundle {
  // Each entry is an arrow node — evaluating it yields a function, exactly
  // as for an arrow nested inside a body. A monomorphic entry (one call
  // site, or identical arguments everywhere) has its splice arguments
  // inlined into the body and takes only its captures as parameters. A
  // polymorphic entry additionally takes one thunk parameter per splice
  // hole (named `$0`, `$1`, …), ahead of its captures; the body invokes the
  // thunk at the hole, passing the entry-scoped bindings the splice
  // captures — a spliced fragment sees the bindings in scope at its hole. A
  // `BundleApply` targeting the entry passes arguments in that same order.
  // A construction's expansion is also an entry — one per class, labeled
  // after the script entries — an arrow over the expansion's holes, applied
  // by its call site to the client arguments.
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
  // What this instance renders: the element, a reference to another instance
  // when this one is a component that renders a component, or null when it
  // renders nothing. A null-content entry is still an instance — it holds the
  // state its component declared, and a re-render may give it content — so an
  // interpreter instantiates it as usual and renders nothing for it.
  [NodeField.content]: BundleElement | BundleApply | null;
  // The per-instance cells this entry declares, each named entry's value the
  // cell's initial. Instantiating allocates fresh storage for each, so two
  // instances never share a cell; a `BundleCell` resolves against that storage
  // exactly as a `BundleSlot` resolves against the supplied slot values.
  // Additive: an interpreter that ignores it renders a tree with no state.
  [NodeField.state]?: { [name: string]: BundleExpr };
}

// Every field name, as the single character it carries on the wire. A node's
// shape is read far more often than it is written, and the long names cost more
// than the values in most of them.
//
// The letters are positional: the nth field here takes the nth letter. They are
// not mnemonics — half of these names begin with the same letter, so any
// attempt at one ends in `p` for `params` and something invented for `param`.
// A rule that can be checked by reading down the column beats a rule that holds
// for two thirds of the rows.
//
// Written as `[NodeField.operator]` rather than `m` so the declarations below
// still say what each field is: the name lives here once, and nothing else has
// to know its letter. Append to add a field; never reassign one, and never
// reorder — a letter that moves silently misreads every bundle already written.
export const NodeField = {
  id: "a",
  key: "b",
  props: "c",
  index: "d",
  name: "e",
  label: "f",
  args: "g",
  params: "h",
  expression: "i",
  callee: "j",
  object: "k",
  optional: "l",
  operator: "m",
  left: "n",
  right: "o",
  condition: "p",
  consequent: "q",
  alternate: "r",
  body: "s",
  statements: "t",
  keyword: "u",
  block: "v",
  handler: "w",
  param: "x",
  content: "y",
  state: "z",
} as const;

// Every node kind, as the number `"#"` carries. Numbers rather than names
// because a bundle is read far more often than it is written, and `"identifier"`
// costs twelve bytes on every one of them — 18% of an uncompressed payload
// across the fixtures.
//
// Append to add a kind; never renumber. A reader implements the numbers it
// knows, so a value moving means every bundle it ever read was misparsed. The
// names here are for people — a bundle carries only the number, and
// `renderBundleDebug` maps it back.
export const NodeKind = {
  Apply: 0,
  Arrow: 1,
  Assignment: 2,
  Binop: 3,
  Block: 4,
  Call: 5,
  Cell: 6,
  Declaration: 7,
  Element: 8,
  Entry: 9,
  Identifier: 10,
  If: 11,
  Property: 12,
  Return: 13,
  Slot: 14,
  Ternary: 15,
  Throw: 16,
  Thunk: 17,
  Try: 18,
} as const;

export type NodeKind = (typeof NodeKind)[keyof typeof NodeKind];

// A JSX element node: static structure carried as data, each prop a
// `BundleExpr` evaluated against the enclosing tree's slots.
export interface BundleElement {
  "#": typeof NodeKind.Element;
  [NodeField.id]: string;
  [NodeField.key]?: BundleExpr;
  [NodeField.props]?: { [prop: string]: BundleExpr };
}

// The enclosing tree's n-th slot: resolves to the value supplied for that
// position when the tree was instantiated.
export interface BundleSlot {
  "#": typeof NodeKind.Slot;
  [NodeField.index]: number;
}

// A cell declared by the enclosing tree entry's `state`: resolves to the handle
// for this instance's storage — an object with `read()`, `write(value)` and
// `update(updater)`. Like a `BundleSlot` it means nothing outside the entry that
// declares it, and nothing outside a single instance.
//
// A cell reaches a function entry as an ordinary argument, so a body never
// carries this node: the entry takes the handle as a parameter and reads it by
// name. That keeps bodies lexically scoped — a shared entry can't resolve a free
// name differently per call site.
export interface BundleCell {
  "#": typeof NodeKind.Cell;
  [NodeField.name]: string;
}

// Applies a `functions` or `trees` entry. For a function target, `args`
// mirrors the entry's parameters: thunks for a polymorphic entry's splices
// first, then one value per capture. For a tree target, `args` supplies the
// tree's slots in index order. (Named `apply` on the wire: a body's `call`
// node has a different schema — it evaluates a `callee` node — while this
// form targets a table entry by label.)
export interface BundleApply {
  "#": typeof NodeKind.Apply;
  [NodeField.label]: FunctionLabel | TreeLabel;
  [NodeField.args]?: BundleExpr[];
  [NodeField.key]?: BundleExpr;
}

// A splice argument passed to a polymorphic entry, evaluated lazily: the
// interpreter passes it as a function yielding the expression's value, so
// the hole evaluates it exactly like an inlined splice. `params` — present
// when the splice captures bindings the entry itself declares — names the
// values the hole call supplies; an `identifier` in the expression resolves
// against the enclosing thunk parameters, exactly like a body identifier.
export interface BundleThunk {
  "#": typeof NodeKind.Thunk;
  [NodeField.params]?: string[];
  [NodeField.expression]: BundleExpr;
}

// A bundle expression: what a tree entry and the root are made of. Plain JSON
// carries itself; the `#`-discriminated nodes compose. `#` is the
// bundle's one reserved key — a plain data object never uses it (bundling
// rejects it), so the node reading is unambiguous.
export type BundleExpr =
  | null
  | boolean
  | number
  | string
  | BundleExpr[]
  | BundleSlot
  | BundleCell
  | BundleIdentifierNode
  | BundleApply
  | BundleThunk
  | BundleElement
  | { [key: string]: BundleExpr };

// A node of a function body's AST, discriminated by `#` — a reserved key
// like the tagged expression forms, so a node can never be confused with
// user data anywhere in the bundle. Bodies carry data exactly as tree
// expressions do: plain JSON carries itself — a source literal or spliced
// runtime data serializes as the JSON it spells — and every composing form
// is a `#`-discriminated node. Scoping is lexical and names are
// pre-resolved: identifiers refer to parameters of an enclosing arrow
// (including the entry itself) or locals declared in an enclosing block.
// There are no globals — every name is bound, and an unresolved name is a
// malformed bundle.
export type BundleNode = BundleStatementNode;

// A body node that yields a value. Plain JSON carries itself; containers
// recurse as expressions — a spliced runtime array can hold entry calls —
// so a `#`-less object is the data it spells, never a node.
export type BundleExpressionNode =
  | null
  | boolean
  | number
  | string
  | BundleExpressionNode[]
  | { [key: string]: BundleExpressionNode }
  | BundleIdentifierNode
  | BundleEntryNode
  | BundleCallNode
  | BundlePropertyNode
  | BundleBinopNode
  | BundleTernaryNode
  | BundleArrowNode;

// A body node a block runs in order: control flow, bindings, or an
// expression evaluated for its effect.
export type BundleStatementNode =
  | BundleExpressionNode
  | BundleBlockNode
  | BundleDeclarationNode
  | BundleAssignmentNode
  | BundleIfNode
  | BundleReturnNode
  | BundleThrowNode
  | BundleTryNode;

// The body of an arrow: a block, or an expression whose value is implicitly
// returned.
export type BundleBody = BundleExpressionNode | BundleBlockNode;

// A variable reference: resolves `name` in the enclosing scope. Every name
// is bound; an unresolved name is a malformed bundle.
export interface BundleIdentifierNode {
  "#": typeof NodeKind.Identifier;
  [NodeField.name]: string;
}

// A `functions` or `trees` entry as a value: the function the entry
// evaluates to. Calling it applies the entry; passed bare it is already a
// nullary thunk.
export interface BundleEntryNode {
  "#": typeof NodeKind.Entry;
  [NodeField.label]: FunctionLabel | TreeLabel;
}

// A call: evaluates the callee to a function and applies it. When the callee
// is an `entry` node targeting a function, `args` mirrors that entry's
// parameters (thunks for a polymorphic entry's splices first, then one value
// per capture); targeting a tree, `args` supplies the tree's slots in index
// order. When `optional` (`callee?.(…)`), a null callee yields null — the
// language's absent value; `undefined` never arises — and the arguments are
// not evaluated.
export interface BundleCallNode {
  "#": typeof NodeKind.Call;
  [NodeField.callee]: BundleExpressionNode;
  [NodeField.args]?: BundleExpressionNode[];
  [NodeField.optional]?: true;
}

// A static property access: `object.name`. When `optional` (`object?.name`),
// a null object yields null — the language's absent value; `undefined` never
// arises — instead of reading. Reading an absent member also yields null,
// the same family as a missing argument binding null. As a call's callee,
// an optional access also short-circuits the call: a null object yields
// null and the arguments are not evaluated.
export interface BundlePropertyNode {
  "#": typeof NodeKind.Property;
  [NodeField.object]: BundleExpressionNode;
  [NodeField.name]: string;
  [NodeField.optional]?: true;
}

// The closed set of binary operators, part of the wire contract: a client
// implements exactly these, with JavaScript semantics. The language has no
// truthiness: the typechecker requires both operands of `&&`/`||` to be
// boolean, so they always yield a boolean and a client tests the left
// operand directly — short-circuiting (skipping the right operand's
// effects) without ToBoolean rules. `??` short-circuits on null/undefined.
// The compiler rejects any other operator in a script.
export type BundleBinaryOperator =
  | "&&"
  | "||"
  | "??"
  | "+"
  | "-"
  | "*"
  | "/"
  | "%"
  | "==="
  | "!=="
  | "<"
  | "<="
  | ">"
  | ">=";

// A binary operation with JavaScript semantics for `operator`.
export interface BundleBinopNode {
  "#": typeof NodeKind.Binop;
  [NodeField.operator]: BundleBinaryOperator;
  [NodeField.left]: BundleExpressionNode;
  [NodeField.right]: BundleExpressionNode;
}

// A ternary: `condition ? consequent : alternate`. The condition is boolean
// — the typechecker requires it, no truthiness — and only the taken
// branch evaluates (the other branch's effects are skipped).
export interface BundleTernaryNode {
  "#": typeof NodeKind.Ternary;
  [NodeField.condition]: BundleExpressionNode;
  [NodeField.consequent]: BundleExpressionNode;
  [NodeField.alternate]: BundleExpressionNode;
}

// An arrow function: evaluates to a closure over the enclosing scope. The
// body is an expression node (implicit return) or a `block`. Every
// `functions` entry is an arrow node. Applying an arrow with fewer
// arguments than `params` binds the missing ones to null — the language's
// absent value; `undefined` never arises — which is how an omitted
// optional parameter reads as null.
export interface BundleArrowNode {
  "#": typeof NodeKind.Arrow;
  [NodeField.params]?: string[];
  [NodeField.body]: BundleBody;
}

// A statement block: executes statements in order; a `return` yields the
// enclosing arrow's result. Declarations are hoisted to the block, matching
// the compiler's scoping (a use before its declaration resolves to the
// local).
export interface BundleBlockNode {
  "#": typeof NodeKind.Block;
  [NodeField.statements]?: BundleStatementNode[];
}

// A variable declaration: binds `name` in the enclosing block.
export interface BundleDeclarationNode {
  "#": typeof NodeKind.Declaration;
  [NodeField.keyword]: "let" | "const";
  [NodeField.name]: string;
  [NodeField.expression]: BundleExpressionNode;
}

// An assignment to a resolved name (targets are always identifiers).
export interface BundleAssignmentNode {
  "#": typeof NodeKind.Assignment;
  [NodeField.name]: string;
  [NodeField.expression]: BundleExpressionNode;
}

// An if statement; `alternate` is null when there is no else branch. The
// condition is boolean — the typechecker rejects a non-boolean condition,
// so a client tests it directly, without truthiness rules.
export interface BundleIfNode {
  "#": typeof NodeKind.If;
  [NodeField.condition]: BundleExpressionNode;
  [NodeField.consequent]: BundleStatementNode;
  [NodeField.alternate]: BundleStatementNode | null;
}

// Returns the expression's value from the enclosing arrow.
export interface BundleReturnNode {
  "#": typeof NodeKind.Return;
  [NodeField.expression]: BundleExpressionNode;
}

// Throws the expression's value, with JavaScript `throw` semantics: the value
// is thrown as-is (`throw "message"` throws the string itself).
export interface BundleThrowNode {
  "#": typeof NodeKind.Throw;
  [NodeField.expression]: BundleExpressionNode;
}

// A try statement: executes `block`; when it throws, binds the thrown value
// to `param` (null for a bindingless `catch`) and executes `handler`. The
// binding scopes over the handler only. There is no `finally` — the compiler
// rejects it.
export interface BundleTryNode {
  "#": typeof NodeKind.Try;
  [NodeField.block]: BundleBlockNode;
  [NodeField.param]: string | null;
  [NodeField.handler]: BundleBlockNode;
}
