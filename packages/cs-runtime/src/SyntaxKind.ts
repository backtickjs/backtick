// What each node is, under the number TypeScript gives it: these are
// `ts.SyntaxKind`'s own values, so `ts.SyntaxKind[node.kind]` names any node
// here, and a reader of one AST reads the other.
//
// They are copied, not imported — the compiler would otherwise pull TypeScript
// into the runtime, and a script's kind would change under it. TypeScript
// renumbers freely as it grows syntax; this table is pinned to the version it
// was taken from (6.0.3) and never renumbered, because a number that moves
// misreads every script already compiled. If a later TypeScript disagrees, the
// disagreement is TypeScript's to have.
//
// A const object rather than an `enum`, matching `NodeKind` on the wire side:
// it gives the same literal types, and it erases.
export const SyntaxKind = {
  // Literals and names
  NumericLiteral: 9,
  StringLiteral: 11,
  Identifier: 80,
  FalseKeyword: 97,
  NullKeyword: 106,
  TrueKeyword: 112,

  // Declarations
  Parameter: 170,
  VariableStatement: 244,
  VariableDeclaration: 261,
  VariableDeclarationList: 262,
  PropertyAssignment: 304,

  // Expressions
  ArrayLiteralExpression: 210,
  SpreadElement: 231,
  ObjectLiteralExpression: 211,
  PropertyAccessExpression: 212,
  ElementAccessExpression: 213,
  CallExpression: 214,
  NewExpression: 215,
  ArrowFunction: 220,
  PrefixUnaryExpression: 225,
  BinaryExpression: 227,
  ConditionalExpression: 228,

  // Statements and clauses
  Block: 242,
  IfStatement: 246,
  WhileStatement: 248,
  ForStatement: 249,
  ContinueStatement: 252,
  BreakStatement: 253,
  ReturnStatement: 254,
  ThrowStatement: 258,
  TryStatement: 259,
  CatchClause: 300,

  // This language's own, past where TypeScript has reached: a splice is host
  // code, which JavaScript's grammar has no node for.
  Splice: 1000,
  // A global this language provides itself. JavaScript reaches `Math` because
  // it is in scope; here there is no scope to be in, so what a script may
  // reach is written down instead of inherited.
  Builtin: 1001,
} as const;

export type SyntaxKind = (typeof SyntaxKind)[keyof typeof SyntaxKind];
