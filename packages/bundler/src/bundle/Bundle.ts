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
  functions: Record<FunctionLabel, BundleArrowFunction>;
  root: BundleExpression;
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
  props: { [prop: string]: BundleExpression },
  // A slot rather than a reserved `children` prop, so a reader takes children
  // by position and every other reader walks the props untouched.
  //
  // `null` is no children, which a child evaluating to `null` also draws —
  // nothing either way, so the two need not be told apart.
  children: BundleExpression,
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
  args: BundleExpression[],
];

// An array of data, which is a node only so that it is not read as one: a
// spliced `[1, 2, 3]` and a node are both arrays. An array in a slot the kind
// declares as a list needs no wrapper, since nothing is deciding there.
export type BundleArrayLiteral = [kind: "arr", members: BundleArrayElement[]];

// `...xs` where an element or an argument goes. Not a `BundleExpression`:
// it has no value of its own, it contributes the members of one — so the two
// lists that admit it say so, and nothing else has to consider it.
export type BundleSpreadElement = [kind: "...", expression: BundleExpression];

// A global reached by name. What `Math` is, is the host's to answer — a bundle
// that carried JavaScript's would be carrying JavaScript. What the format
// fixes is which members exist and what each one means.
export type BundleBuiltin = [kind: "bltn", name: string];

export type BundleArrayElement = BundleExpression | BundleSpreadElement;

// An object literal a spread runs through, which cannot ship as the data an
// object literal usually is: an object in a value slot *is* its own keys and
// the format reserves none of them, so there is nowhere to write "and every key
// of that one". A node says it instead — and only where a spread appears. A
// literal without one is still plain data.
export type BundleObjectLiteral = [kind: "obj", entries: BundleObjectEntry[]];

// One key and what it holds. A node like any other, so the name sits behind
// the kind rather than in it: `...` is a name a property may have, and a name
// that had to be told from a spread by not being one would make `{ "...": 2 }`
// beside a spread mean the spread.
export type BundlePropertyAssignment = [
  kind: ":",
  name: string,
  value: BundleExpression,
];

// The spread is the same node an array holds, so "and every key of that one"
// is written the one way it is written everywhere.
export type BundleObjectEntry = BundlePropertyAssignment | BundleSpreadElement;

export type BundleExpression =
  | null
  | boolean
  | number
  | string
  | { readonly [key: string]: BundleExpression }
  | BundleArrayLiteral
  | BundleIdentifier
  | BundleGetFunction
  | BundleApplyFunction
  | BundleElement
  | BundleCall
  | BundleOptionalCall
  | BundlePropertyAccess
  | BundleOptionalPropertyAccess
  | BundleElementAccess
  | BundleBinary
  | BundleLogicalNot
  | BundleNegation
  | BundleConditional
  | BundleArrowFunction
  | BundleObjectLiteral
  | BundleBuiltin;

export type BundleStatement =
  | BundleExpression
  | BundleBlock
  | BundleConstDeclaration
  | BundleLetDeclaration
  | BundleIf
  | BundleWhile
  | BundleFor
  | BundleBreak
  | BundleContinue
  | BundleReturn
  | BundleThrow
  | BundleTry;

// The body of an arrow: a block, or an expression whose value is implicitly
// returned.
export type BundleBody = BundleExpression | BundleBlock;

// Scoping is lexical and names are pre-resolved: an identifier refers to a
// parameter of an enclosing arrow (including the entry itself) or a local
// declared in an enclosing block. There are no globals — every name is bound,
// and an unresolved name is a malformed bundle.
export type BundleIdentifier = [kind: "id", text: string];

// An entry as a value, not applied: the function it evaluates to. Only a
// `functions` entry can be named this way.
export type BundleGetFunction = [kind: "fn", label: FunctionLabel];

// `?.()` is the same call that short-circuits: a null callee yields null and
// the arguments are not evaluated. Two kinds rather than one with a flag, so
// what a node does is what it is.
export type BundleCall = [
  kind: "()",
  expression: BundleExpression,
  args: BundleArrayElement[],
];

export type BundleOptionalCall = [
  kind: "?.()",
  expression: BundleExpression,
  args: BundleArrayElement[],
];

// Reading an absent member yields null, the same family as a missing argument
// binding null. `?.` short-circuits instead of reading; as a call's callee it
// short-circuits the call too.
export type BundlePropertyAccess = [
  kind: ".",
  expression: BundleExpression,
  name: string,
];

export type BundleOptionalPropertyAccess = [
  kind: "?.",
  expression: BundleExpression,
  name: string,
];

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
export type BundleElementAccess = [
  kind: "[]",
  expression: BundleExpression,
  argumentExpression: BundleExpression,
];

// One node per operator, and the operator is the kind: a `+` node adds, which
// is a thing to know from position 0 alone rather than from a slot after it.

// `=` binds its left rather than evaluating it — evaluating first would read a
// variable where a name was meant. An identifier is the only assignable thing
// in this language.
export type BundleAssignment = [
  kind: "=",
  target: BundleIdentifier,
  value: BundleExpression,
];

// Short-circuiting. `&&` and `||` take booleans and yield one — there is no
// truthiness to reduce. `??` asks whether a value is absent, so either side
// may be anything.
export type BundleLogicalAnd = [
  kind: "&&",
  left: BundleExpression,
  right: BundleExpression,
];

export type BundleLogicalOr = [
  kind: "||",
  left: BundleExpression,
  right: BundleExpression,
];

export type BundleNullishCoalescing = [
  kind: "??",
  left: BundleExpression,
  right: BundleExpression,
];

// `+` adds two numbers or concatenates where either side is a string; the rest
// take numbers.
export type BundleAddition = [
  kind: "+",
  left: BundleExpression,
  right: BundleExpression,
];

export type BundleSubtraction = [
  kind: "-",
  left: BundleExpression,
  right: BundleExpression,
];

export type BundleMultiplication = [
  kind: "*",
  left: BundleExpression,
  right: BundleExpression,
];

export type BundleDivision = [
  kind: "/",
  left: BundleExpression,
  right: BundleExpression,
];

export type BundleRemainder = [
  kind: "%",
  left: BundleExpression,
  right: BundleExpression,
];

// Identity: the same primitive or the same object, never a deep walk and
// never a coercion.
export type BundleStrictEquality = [
  kind: "===",
  left: BundleExpression,
  right: BundleExpression,
];

export type BundleStrictInequality = [
  kind: "!==",
  left: BundleExpression,
  right: BundleExpression,
];

// Two strings compare as text, two numbers as numbers, and nothing orders
// against `NaN`.
export type BundleLessThan = [
  kind: "<",
  left: BundleExpression,
  right: BundleExpression,
];

export type BundleLessThanOrEqual = [
  kind: "<=",
  left: BundleExpression,
  right: BundleExpression,
];

export type BundleGreaterThan = [
  kind: ">",
  left: BundleExpression,
  right: BundleExpression,
];

export type BundleGreaterThanOrEqual = [
  kind: ">=",
  left: BundleExpression,
  right: BundleExpression,
];

export type BundleBinary =
  | BundleAssignment
  | BundleLogicalAnd
  | BundleLogicalOr
  | BundleNullishCoalescing
  | BundleAddition
  | BundleSubtraction
  | BundleMultiplication
  | BundleDivision
  | BundleRemainder
  | BundleStrictEquality
  | BundleStrictInequality
  | BundleLessThan
  | BundleLessThanOrEqual
  | BundleGreaterThan
  | BundleGreaterThanOrEqual;

export type BundleLogicalNot = [kind: "!", operand: BundleExpression];

export type BundleNegation = [kind: "-x", operand: BundleExpression];

export type BundleConditional = [
  kind: "?:",
  condition: BundleExpression,
  whenTrue: BundleExpression,
  whenFalse: BundleExpression,
];

export type BundleArrowFunction = [
  kind: "=>",
  parameters: BundleParameter[],
  body: BundleBody,
];

// Declarations are hoisted to the block, matching the compiler's scoping (a
// use before its declaration resolves to the local).
export type BundleBlock = [kind: "{}", statements: BundleStatement[]];

export type BundleConstDeclaration = [
  kind: "const",
  name: string,
  initializer: BundleExpression,
];

export type BundleLetDeclaration = [
  kind: "let",
  name: string,
  initializer: BundleExpression,
];

// `elseStatement` is null when there is no else branch. The condition is
// boolean, so a client tests it directly, without truthiness rules.
export type BundleIf = [
  kind: "if",
  expression: BundleExpression,
  thenStatement: BundleStatement,
  elseStatement: BundleStatement | null,
];

export type BundleWhile = [
  kind: "while",
  expression: BundleExpression,
  statement: BundleStatement,
];

// Each header part is null when the source omitted it, and an absent condition
// never ends the loop by itself.
//
// Two rules a reader has to implement, both of them what JavaScript does: a
// binding the initializer declares lives in a scope of the loop's own, gone
// once the loop is; and each turn gets its own copy of that scope, made from
// the last turn's values before the update runs — so an arrow built in one turn
// keeps that turn's numbers rather than the value the loop stopped at.
export type BundleFor = [
  kind: "for",
  initializer:
    | BundleConstDeclaration
    | BundleLetDeclaration
    | BundleExpression
    | null,
  condition: BundleExpression | null,
  incrementor: BundleExpression | null,
  statement: BundleStatement,
];

// The nearest enclosing loop catches both: one ends it, the other starts its
// next turn — after a `for`'s update, never skipping it. Neither takes a label.
export type BundleBreak = [kind: "break"];

export type BundleContinue = [kind: "continue"];

export type BundleReturn = [kind: "return", expression: BundleExpression];

// JavaScript `throw` semantics: the value is thrown as-is (`throw "message"`
// throws the string itself).
export type BundleThrow = [kind: "throw", expression: BundleExpression];

// There is no `finallyBlock` — the compiler rejects `finally` — and the clause
// is never absent, since a `try` with nothing to catch it would be the
// statement it wraps.
export type BundleTry = [
  kind: "try",
  tryBlock: BundleBlock,
  catchClause: BundleCatchClause,
];

// The binding scopes over `block` alone. `variableDeclaration` is the name it
// binds, or null for a bindingless `catch` — TypeScript holds a declaration
// node there, where the name is all this format needs.
export type BundleCatchClause = [
  kind: "catch",
  variableDeclaration: string | null,
  block: BundleBlock,
];

// It carries the name it binds and nothing else: a default, a type, a rest
// token and modifiers are each rejected by the compiler.
export type BundleParameter = [kind: "param", name: string];
