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
  functions: Record<FunctionLabel, BundleArrowFunctionNode>;
  root: BundleExpressionNode;
}

// Plain JSON carrying itself. A node is an array, so the format reserves no
// key at all and every key a host object holds passes through.
export interface BundleData {
  readonly [key: string]: BundleExpressionNode;
}

export type FunctionLabel = string;

// A node's kind is the word at position 0. The words are `Ast.ts`'s, so a kind
// means the same thing on both sides of lowering. Four are the bundler's own:
// `el`, `fn`, `fn()`, and `bltn`.
//
// Never respell one. A reader implements the words it knows, so a changed
// spelling silently misparses every bundle already written.
//
// A node is its kind and then its fields, positionally, in the order the
// declarations below give them. Three rules follow, all of them contract:
//
//   - Append at the tail, and never reorder. A slot that moves silently
//     misreads every bundle already written.
//   - Every slot is always written. Nothing is optional, so a reader takes a
//     field by position and never counts what came before it.
//   - A slot holding a list of nodes is known from the kind, never from the
//     value: a list and a node are both arrays, so `f(1005, g())`'s arguments
//     read as an arrow to anything going by shape. Every reader switches on the
//     kind first and is exhaustive over the declarations below.

// An element: structure as data, each prop evaluated in the enclosing entry's
// scope.
//
// What an id means is the client's, with one exception the language names:
// `for` draws one thing per member of the array its `each` prop holds. Its
// children slot is applied per member rather than drawn once — to the member
// and to the position it now sits at, which arrives as storage rather than a
// number, because a member moves without changing. The client walks the array
// — it keeps what a member still there drew, drops what a departed one drew,
// and draws only what is new — so identity is the member's own and nothing
// here extracts a key.
export type BundleElement = [
  kind: "el",
  id: string,
  props: { [prop: string]: BundleExpressionNode },
  // A slot rather than a reserved `children` prop, so a reader takes children
  // by position and every other reader walks the props untouched.
  //
  // `null` is no children, which a child evaluating to `null` also draws —
  // nothing either way, so the two need not be told apart.
  children: BundleExpressionNode,
];

// Applies an entry, named by label. Shorthand, exactly, for a `call` of a `get`
// of this label, and it must stay equivalent to one. Spelled as a single node
// because applying is most of what a bundle does: written the long way, the
// fixtures measure ~5% larger.
export type BundleApplyFunction = [
  kind: "fn()",
  label: FunctionLabel,
  // Mirrors the entry's parameters — for a script, an arrow per splice hole
  // first, then one value per capture.
  args: BundleExpressionNode[],
];

// An array of data, which is a node only so that it is not read as one: a
// spliced `[1, 2, 3]` and a node are both arrays. An array in a slot the kind
// declares as a list needs no wrapper, since nothing is deciding there.
export type BundleArrayLiteralExpressionNode = [
  kind: "arr",
  members: BundleArrayElement[],
];

// Scoping is lexical and names are pre-resolved: identifiers refer to
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

// A global reached by name. What `Math` is, is the host's to answer — a bundle
// that carried JavaScript's would be carrying JavaScript. What the format
// fixes is which members exist and what each one means.
export type BundleBuiltinNode = [kind: "bltn", name: string];

export type BundleArrayElement = BundleExpressionNode | BundleSpreadElementNode;

// An object literal a spread runs through, which cannot ship as the data an
// object literal usually is: an object in a value slot *is* its own keys and
// the format reserves none of them, so there is nowhere to write "and every key
// of that one". A node says it instead — and only where a spread appears. A
// literal without one is still plain data.
export type BundleObjectLiteralExpressionNode = [
  kind: "obj",
  entries: BundleObjectEntry[],
];

// One key and what it holds. A node like any other, so the name sits behind
// the kind rather than in it: `...` is a name a property may have, and a name
// that had to be told from a spread by not being one would make `{ "...": 2 }`
// beside a spread mean the spread.
export type BundlePropertyAssignmentNode = [
  kind: ":",
  name: string,
  value: BundleExpressionNode,
];

// The spread is the same node an array holds, so "and every key of that one"
// is written the one way it is written everywhere.
export type BundleObjectEntry =
  | BundlePropertyAssignmentNode
  | BundleSpreadElementNode;

export type BundleExpressionNode =
  | null
  | boolean
  | number
  | string
  | BundleData
  | BundleArrayLiteralExpressionNode
  | BundleIdentifierNode
  | BundleGetFunction
  | BundleApplyFunction
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

export type BundleIdentifierNode = [kind: "id", text: string];

// An entry as a value, not applied: the function it evaluates to. Only a
// `functions` entry can be named this way.
export type BundleGetFunction = [kind: "fn", label: FunctionLabel];

// `?.()` is the same call that short-circuits: a null callee yields null and
// the arguments are not evaluated. Two kinds rather than one with a flag, so
// what a node does is what it is.
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

// Reading an absent member yields null, the same family as a missing argument
// binding null. `?.` short-circuits instead of reading; as a call's callee it
// short-circuits the call too.
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

// `object[key]`. Reading is total, so a reader never faults: an array takes a
// whole number in range and yields that element; an object takes a string and
// yields the member it holds under it, its own and not one inherited. Anything
// else — a key of the wrong type, a negative or fractional index, one past the
// end, a member the object hasn't got, a target that is neither — reads as
// null.
//
// The typechecker is stricter than that, naming the element type for an
// in-range read the way TypeScript itself does, so the null is a runtime floor
// rather than something every read has to answer for.
export type BundleElementAccessExpressionNode = [
  kind: "[]",
  expression: BundleExpressionNode,
  argumentExpression: BundleExpressionNode,
];

// One node per operator, and the operator is the kind: a `+` node adds, which
// is a thing to know from position 0 alone rather than from a slot after it.

// `=` binds its left rather than evaluating it — evaluating first would read a
// variable where a name was meant. An identifier is the only assignable thing
// in this language.
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

// `+` adds two numbers or concatenates where either side is a string; the rest
// take numbers.
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

// Two strings compare as text, two numbers as numbers, and nothing orders
// against `NaN`.
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

export type BundleLogicalNotNode = [kind: "!", operand: BundleExpressionNode];

export type BundleNegationNode = [kind: "-x", operand: BundleExpressionNode];

export type BundleUnaryNode = BundleLogicalNotNode | BundleNegationNode;

export type BundleConditionalExpressionNode = [
  kind: "?:",
  condition: BundleExpressionNode,
  whenTrue: BundleExpressionNode,
  whenFalse: BundleExpressionNode,
];

export type BundleArrowFunctionNode = [
  kind: "=>",
  parameters: BundleParameterNode[],
  body: BundleBody,
];

// Declarations are hoisted to the block, matching the compiler's scoping (a
// use before its declaration resolves to the local).
export type BundleBlockNode = [kind: "{}", statements: BundleStatementNode[]];

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

// `elseStatement` is null when there is no else branch. The condition is
// boolean, so a client tests it directly, without truthiness rules.
export type BundleIfStatementNode = [
  kind: "if",
  expression: BundleExpressionNode,
  thenStatement: BundleStatementNode,
  elseStatement: BundleStatementNode | null,
];

export type BundleWhileStatementNode = [
  kind: "while",
  expression: BundleExpressionNode,
  statement: BundleStatementNode,
];

// Each header part is null when the source omitted it, and an absent condition
// never ends the loop by itself.
//
// Two rules a reader has to implement, both of them what JavaScript does: a
// binding the initializer declares lives in a scope of the loop's own, gone
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

// The nearest enclosing loop catches both: one ends it, the other starts its
// next turn — after a `for`'s update, never skipping it. Neither takes a label.
export type BundleBreakStatementNode = [kind: "break"];

export type BundleContinueStatementNode = [kind: "continue"];

export type BundleReturnStatementNode = [
  kind: "return",
  expression: BundleExpressionNode,
];

// JavaScript `throw` semantics: the value is thrown as-is (`throw "message"`
// throws the string itself).
export type BundleThrowStatementNode = [
  kind: "throw",
  expression: BundleExpressionNode,
];

// There is no `finallyBlock` — the compiler rejects `finally` — and the clause
// is never absent, since a `try` with nothing to catch it would be the
// statement it wraps.
export type BundleTryStatementNode = [
  kind: "try",
  tryBlock: BundleBlockNode,
  catchClause: BundleCatchClauseNode,
];

// The binding scopes over `block` alone. `variableDeclaration` is the name it
// binds, or null for a bindingless `catch` — TypeScript holds a declaration
// node there, where the name is all this format needs.
export type BundleCatchClauseNode = [
  kind: "catch",
  variableDeclaration: string | null,
  block: BundleBlockNode,
];

// It carries the name it binds and nothing else: a default, a type, a rest
// token and modifiers are each rejected by the compiler.
export type BundleParameterNode = [kind: "param", name: string];
