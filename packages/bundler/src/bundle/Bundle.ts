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

// A node's kind is the word at position 0, written where the node is rather
// than looked up in a table. The words are `Ast.ts`'s, so a kind means the
// same thing on both sides of lowering — `binop` is `binop` whether the
// compiler wrote it or the bundler did. Four are the bundler's own, having no
// counterpart in the syntax: `el`, `fn`, `fn()`, and `bltn`, which the
// compiler also names.
//
// Never respell one. A reader implements the words it knows, so a changed
// spelling silently misparses every bundle already written.

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
//
// What an id means is the client's, with one exception the language names:
// `for` draws one thing per member of the array its `each` prop holds. Its
// children slot is applied per member rather than drawn once — to the member
// and to the position it now sits at, which arrives as storage rather than a
// number, because a member moves without changing. The client walks
// the array — it keeps what a member still there drew, drops what a departed
// one drew, and draws only what is new — so identity is the member's own and
// nothing here extracts a key. A kind of its own once, which said the same
// thing in a number a reader had to know instead of a name a schema declares.
export type BundleElement = [
  kind: "el",
  id: string,
  // What the bundler writes here is composition rather than computation — data,
  // an element, or an entry applied. Nothing in the type says so.
  props: { [prop: string]: BundleExpressionNode },
  // What the element draws inside itself, in its own slot rather than under a
  // prop named `children`. A slot because that is what the rest of this format
  // is: a reader takes children by position, where a reserved key has to be
  // looked up by name and kept out of the props every other reader walks.
  //
  // `null` is no children, which a child evaluating to `null` also draws —
  // nothing either way, so the two need not be told apart.
  children: BundleExpressionNode,
];

// Applies an entry, named by label. A `call` evaluates a callee node instead,
// which is why the two are separate kinds.
//
// Shorthand, exactly, for a `call` of a `get` of this label, and it must stay
// equivalent to one. Spelled as a single node because applying is most of what
// a bundle does: written the long way, the fixtures measure ~5% larger.
export type BundleApplyFunction = [
  kind: "fn()",
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
export type BundleArrayLiteralExpressionNode = [
  kind: "arr",
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
  kind: "...",
  expression: BundleExpressionNode,
];

// A global reached by name. What `Math` is, is the host's to answer — which is
// the point: a bundle that carried JavaScript's would be carrying JavaScript.
// What the format fixes is which members exist and what each one means.
export type BundleBuiltinNode = [kind: "bltn", name: string];

export type BundleArrayElement = BundleExpressionNode | BundleSpreadElementNode;

// An object literal a spread runs through, which cannot ship as the data an
// object literal usually is: an object in a value slot *is* its own keys and
// the format reserves none of them, so there is nowhere to write "and every key
// of that one". A node says it instead — and only where a spread appears. A
// literal without one is still plain data, so nothing already written changes.
export type BundleObjectLiteralExpressionNode = [
  kind: "obj",
  entries: BundleObjectEntry[],
];

// A pair, or a spread. `null` in the name slot is a spread of the value beside
// it — a name no property can have — so the two are told apart by a slot rather
// than by the shape of what is in it.
export type BundleObjectEntry = [
  name: string | null,
  value: BundleExpressionNode,
];

export type BundleExpressionNode =
  | null
  | boolean
  | number
  | string
  | BundleData
  | BundleArrayLiteralExpressionNode
  | BundleIdentifierNode
  | BundleGetFunction
  // A body instantiates a tree by calling a `getTree`, which says nothing about
  // identity. Applying says both: which entry, and which of its siblings this
  // one is — so a row a script builds can be named the way a row written in
  // tree position can.
  | BundleApplyFunction
  // What a tree entry's body yields, and so what a `return` in one may hold.
  | BundleElement
  | BundleCallNode
  | BundlePropertyAccessNode
  | BundleElementAccessExpressionNode
  | BundleBinaryNode
  | BundleUnaryNode
  | BundleConditionalExpressionNode
  | BundleArrowFunctionNode
  | BundleObjectLiteralExpressionNode
  | BundleBuiltinNode;

// A body node a block runs in order: control flow, bindings, or an
// expression evaluated for its effect.
export type BundleStatementNode =
  | BundleExpressionNode
  | BundleBlockNode
  | BundleDeclarationNode
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
  kind: "id",
  text: string,
];

// An entry as a value, not applied: the function it evaluates to. Calling that
// applies the entry; passed bare it is already a nullary thunk.
//
// Only a `functions` entry can be named this way. A tree is applied, which an
// `ApplyTree` says on its own, so there is nothing for a tree to be named as.
export type BundleGetFunction = [
  kind: "fn",
  label: FunctionLabel,
];

// A call: evaluates the callee to a function and applies it. When the callee
// is an `entry` node targeting a function, `args` mirrors that entry's
// parameters (thunks for a polymorphic entry's splices first, then one value
// per capture); targeting a tree, `args` supplies its parameters in order.
//
// `?.()` is the same call that short-circuits: a null callee yields null — the
// language's absent value; `undefined` never arises — and the arguments are
// not evaluated. Two kinds rather than one with a flag, so what a node does is
// what it is.
export type BundleCallExpressionNode = [
  kind: "()",
  expression: BundleExpressionNode,
  args: BundleArrayElement[],
];

export type BundleOptionalCallExpressionNode = [
  kind: "?.()",
  expression: BundleExpressionNode,
  args: BundleArrayElement[],
];

export type BundleCallNode =
  | BundleCallExpressionNode
  | BundleOptionalCallExpressionNode;

// A static property access: `object.name`. Reading an absent member yields
// null, the same family as a missing argument binding null.
//
// `?.` is the same access that short-circuits: a null object yields null
// instead of reading. As a call's callee it short-circuits the call too — a
// null object yields null and the arguments are not evaluated.
export type BundlePropertyAccessExpressionNode = [
  kind: ".",
  expression: BundleExpressionNode,
  name: string,
];

export type BundleOptionalPropertyAccessExpressionNode = [
  kind: "?.",
  expression: BundleExpressionNode,
  name: string,
];

export type BundlePropertyAccessNode =
  | BundlePropertyAccessExpressionNode
  | BundleOptionalPropertyAccessExpressionNode;

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
  kind: "[]",
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
// TypeScript — see `BundleAssignmentNode`, which is the one of the fifteen
// whose left is a name to bind rather than a value to read.
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

// One node per operator, and the operator is the kind: a `+` node adds, which
// is a thing to know from position 0 alone rather than from a slot after it.
// Written out one by one rather than stamped from a generic, so a reader of
// the format reads the format and not a type-level abbreviation of it.

// `=` assigns, and its left is always an identifier: nothing else in this
// language can be assigned to. It is the one that binds its left rather than
// evaluating it — evaluating first would read a variable where a name was
// meant — and the one whose slots are named for what they hold.
export type BundleAssignmentNode = [
  kind: "=",
  target: BundleIdentifierNode,
  value: BundleExpressionNode,
];

// Short-circuiting. `&&` and `||` take booleans and yield one — there is no
// truthiness to reduce. `??` asks whether a value is absent, so either side
// may be anything.
export type BundleLogicalAndNode = [
  kind: "&&",
  left: BundleExpressionNode,
  right: BundleExpressionNode,
];

export type BundleLogicalOrNode = [
  kind: "||",
  left: BundleExpressionNode,
  right: BundleExpressionNode,
];

export type BundleNullishCoalescingNode = [
  kind: "??",
  left: BundleExpressionNode,
  right: BundleExpressionNode,
];

// Arithmetic. `+` adds two numbers or concatenates where either side is a
// string; the rest take numbers.
export type BundleAdditionNode = [
  kind: "+",
  left: BundleExpressionNode,
  right: BundleExpressionNode,
];

export type BundleSubtractionNode = [
  kind: "-",
  left: BundleExpressionNode,
  right: BundleExpressionNode,
];

export type BundleMultiplicationNode = [
  kind: "*",
  left: BundleExpressionNode,
  right: BundleExpressionNode,
];

export type BundleDivisionNode = [
  kind: "/",
  left: BundleExpressionNode,
  right: BundleExpressionNode,
];

export type BundleRemainderNode = [
  kind: "%",
  left: BundleExpressionNode,
  right: BundleExpressionNode,
];

// Identity: the same primitive or the same object, never a deep walk and
// never a coercion.
export type BundleStrictEqualityNode = [
  kind: "===",
  left: BundleExpressionNode,
  right: BundleExpressionNode,
];

export type BundleStrictInequalityNode = [
  kind: "!==",
  left: BundleExpressionNode,
  right: BundleExpressionNode,
];

// Ordering. Two strings compare as text, two numbers as numbers, and
// nothing orders against `NaN`.
export type BundleLessThanNode = [
  kind: "<",
  left: BundleExpressionNode,
  right: BundleExpressionNode,
];

export type BundleLessThanOrEqualNode = [
  kind: "<=",
  left: BundleExpressionNode,
  right: BundleExpressionNode,
];

export type BundleGreaterThanNode = [
  kind: ">",
  left: BundleExpressionNode,
  right: BundleExpressionNode,
];

export type BundleGreaterThanOrEqualNode = [
  kind: ">=",
  left: BundleExpressionNode,
  right: BundleExpressionNode,
];

export type BundleBinaryNode =
  | BundleAssignmentNode
  | BundleLogicalAndNode
  | BundleLogicalOrNode
  | BundleNullishCoalescingNode
  | BundleAdditionNode
  | BundleSubtractionNode
  | BundleMultiplicationNode
  | BundleDivisionNode
  | BundleRemainderNode
  | BundleStrictEqualityNode
  | BundleStrictInequalityNode
  | BundleLessThanNode
  | BundleLessThanOrEqualNode
  | BundleGreaterThanNode
  | BundleGreaterThanOrEqualNode;

// One node per prefix operator, as the binary ones are.
//
// `!x` negates a boolean: its operand is boolean, as every tested position is,
// so it does not decide what counts as true. `-x` negates a number.
//
// `-x` and not `-`, because `-` is already what a subtraction is called, and a
// kind that meant two nodes would have to be told apart by counting slots —
// which is the one thing position 0 is here to spare a reader. A negative
// literal is not written either way: it carries itself, like every other
// literal on the wire, so this node means an operator applied to something
// computed.
export type BundleLogicalNotNode = [
  kind: "!",
  operand: BundleExpressionNode,
];

export type BundleNegationNode = [kind: "-x", operand: BundleExpressionNode];

export type BundleUnaryNode = BundleLogicalNotNode | BundleNegationNode;

// A ternary: `condition ? consequent : alternate`. The condition is boolean
// — the typechecker requires it, no truthiness — and only the taken
// branch evaluates (the other branch's effects are skipped).
export type BundleConditionalExpressionNode = [
  kind: "?:",
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
  kind: "=>",
  parameters: BundleParameterNode[],
  body: BundleBody,
];

// A statement block: executes statements in order; a `return` yields the
// enclosing arrow's result. Declarations are hoisted to the block, matching
// the compiler's scoping (a use before its declaration resolves to the
// local).
export type BundleBlockNode = [
  kind: "{}",
  statements: BundleStatementNode[],
];

// A variable declaration: binds `name` in the enclosing block.
export type BundleConstDeclarationNode = [
  kind: "const",
  name: string,
  initializer: BundleExpressionNode,
];

export type BundleLetDeclarationNode = [
  kind: "let",
  name: string,
  initializer: BundleExpressionNode,
];

export type BundleDeclarationNode =
  | BundleConstDeclarationNode
  | BundleLetDeclarationNode;

// An if statement; `elseStatement` is null when there is no else branch. The
// condition is boolean — the typechecker rejects a non-boolean condition, so a
// client tests it directly, without truthiness rules.
export type BundleIfStatementNode = [
  kind: "if",
  expression: BundleExpressionNode,
  thenStatement: BundleStatementNode,
  elseStatement: BundleStatementNode | null,
];

// `while (c) { … }`. The condition is boolean, as every condition is: there is
// no truthiness to fall back on. A `return` in the body returns from the
// enclosing arrow.
export type BundleWhileStatementNode = [
  kind: "while",
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
  kind: "for",
  initializer: BundleStatementNode | null,
  condition: BundleExpressionNode | null,
  incrementor: BundleStatementNode | null,
  statement: BundleStatementNode,
];

// `break` and `continue`, which the nearest enclosing loop catches: one ends
// it, the other starts its next turn — after a `for`'s update, never skipping
// it. Neither takes a label, so neither can name a loop further out.
export type BundleBreakStatementNode = [kind: "break"];

export type BundleContinueStatementNode = [
  kind: "continue",
];

// Returns the expression's value from the enclosing arrow.
export type BundleReturnStatementNode = [
  kind: "return",
  expression: BundleExpressionNode,
];

// Throws the expression's value, with JavaScript `throw` semantics: the value
// is thrown as-is (`throw "message"` throws the string itself).
export type BundleThrowStatementNode = [
  kind: "throw",
  expression: BundleExpressionNode,
];

// A try statement: executes `tryBlock`; when it throws, its `catchClause`
// takes over. There is no `finallyBlock` — the compiler rejects `finally` —
// and the clause is never absent, since a `try` with nothing to catch it
// would be the statement it wraps.
export type BundleTryStatementNode = [
  kind: "try",
  tryBlock: BundleBlockNode,
  catchClause: BundleCatchClauseNode,
];

// `catch (e) { … }`: binds the thrown value and runs `block`, the binding
// scoping over that block alone. `variableDeclaration` is the name it binds,
// or null for a bindingless `catch` — TypeScript holds a declaration node
// there, where the name is all this format needs, since a catch binding has no
// initializer and no keyword to carry.
export type BundleCatchClauseNode = [
  kind: "catch",
  variableDeclaration: string | null,
  block: BundleBlockNode,
];

// A parameter, as `ts.ParameterDeclaration` is — the kind TypeScript calls
// `Parameter`. It carries the name it binds and nothing else: a default, a
// type, a rest token and modifiers are each rejected by the compiler, so there
// is nothing left for the node to say.
export type BundleParameterNode = [
  kind: "param",
  name: string,
];
