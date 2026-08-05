// The bundle: the JIT bundler's wire format, as plain data — what ships is
// exactly `JSON.stringify` of this. These types are the contract an
// interpreter implements: evaluate `root` against the `functions` table.
// Computation ships as ASTs, so nothing here needs a JavaScript parser.
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
// Every node carries every field it declares: `args`, `params`, `statements`
// and `props` are spelled empty rather than left out, and an absent `?.` is
// `false`. A node's arity is its kind's, so a reader takes a slot by position
// without first asking whether it is there.
//
// Evaluation is deterministic, and effect-free but for storage: applying an
// entry that draws allocates the storage its body binds, and a `state` node
// allocates one where it stands — so either, evaluated twice, is two. Every
// other node may be cached, re-run or shared freely.
export interface Bundle {
  // Every entry is an arrow: a script, a component, or a class's expansion.
  // Its parameters are an arrow per splice hole the script writes (`$0`, `$1`,
  // …) and then one per capture, which an application supplies in that order.
  //
  // Nothing a call site supplies is inlined, so an entry's shape is a function
  // of its source: the same script compiles to the same entry in every bundle.
  functions: Record<FunctionLabel, BundleFunction>;
  root: BundleExpressionNode;
}

// An entry: an arrow under a wrapper, so what the bundler works out about one
// has somewhere to land beside it rather than on it. Nothing does today, and
// the wrapper is what keeps adding something from moving the arrow.
export type BundleFunction = [
  // The arrow this entry is. An entry with nothing to evaluate is not written
  // at all.
  content: BundleArrowFunctionNode,
];

// Plain JSON carrying itself. A node is an array, so an object is the data it
// spells and nothing else — which is what positional nodes bought: the format
// reserves no key at all, and every key a host object holds passes through.
export interface BundleData {
  readonly [key: string]: BundleExpressionNode;
}

export type FunctionLabel = string;

// Every node kind, as the number position 0 carries. A number rather than a
// name because a bundle is mostly nodes, and `"identifier"` costs twelve bytes
// on each — 18% of an uncompressed payload across the fixtures.
//
// Two groups: this format's own from 0, JavaScript's from 1000. So `kind <
// 1000` is the test for "a node only this format defines"; the rest an
// implementer dispatches as the JavaScript they mirror. The gap lets either
// group grow without disturbing the other.
//
// Append within a group; never renumber. A reader implements the numbers it
// knows, so a moved value silently misparses every bundle already written.
// `renderBundleDebug` maps a number back to its name.
export const NodeKind = {
  // A `get` names an entry; an `apply` runs one, which for an entry that draws
  // means instantiating it.
  Element: 0,
  GetFunction: 1,
  ApplyFunction: 2,
  Builtin: 3,
  // A node is an array, so an array of data needs saying apart from one. Data
  // objects need no such wrapper, which is why only this one exists.
  DataArray: 4,
  State: 5,

  // Mirrors of JavaScript, with two differences: no truthiness — a condition
  // and the operands of `&&`/`||` are boolean — and `null` as the only absent
  // value.
  //
  // Every name is a `ts.SyntaxKind`, so a reader who knows that AST knows this
  // one. What a name can't carry is that the format is smaller than the
  // grammar: a literal is JSON carrying itself, and a declaration holds its own
  // `const`/`let` rather than the three nodes TypeScript spends on one.
  Identifier: 1000,
  CallExpression: 1001,
  PropertyAccessExpression: 1002,
  BinaryExpression: 1003,
  ConditionalExpression: 1004,
  ArrowFunction: 1005,
  Block: 1006,
  VariableDeclaration: 1007,
  IfStatement: 1008,
  ReturnStatement: 1009,
  ThrowStatement: 1010,
  TryStatement: 1011,
  WhileStatement: 1012,
  ForStatement: 1013,
  BreakStatement: 1014,
  ContinueStatement: 1015,
  ElementAccessExpression: 1016,
  CatchClause: 1017,
  Parameter: 1018,
  PrefixUnaryExpression: 1019,
  SpreadElement: 1020,
} as const;

export type NodeKind = (typeof NodeKind)[keyof typeof NodeKind];

// A node is its kind and then its fields, in the order the declarations below
// give them. Positional rather than named: a field name costs more than most of
// the values it names — 41% of an uncompressed payload across the fixtures, and
// 16% of a compressed one — and the names are what these declarations are for.
//
// Three rules follow, all of them contract:
//
//   - Append at the tail, and never reorder. A slot that moves silently
//     misreads every bundle already written, exactly as a renumbered kind does.
//   - Every slot is always written. Nothing is optional, so a reader takes a
//     field by position and never counts what came before it.
//   - A slot holding a list of nodes is known from the kind, never from the
//     value: a list and a node are both arrays, so `f(1005, g())`'s arguments
//     read as an arrow to anything going by shape. Every reader switches on the
//     kind first and is exhaustive over the declarations below, which is what
//     keeps that from being something a reader can get wrong.

// An element: structure as data, each prop evaluated in the enclosing entry's
// scope.
export type BundleElement = [
  kind: typeof NodeKind.Element,
  id: string,
  // What the bundler writes here is composition rather than computation — data,
  // an element, or an entry applied. Nothing in the type says so.
  props: { [prop: string]: BundleExpressionNode },
];

// Applies an entry, named by label. A `call` evaluates a callee node instead,
// which is why the two are separate kinds.
//
// Shorthand, exactly, for a `call` of a `get` of this label, and it must stay
// equivalent to one. Spelled as a single node because applying is most of what
// a bundle does: written the long way, the fixtures measure ~5% larger.
export type BundleApplyFunction = [
  kind: typeof NodeKind.ApplyFunction,
  label: FunctionLabel,
  // Mirrors the entry's parameters — for a script, an arrow per splice hole
  // first, then one value per capture.
  args: BundleExpressionNode[],
];

// An array of data, which is a node only so that it is not read as one: a
// spliced `[1, 2, 3]` and a node are both arrays, and the members are what the
// wrapper carries. An array in a slot the kind declares as a list — a call's
// arguments, a block's statements — needs no wrapper, since nothing is deciding
// there.
export type BundleDataArrayNode = [
  kind: typeof NodeKind.DataArray,
  members: BundleArrayElement[],
];

// A node of a function body's AST. Bodies carry data exactly as tree
// expressions do: plain JSON carries itself — a source literal or spliced
// runtime data serializes as the JSON it spells — and every composing form is a
// node. Scoping is lexical and names are pre-resolved: identifiers refer to
// parameters of an enclosing arrow (including the entry itself) or locals
// declared in an enclosing block. There are no globals — every name is bound,
// and an unresolved name is a malformed bundle.
export type BundleNode = BundleStatementNode;

// `...xs` where an element or an argument goes. Not a `BundleExpressionNode`:
// it has no value of its own, it contributes the members of one — so the two
// lists that admit it say so, and nothing else has to consider it.
export type BundleSpreadElementNode = [
  kind: typeof NodeKind.SpreadElement,
  expression: BundleExpressionNode,
];

// A global reached by name. What `Math` is, is the host's to answer — which is
// the point: a bundle that carried JavaScript's would be carrying JavaScript.
// What the format fixes is which members exist and what each one means.
export type BundleBuiltinNode = [kind: typeof NodeKind.Builtin, name: string];

// Storage, declared where this node stands. The one node that is not a function
// of what it reads: evaluating it twice is two storages, where every other
// expression may be re-run, cached or shared freely. A kind of its own for that
// reason — a call of a named global would say the opposite, since calling one
// twice is calling it twice.
export type BundleStateNode = [
  kind: typeof NodeKind.State,
  // Evaluated where the declaration is, once per storage it makes.
  initial: BundleExpressionNode,
];

export type BundleArrayElement = BundleExpressionNode | BundleSpreadElementNode;

export type BundleExpressionNode =
  | null
  | boolean
  | number
  | string
  | BundleData
  | BundleDataArrayNode
  | BundleIdentifierNode
  | BundleGetFunction
  // A body instantiates a tree by calling a `getTree`, which says nothing about
  // identity. Applying says both: which entry, and which of its siblings this
  // one is — so a row a script builds can be named the way a row written in
  // tree position can.
  | BundleApplyFunction
  // What a tree entry's body yields, and so what a `return` in one may hold.
  | BundleElement
  | BundleCallExpressionNode
  | BundlePropertyAccessExpressionNode
  | BundleElementAccessExpressionNode
  | BundleBinaryExpressionNode
  | BundlePrefixUnaryExpressionNode
  | BundleConditionalExpressionNode
  | BundleArrowFunctionNode
  | BundleBuiltinNode
  | BundleStateNode;

// A body node a block runs in order: control flow, bindings, or an
// expression evaluated for its effect.
export type BundleStatementNode =
  | BundleExpressionNode
  | BundleBlockNode
  | BundleVariableDeclarationNode
  | BundleIfStatementNode
  | BundleWhileStatementNode
  | BundleForStatementNode
  | BundleBreakStatementNode
  | BundleContinueStatementNode
  | BundleReturnStatementNode
  | BundleThrowStatementNode
  | BundleTryStatementNode;

// The body of an arrow: a block, or an expression whose value is implicitly
// returned.
export type BundleBody = BundleExpressionNode | BundleBlockNode;

// A variable reference: resolves `name` in the enclosing scope. Every name
// is bound; an unresolved name is a malformed bundle.
export type BundleIdentifierNode = [
  kind: typeof NodeKind.Identifier,
  text: string,
];

// An entry as a value, not applied: the function it evaluates to. Calling that
// applies the entry; passed bare it is already a nullary thunk.
//
// Only a `functions` entry can be named this way. A tree is applied, which an
// `ApplyTree` says on its own, so there is nothing for a tree to be named as.
export type BundleGetFunction = [
  kind: typeof NodeKind.GetFunction,
  label: FunctionLabel,
];

// A call: evaluates the callee to a function and applies it. When the callee
// is an `entry` node targeting a function, `args` mirrors that entry's
// parameters (thunks for a polymorphic entry's splices first, then one value
// per capture); targeting a tree, `args` supplies its parameters in order. When
// `questionDotToken` (`callee?.(…)`), a null callee yields null — the
// language's absent value; `undefined` never arises — and the arguments are
// not evaluated.
export type BundleCallExpressionNode = [
  kind: typeof NodeKind.CallExpression,
  expression: BundleExpressionNode,
  questionDotToken: boolean,
  args: BundleArrayElement[],
];

// A static property access: `object.name`. When `questionDotToken` (`object?.name`),
// a null object yields null — the language's absent value; `undefined` never
// arises — instead of reading. Reading an absent member also yields null,
// the same family as a missing argument binding null. As a call's callee,
// an optional access also short-circuits the call: a null object yields
// null and the arguments are not evaluated.
export type BundlePropertyAccessExpressionNode = [
  kind: typeof NodeKind.PropertyAccessExpression,
  expression: BundleExpressionNode,
  questionDotToken: boolean,
  name: string,
];

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
export type BundleElementAccessExpressionNode = [
  kind: typeof NodeKind.ElementAccessExpression,
  expression: BundleExpressionNode,
  argumentExpression: BundleExpressionNode,
];

// The closed set of binary operators, part of the wire contract: a client
// implements exactly these, with JavaScript semantics. The language has no
// truthiness: the typechecker requires both operands of `&&`/`||` to be
// boolean, so they always yield a boolean and a client tests the left
// operand directly — short-circuiting (skipping the right operand's
// effects) without ToBoolean rules. `??` short-circuits on null/undefined.
// The compiler rejects any other operator in a script.
//
// `=` is here because an assignment is a binary expression, as it is in
// TypeScript — see `BundleBinaryExpressionNode`. A script can't write one where a value
// is expected, but the format has no separate place to put it.
export type BundleBinaryOperator =
  | "="
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

// A binary operation with JavaScript semantics for `operatorToken` — which is
// the operator itself, where TypeScript holds a token node.
//
// `=` assigns, and its left is always an identifier: nothing else in this
// language can be assigned to. Reading the two apart is the reader's one
// obligation here — an `=` binds its left rather than evaluating it, and
// evaluating it first would read a variable where a name was meant. The
// operator is what says which of the two this is, and it leads for that reason,
// where TypeScript puts it between the operands.
export type BundleBinaryExpressionNode = [
  kind: typeof NodeKind.BinaryExpression,
  operatorToken: BundleBinaryOperator,
  left: BundleExpressionNode,
  right: BundleExpressionNode,
];

// The prefix operators, as `BundleBinaryOperator` is for the binary ones.
export type BundlePrefixUnaryOperator = "!" | "-";

// `!x` or `-x`. A `!` operand is boolean, as every tested position is, so it
// negates a value rather than deciding what counts as one; a `-` operand is a
// number. A negative literal is not written this way — it carries itself, like
// every other literal on the wire — so this node means an operator applied to
// something computed.
export type BundlePrefixUnaryExpressionNode = [
  kind: typeof NodeKind.PrefixUnaryExpression,
  operator: BundlePrefixUnaryOperator,
  operand: BundleExpressionNode,
];

// A ternary: `condition ? consequent : alternate`. The condition is boolean
// — the typechecker requires it, no truthiness — and only the taken
// branch evaluates (the other branch's effects are skipped).
export type BundleConditionalExpressionNode = [
  kind: typeof NodeKind.ConditionalExpression,
  condition: BundleExpressionNode,
  whenTrue: BundleExpressionNode,
  whenFalse: BundleExpressionNode,
];

// An arrow function: evaluates to a closure over the enclosing scope. The
// body is an expression node (implicit return) or a `block`. Every
// `functions` entry is an arrow node. Applying an arrow with fewer
// arguments than `params` binds the missing ones to null — the language's
// absent value; `undefined` never arises — which is how an omitted
// optional parameter reads as null.
export type BundleArrowFunctionNode = [
  kind: typeof NodeKind.ArrowFunction,
  parameters: BundleParameterNode[],
  body: BundleBody,
];

// A statement block: executes statements in order; a `return` yields the
// enclosing arrow's result. Declarations are hoisted to the block, matching
// the compiler's scoping (a use before its declaration resolves to the
// local).
export type BundleBlockNode = [
  kind: typeof NodeKind.Block,
  statements: BundleStatementNode[],
];

// A variable declaration: binds `name` in the enclosing block.
export type BundleVariableDeclarationNode = [
  kind: typeof NodeKind.VariableDeclaration,
  name: string,
  initializer: BundleExpressionNode,
  keyword: "let" | "const",
];

// An if statement; `elseStatement` is null when there is no else branch. The
// condition is boolean — the typechecker rejects a non-boolean condition, so a
// client tests it directly, without truthiness rules.
export type BundleIfStatementNode = [
  kind: typeof NodeKind.IfStatement,
  expression: BundleExpressionNode,
  thenStatement: BundleStatementNode,
  elseStatement: BundleStatementNode | null,
];

// `while (c) { … }`. The condition is boolean, as every condition is: there is
// no truthiness to fall back on. A `return` in the body returns from the
// enclosing arrow.
export type BundleWhileStatementNode = [
  kind: typeof NodeKind.WhileStatement,
  expression: BundleExpressionNode,
  statement: BundleStatementNode,
];

// `for (init; condition; update) { … }`. Each header part is null when the
// source omitted it, and an absent condition never ends the loop by itself.
//
// Two rules a reader has to implement, both of them what JavaScript does:
// a binding the initializer declares lives in a scope of the loop's own, gone
// once the loop is; and each turn gets its own copy of that scope, made from
// the last turn's values before the update runs — so an arrow built in one turn
// keeps that turn's numbers rather than the value the loop stopped at.
export type BundleForStatementNode = [
  kind: typeof NodeKind.ForStatement,
  initializer: BundleStatementNode | null,
  condition: BundleExpressionNode | null,
  incrementor: BundleStatementNode | null,
  statement: BundleStatementNode,
];

// `break` and `continue`, which the nearest enclosing loop catches: one ends
// it, the other starts its next turn — after a `for`'s update, never skipping
// it. Neither takes a label, so neither can name a loop further out.
export type BundleBreakStatementNode = [kind: typeof NodeKind.BreakStatement];

export type BundleContinueStatementNode = [
  kind: typeof NodeKind.ContinueStatement,
];

// Returns the expression's value from the enclosing arrow.
export type BundleReturnStatementNode = [
  kind: typeof NodeKind.ReturnStatement,
  expression: BundleExpressionNode,
];

// Throws the expression's value, with JavaScript `throw` semantics: the value
// is thrown as-is (`throw "message"` throws the string itself).
export type BundleThrowStatementNode = [
  kind: typeof NodeKind.ThrowStatement,
  expression: BundleExpressionNode,
];

// A try statement: executes `tryBlock`; when it throws, its `catchClause`
// takes over. There is no `finallyBlock` — the compiler rejects `finally` —
// and the clause is never absent, since a `try` with nothing to catch it
// would be the statement it wraps.
export type BundleTryStatementNode = [
  kind: typeof NodeKind.TryStatement,
  tryBlock: BundleBlockNode,
  catchClause: BundleCatchClauseNode,
];

// `catch (e) { … }`: binds the thrown value and runs `block`, the binding
// scoping over that block alone. `variableDeclaration` is the name it binds,
// or null for a bindingless `catch` — TypeScript holds a declaration node
// there, where the name is all this format needs, since a catch binding has no
// initializer and no keyword to carry.
export type BundleCatchClauseNode = [
  kind: typeof NodeKind.CatchClause,
  variableDeclaration: string | null,
  block: BundleBlockNode,
];

// A parameter, as `ts.ParameterDeclaration` is — the kind TypeScript calls
// `Parameter`. It carries the name it binds and nothing else: a default, a
// type, a rest token and modifiers are each rejected by the compiler, so there
// is nothing left for the node to say.
export type BundleParameterNode = [
  kind: typeof NodeKind.Parameter,
  name: string,
];
