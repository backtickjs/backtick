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
// An empty container is omitted rather than spelled out: a node carries `args`,
// `params`, `statements` or `props` only when it has some. Absent means empty,
// everywhere, so a client reads them the same way each time. A spliced empty
// array or object is untouched — that is data the client asked for.
//
// Evaluation is deterministic, and effect-free but for one thing: applying an
// entry that draws allocates the storage its body binds, so applying one twice
// is two sets of it. Everything else may be cached, re-run or shared freely.
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

// An entry: an arrow under a wrapper, so what the bundler worked out about it
// lands beside the arrow rather than on it.
export interface BundleFunction {
  // The arrow this entry is. Always present: an entry with nothing to evaluate
  // is not written at all.
  [NodeField.content]: BundleArrowFunctionNode;
  // Set where applying this entry reads nothing that moves, so a client can
  // fill the position it feeds and never watch it. Absent costs a computation
  // and nothing else, which is why a reader without it is right to assume the
  // value moves.
  [NodeField.fixed]?: true;
}

// Plain JSON carrying itself. The `#` key is how a node is told from data, so
// data may not have one — the bundler refuses an object that does (see
// `lowerScriptBody`). Spelling that out here is what makes a malformed node a
// type error: without it every `#`-carrying object satisfies this member, and a
// node with the wrong fields quietly passes as data.
export interface BundleData {
  readonly [key: string]: BundleExpressionNode | undefined;
  readonly "#"?: never;
}

export type FunctionLabel = string;

// Every field name, as the single character it carries on the wire. A node's
// shape is read far more often than it is written, and the long names cost more
// than the values in most of them.
//
// The names are TypeScript's, from the node each one mirrors: a slot is called
// what `ts.IfStatement` or `ts.CallExpression` calls it, so a reader who knows
// that AST knows this one. Only `keyword` has no counterpart, and it says so
// where it is declared.
//
// A letter can carry more than one name. TypeScript often names one slot
// differently per node — `whenTrue` in a ternary, `thenStatement` in an `if` —
// and no node holds two of them, so both read as themselves in the
// declarations below while costing one letter between them. Where TypeScript
// uses one name for slots this format kept apart, the letter is what gives:
// `expression` is a call's callee, an access's target and a loop's condition
// alike, because that is what TypeScript calls all of them.
//
// Written as `[NodeField.operatorToken]` rather than `m` so the declarations below
// still say what each field is: the name lives here once, and nothing else has
// to know its letter. Append to add a field; never reassign one — a letter that
// moves silently misreads every bundle already written.
export const NodeField = {
  // The format's own.
  id: "a",
  props: "c",
  label: "f",
  content: "y",

  // TypeScript's, by the node they come from.
  name: "e", // ts.PropertyAccessExpression, ts.VariableDeclaration
  text: "e", // ts.Identifier
  arguments: "g", // ts.CallExpression, and what an `apply` supplies
  parameters: "h", // ts.ArrowFunction
  expression: "i", // ts.CallExpression (the callee), ts.PropertyAccessExpression
  // and ts.ElementAccessExpression (the target), ts.IfStatement and
  // ts.WhileStatement (the condition), ts.ReturnStatement, ts.ThrowStatement
  argumentExpression: "d", // ts.ElementAccessExpression
  initializer: "j", // ts.VariableDeclaration, ts.ForStatement
  incrementor: "k", // ts.ForStatement
  left: "n", // ts.BinaryExpression
  right: "o", // ts.BinaryExpression
  condition: "p", // ts.ConditionalExpression, ts.ForStatement
  whenTrue: "q", // ts.ConditionalExpression
  whenFalse: "r", // ts.ConditionalExpression
  thenStatement: "q", // ts.IfStatement
  elseStatement: "r", // ts.IfStatement
  body: "s", // ts.ArrowFunction
  statement: "s", // ts.WhileStatement, ts.ForStatement
  statements: "t", // ts.Block
  tryBlock: "v", // ts.TryStatement
  catchClause: "w", // ts.TryStatement
  variableDeclaration: "x", // ts.CatchClause
  block: "v", // ts.CatchClause

  // TypeScript's names for slots it fills with a token node, where this format
  // carries what the token would have said: a flag for a `?.` that is either
  // there or not, and the operator itself rather than a kind to look up.
  questionDotToken: "l", // ts.PropertyAccessExpression, ts.CallExpression
  operatorToken: "m", // ts.BinaryExpression
  operator: "m", // ts.PrefixUnaryExpression, which names the same slot plainly
  operand: "aa", // ts.PrefixUnaryExpression

  // The one slot with no TypeScript counterpart: `const` or `let`, which
  // TypeScript keeps as flags on the declaration list this format doesn't have.
  keyword: "u",

  // What the bundler worked out rather than read, for a client that would
  // otherwise work it out again.
  fixed: "ab", // a function entry whose value cannot change
} as const;

// Every node kind, as the number `"#"` carries. A number rather than a name
// because a bundle is mostly nodes, and `"identifier"` costs twelve bytes on
// each — 18% of an uncompressed payload across the fixtures.
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

// An element: structure as data, each prop evaluated in the enclosing entry's
// scope.
export interface BundleElement {
  "#": typeof NodeKind.Element;
  [NodeField.id]: string;
  // What the bundler writes here is composition rather than computation — data,
  // an element, or an entry applied. Nothing in the type says so.
  [NodeField.props]?: { [prop: string]: BundleExpressionNode };
}

// Applies an entry, named by label. A `call` evaluates a callee node instead,
// which is why the two are separate kinds.
//
// Shorthand, exactly, for a `call` of a `get` of this label, and it must stay
// equivalent to one. Spelled as a single node because applying is most of what
// a bundle does: written the long way, the fixtures measure ~5% larger.
export interface BundleApplyFunction {
  "#": typeof NodeKind.ApplyFunction;
  [NodeField.label]: FunctionLabel;
  // Mirrors the entry's parameters — for a script, an arrow per splice hole
  // first, then one value per capture.
  [NodeField.arguments]?: BundleExpressionNode[];
}

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
// `...xs` where an element or an argument goes. Not a `BundleExpressionNode`:
// it has no value of its own, it contributes the members of one — so the two
// lists that admit it say so, and nothing else has to consider it.
export interface BundleSpreadElementNode {
  "#": typeof NodeKind.SpreadElement;
  [NodeField.expression]: BundleExpressionNode;
}

// A global reached by name. What `Math` is, is the host's to answer — which is
// the point: a bundle that carried JavaScript's would be carrying JavaScript.
// What the format fixes is which members exist and what each one means.
export interface BundleBuiltinNode {
  "#": typeof NodeKind.Builtin;
  [NodeField.name]: string;
}

export type BundleArrayElement = BundleExpressionNode | BundleSpreadElementNode;

export type BundleExpressionNode =
  | null
  | boolean
  | number
  | string
  | BundleArrayElement[]
  | BundleData
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
  | BundleBuiltinNode;

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
export interface BundleIdentifierNode {
  "#": typeof NodeKind.Identifier;
  [NodeField.text]: string;
}

// An entry as a value, not applied: the function it evaluates to. Calling that
// applies the entry; passed bare it is already a nullary thunk.
//
// Only a `functions` entry can be named this way. A tree is applied, which an
// `ApplyTree` says on its own, so there is nothing for a tree to be named as.
export interface BundleGetFunction {
  "#": typeof NodeKind.GetFunction;
  [NodeField.label]: FunctionLabel;
}

// A call: evaluates the callee to a function and applies it. When the callee
// is an `entry` node targeting a function, `args` mirrors that entry's
// parameters (thunks for a polymorphic entry's splices first, then one value
// per capture); targeting a tree, `args` supplies its parameters in order. When `questionDotToken` (`callee?.(…)`), a null callee yields null — the
// language's absent value; `undefined` never arises — and the arguments are
// not evaluated.
export interface BundleCallExpressionNode {
  "#": typeof NodeKind.CallExpression;
  [NodeField.expression]: BundleExpressionNode;
  [NodeField.questionDotToken]?: true;
  [NodeField.arguments]?: BundleArrayElement[];
}

// A static property access: `object.name`. When `questionDotToken` (`object?.name`),
// a null object yields null — the language's absent value; `undefined` never
// arises — instead of reading. Reading an absent member also yields null,
// the same family as a missing argument binding null. As a call's callee,
// an optional access also short-circuits the call: a null object yields
// null and the arguments are not evaluated.
export interface BundlePropertyAccessExpressionNode {
  "#": typeof NodeKind.PropertyAccessExpression;
  [NodeField.expression]: BundleExpressionNode;
  [NodeField.questionDotToken]?: true;
  [NodeField.name]: string;
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
export interface BundleElementAccessExpressionNode {
  "#": typeof NodeKind.ElementAccessExpression;
  [NodeField.expression]: BundleExpressionNode;
  [NodeField.argumentExpression]: BundleExpressionNode;
}

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
// evaluating it first would read a variable where a name was meant. The type
// splits them so a reader can't reach `left` for an assignment and find
// anything but a name.
export type BundleBinaryExpressionNode =
  | {
      "#": typeof NodeKind.BinaryExpression;
      [NodeField.operatorToken]: "=";
      [NodeField.left]: BundleIdentifierNode;
      [NodeField.right]: BundleExpressionNode;
    }
  | {
      "#": typeof NodeKind.BinaryExpression;
      [NodeField.operatorToken]: Exclude<BundleBinaryOperator, "=">;
      [NodeField.left]: BundleExpressionNode;
      [NodeField.right]: BundleExpressionNode;
    };

// The prefix operators, as `BundleBinaryOperator` is for the binary ones.
export type BundlePrefixUnaryOperator = "!" | "-";

// `!x` or `-x`. A `!` operand is boolean, as every tested position is, so it
// negates a value rather than deciding what counts as one; a `-` operand is a
// number. A negative literal is not written this way — it carries itself, like
// every other literal on the wire — so this node means an operator applied to
// something computed.
export interface BundlePrefixUnaryExpressionNode {
  "#": typeof NodeKind.PrefixUnaryExpression;
  [NodeField.operator]: BundlePrefixUnaryOperator;
  [NodeField.operand]: BundleExpressionNode;
}

// A ternary: `condition ? consequent : alternate`. The condition is boolean
// — the typechecker requires it, no truthiness — and only the taken
// branch evaluates (the other branch's effects are skipped).
export interface BundleConditionalExpressionNode {
  "#": typeof NodeKind.ConditionalExpression;
  [NodeField.condition]: BundleExpressionNode;
  [NodeField.whenTrue]: BundleExpressionNode;
  [NodeField.whenFalse]: BundleExpressionNode;
}

// An arrow function: evaluates to a closure over the enclosing scope. The
// body is an expression node (implicit return) or a `block`. Every
// `functions` entry is an arrow node. Applying an arrow with fewer
// arguments than `params` binds the missing ones to null — the language's
// absent value; `undefined` never arises — which is how an omitted
// optional parameter reads as null.
export interface BundleArrowFunctionNode {
  "#": typeof NodeKind.ArrowFunction;
  [NodeField.parameters]?: BundleParameterNode[];
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
export interface BundleVariableDeclarationNode {
  "#": typeof NodeKind.VariableDeclaration;
  [NodeField.name]: string;
  [NodeField.initializer]: BundleExpressionNode;
  [NodeField.keyword]: "let" | "const";
}

// An if statement; `alternate` is null when there is no else branch. The
// condition is boolean — the typechecker rejects a non-boolean condition,
// so a client tests it directly, without truthiness rules.
export interface BundleIfStatementNode {
  "#": typeof NodeKind.IfStatement;
  [NodeField.expression]: BundleExpressionNode;
  [NodeField.thenStatement]: BundleStatementNode;
  [NodeField.elseStatement]: BundleStatementNode | null;
}

// `while (c) { … }`. The condition is boolean, as every condition is: there is
// no truthiness to fall back on. A `return` in the body returns from the
// enclosing arrow.
export interface BundleWhileStatementNode {
  "#": typeof NodeKind.WhileStatement;
  [NodeField.expression]: BundleExpressionNode;
  [NodeField.statement]: BundleStatementNode;
}

// `for (init; condition; update) { … }`. Each header part is null when the
// source omitted it, and an absent condition never ends the loop by itself.
//
// Two rules a reader has to implement, both of them what JavaScript does:
// a binding the initializer declares lives in a scope of the loop's own, gone
// once the loop is; and each turn gets its own copy of that scope, made from
// the last turn's values before the update runs — so an arrow built in one turn
// keeps that turn's numbers rather than the value the loop stopped at.
export interface BundleForStatementNode {
  "#": typeof NodeKind.ForStatement;
  [NodeField.initializer]: BundleStatementNode | null;
  [NodeField.condition]: BundleExpressionNode | null;
  [NodeField.incrementor]: BundleStatementNode | null;
  [NodeField.statement]: BundleStatementNode;
}

// `break` and `continue`, which the nearest enclosing loop catches: one ends
// it, the other starts its next turn — after a `for`'s update, never skipping
// it. Neither takes a label, so neither can name a loop further out.
export interface BundleBreakStatementNode {
  "#": typeof NodeKind.BreakStatement;
}

export interface BundleContinueStatementNode {
  "#": typeof NodeKind.ContinueStatement;
}

// Returns the expression's value from the enclosing arrow.
export interface BundleReturnStatementNode {
  "#": typeof NodeKind.ReturnStatement;
  [NodeField.expression]: BundleExpressionNode;
}

// Throws the expression's value, with JavaScript `throw` semantics: the value
// is thrown as-is (`throw "message"` throws the string itself).
export interface BundleThrowStatementNode {
  "#": typeof NodeKind.ThrowStatement;
  [NodeField.expression]: BundleExpressionNode;
}

// A try statement: executes `tryBlock`; when it throws, its `catchClause`
// takes over. There is no `finallyBlock` — the compiler rejects `finally` —
// and the clause is never absent, since a `try` with nothing to catch it
// would be the statement it wraps.
export interface BundleTryStatementNode {
  "#": typeof NodeKind.TryStatement;
  [NodeField.tryBlock]: BundleBlockNode;
  [NodeField.catchClause]: BundleCatchClauseNode;
}

// `catch (e) { … }`: binds the thrown value and runs `block`, the binding
// scoping over that block alone. `variableDeclaration` is the name it binds,
// or null for a bindingless `catch` — TypeScript holds a declaration node
// there, where the name is all this format needs, since a catch binding has no
// initializer and no keyword to carry.
export interface BundleCatchClauseNode {
  "#": typeof NodeKind.CatchClause;
  [NodeField.variableDeclaration]: string | null;
  [NodeField.block]: BundleBlockNode;
}

// A parameter, as `ts.ParameterDeclaration` is — the kind TypeScript calls
// `Parameter`. It carries the name it binds and nothing else: a default, a
// type, a rest token and modifiers are each rejected by the compiler, so there
// is nothing left for the node to say.
export interface BundleParameterNode {
  "#": typeof NodeKind.Parameter;
  [NodeField.name]: string;
}
