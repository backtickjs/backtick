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
  // as for an arrow nested inside a body. It takes one thunk parameter per
  // splice hole the script writes (named `$0`, `$1`, …); the body invokes the
  // thunk at the hole, passing the entry-scoped bindings in scope there — a
  // spliced fragment sees the bindings in scope at its hole.
  //
  // Nothing a call site supplies is inlined, so an entry's shape and body are
  // a function of its script's source: the same script compiles to the same
  // entry in every bundle it appears in.
  //
  // Whatever an entry captures arrives after those, in a single object
  // parameter named `$env`, omitted when it captures nothing. The body reads
  // a capture as a property of it — `$env.count` — so a read says where the
  // value came from, and adding a capture shifts no position. A cell sits
  // under its own `#s<n>` key, which can't collide with a variable because
  // `#` is not an identifier character.
  //
  // The keys are source names, which is sound because an entry's captures are
  // its free variables: within one script a name resolves outward to exactly
  // one binding, so two captures can never want the same key. What makes the
  // two sides line up is the emitter building the object — not, as when
  // captures were positional parameters, the fact that binding keys are
  // globally unique.
  //
  // A `BundleApplyFunction` targeting the entry passes arguments in that same
  // order: thunks first, then the environment.
  // A construction's expansion is also an entry — one per class, labeled
  // after the script entries — an arrow over the expansion's holes, applied
  // by its call site to the client arguments.
  functions: Record<FunctionLabel, BundleArrowNode>;
  trees: Record<TreeLabel, BundleTree>;
  root: BundleExpr;
}

// Plain JSON carrying itself. The `#` key is how a node is told from data, so
// data may not have one — the bundler refuses an object that does (see
// `lowerScriptBody`). Spelling that out here is what makes a malformed node a
// type error: without it every `#`-carrying object satisfies this member, and a
// node with the wrong fields quietly passes as data.
export interface BundleData<T> {
  readonly [key: string]: T | undefined;
  readonly "#"?: never;
}

export type FunctionLabel = string;
export type TreeLabel = string;

// A tree entry: a JSX tree as data. The element sits under an `element`
// wrapper so instance-scoped additions (per-instance state declarations) can
// land as sibling fields without reshaping the table. A tree is an implicit
// function of its slots: instantiating it supplies one value per
// `BundleGetSlot` index, exactly as calling a `functions` entry supplies its
// captures.
export interface BundleTree {
  // What this instance renders: the element, a reference to another instance
  // when this one is a component that renders a component, or null when it
  // renders nothing. A null-content entry is still an instance — it holds the
  // state its component declared, and a re-render may give it content — so an
  // interpreter instantiates it as usual and renders nothing for it.
  [NodeField.content]: BundleElement | BundleApplyTree | null;
  // The per-instance cells this entry declares, each named entry's value the
  // cell's initial. Instantiating allocates fresh storage for each, so two
  // instances never share a cell; a `BundleGetState` resolves against that
  // storage exactly as a `BundleGetSlot` resolves against the supplied slot
  // values.
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
  // The single letters are spent. These cost a byte more each, which is the
  // right way round: a `for` header is rare next to an identifier or a call.
  init: "aa",
  update: "ab",
} as const;

// Every node kind, as the number `"#"` carries. A number rather than a name
// because a bundle is mostly nodes, and `"identifier"` costs twelve bytes on
// each — 18% of an uncompressed payload across the fixtures.
//
// Two groups: this format's own from 0, JavaScript's from 1000. So `kind <
// 1000` is the test for "a node only this format defines"; the rest an
// implementer dispatches as the JavaScript they mirror. The wide gap lets
// either group grow without renumbering, at four digits per JavaScript node
// (+2111 bytes raw across the fixtures, +165 gzipped).
//
// Append within a group; never renumber. A reader implements the numbers it
// knows, so a moved value silently misparses every bundle already written.
// `renderBundleDebug` maps a number back to its name.
export const NodeKind = {
  // A `get` resolves something already in reach: this instance's slots and
  // state, or a row of either table. An `apply` runs a row — for a tree, that
  // means instantiating it. The kind names the table, so a label is only an
  // index into it.
  Element: 0,
  GetSlot: 1,
  GetState: 2,
  GetTree: 3,
  GetFunction: 4,
  ApplyTree: 5,
  ApplyFunction: 6,
  Thunk: 7,

  // Mirrors of JavaScript, with two differences: no truthiness — a condition
  // and the operands of `&&`/`||` are boolean — and `null` as the only absent
  // value.
  Identifier: 1000,
  Call: 1001,
  Property: 1002,
  Binop: 1003,
  Ternary: 1004,
  Arrow: 1005,
  Block: 1006,
  Declaration: 1007,
  Assignment: 1008,
  If: 1009,
  Return: 1010,
  Throw: 1011,
  Try: 1012,
  While: 1013,
  For: 1014,
  Break: 1015,
  Continue: 1016,
  Index: 1017,
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
export interface BundleGetSlot {
  "#": typeof NodeKind.GetSlot;
  [NodeField.index]: number;
}

// A cell declared by the enclosing tree entry's `state`: resolves to the handle
// for this instance's storage — an object with `read()`, `write(value)` and
// `update(updater)`. It resolves to the handle, not the value — reading is one
// of three things the handle does. Like a `BundleGetSlot` it means nothing
// outside the entry that declares it, and nothing outside a single instance.
//
// A cell reaches a function entry as an ordinary argument, so a body never
// carries this node: the entry takes the handle as a parameter and reads it by
// name. That keeps bodies lexically scoped — a shared entry can't resolve a free
// name differently per call site.
export interface BundleGetState {
  "#": typeof NodeKind.GetState;
  [NodeField.name]: string;
}

// Instantiates a `trees` entry: `args` supplies the tree's slots in index
// order, and `key` identifies the instance among its siblings so it survives a
// re-render that reorders them. Only a tree can be keyed — only a tree has
// state to keep.
//
// An instance persists across its parent's re-renders, named by this node and by
// which evaluation of it it was: the first evaluation of a node finds the first
// instance again, the second finds the second. The node alone is not enough,
// because a node inside a loop is evaluated once per iteration, and naming them
// all the same would give every iteration one shared instance. Positional, so
// reordering a list moves state between rows — which is what `key` overrides. (Applying names a table row by label; a body `call` evaluates
// a `callee` node instead, so the two are separate kinds.)
export interface BundleApplyTree {
  "#": typeof NodeKind.ApplyTree;
  [NodeField.label]: TreeLabel;
  [NodeField.args]?: BundleExpr[];
  [NodeField.key]?: BundleExpr;
}

// Applies a `functions` entry: `args` mirrors the entry's parameters — thunks
// for a polymorphic entry's splices first, then one value per capture.
export interface BundleApplyFunction {
  "#": typeof NodeKind.ApplyFunction;
  [NodeField.label]: FunctionLabel;
  [NodeField.args]?: BundleExpr[];
}

export type BundleApply = BundleApplyTree | BundleApplyFunction;

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
// What a tree position holds: composition, not computation. Slots and cells,
// instantiation, elements, and plain data — a reader walks it without needing to
// evaluate anything, until it meets an `applyFunction`, which is exactly where
// computation begins.
//
// `getFunction` is here because naming an entry is not computing with one. A
// hole that hands its thunk nothing calls it with no arguments, so a fragment
// that is one parameterless entry already *is* that function, and wrapping it in
// a thunk would say the same thing twice. Nothing else from the body grammar
// belongs: `property` and `call` would let a tree expression destructure and
// invoke, and the boundary above is the thing worth keeping.
export type BundleExpr =
  | null
  | boolean
  | number
  | string
  | BundleExpr[]
  | BundleGetSlot
  | BundleGetState
  | BundleIdentifierNode
  | BundleGetFunction
  | BundleApply
  | BundleThunk
  | BundleElement
  | BundleData<BundleExpr>;

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
  | BundleData<BundleExpressionNode>
  | BundleIdentifierNode
  | BundleGetEntry
  | BundleCallNode
  | BundlePropertyNode
  | BundleIndexNode
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
  | BundleWhileNode
  | BundleForNode
  | BundleBreakNode
  | BundleContinueNode
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

// An entry as a value, not applied: the function it evaluates to. Calling that
// applies the entry; passed bare it is already a nullary thunk. A tree entry's
// function takes its slots and yields the instantiated element.
export interface BundleGetFunction {
  "#": typeof NodeKind.GetFunction;
  [NodeField.label]: FunctionLabel;
}

export interface BundleGetTree {
  "#": typeof NodeKind.GetTree;
  [NodeField.label]: TreeLabel;
}

export type BundleGetEntry = BundleGetFunction | BundleGetTree;

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

// A dynamic read: `object[key]`, where the key is an expression rather than a
// name. Reading is total, so a reader never faults: an array takes a whole
// number in range and yields that element; an object takes a string and yields
// the member it holds under it, its own and not one inherited. Anything else —
// a key of the wrong type, a negative or fractional index, one past the end, a
// member the object hasn't got, a target that is neither — reads as null.
//
// The typechecker is stricter than that, naming the element type for an
// in-range read the way TypeScript itself does, so the null is a runtime floor
// rather than something every read has to answer for.
export interface BundleIndexNode {
  "#": typeof NodeKind.Index;
  [NodeField.object]: BundleExpressionNode;
  [NodeField.index]: BundleExpressionNode;
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

// `while (c) { … }`. The condition is boolean, as every condition is: there is
// no truthiness to fall back on. A `return` in the body returns from the
// enclosing arrow.
export interface BundleWhileNode {
  "#": typeof NodeKind.While;
  [NodeField.condition]: BundleExpressionNode;
  [NodeField.body]: BundleStatementNode;
}

// `for (init; condition; update) { … }`. Each header part is null when the
// source omitted it, and an absent condition never ends the loop by itself.
//
// Two rules a reader has to implement, both of them what JavaScript does:
// a binding the initializer declares lives in a scope of the loop's own, gone
// once the loop is; and each turn gets its own copy of that scope, made from
// the last turn's values before the update runs — so an arrow built in one turn
// keeps that turn's numbers rather than the value the loop stopped at.
export interface BundleForNode {
  "#": typeof NodeKind.For;
  [NodeField.init]: BundleStatementNode | null;
  [NodeField.condition]: BundleExpressionNode | null;
  [NodeField.update]: BundleStatementNode | null;
  [NodeField.body]: BundleStatementNode;
}

// `break` and `continue`, which the nearest enclosing loop catches: one ends
// it, the other starts its next turn — after a `for`'s update, never skipping
// it. Neither takes a label, so neither can name a loop further out.
export interface BundleBreakNode {
  "#": typeof NodeKind.Break;
}

export interface BundleContinueNode {
  "#": typeof NodeKind.Continue;
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
