// The bundle: the JIT bundler's wire format, as plain data — what ships is
// exactly `JSON.stringify` of this. These types are the contract an
// interpreter implements: evaluate `root` against the `functions` table.
// Computation ships as ASTs, so nothing here needs a JavaScript parser.

export interface Bundle {
  functions: Record<FunctionLabel, BundleArrowFunction>;
  root: BundleExpression;
}

export type FunctionLabel = string;

export type BundleElement = [
  kind: "el",
  id: string,
  props: { [prop: string]: BundleExpression },
  children: BundleExpression,
];

export type BundleArrayLiteral = [kind: "arr", members: BundleArrayElement[]];

export type BundleSpreadElement = [kind: "...", expression: BundleExpression];

export type BundleUndefined = [kind: "undef"];

export type BundleBuiltin = [kind: "bltn", name: string];

export type BundleArrayElement = BundleExpression | BundleSpreadElement;

export type BundleObjectLiteral = [kind: "obj", entries: BundleObjectEntry[]];

export type BundlePropertyAssignment = [
  kind: ":",
  name: string,
  value: BundleExpression,
];

export type BundleObjectEntry = BundlePropertyAssignment | BundleSpreadElement;

export type BundleExpression =
  | null
  | boolean
  | number
  | string
  | { readonly [key: string]: BundleExpression }
  | BundleUndefined
  | BundleArrayLiteral
  | BundleIdentifier
  | BundleFunctionReference
  | BundleElement
  | BundleCall
  | BundleOptionalCall
  | BundlePropertyAccess
  | BundleOptionalPropertyAccess
  | BundleElementAccess
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
  | BundleGreaterThanOrEqual
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

export type BundleBody = BundleExpression | BundleBlock;

export type BundleIdentifier = [kind: "id", text: string];

export type BundleFunctionReference = [kind: "fn", label: FunctionLabel];

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

export type BundleElementAccess = [
  kind: "[]",
  expression: BundleExpression,
  argumentExpression: BundleExpression,
];

export type BundleAssignment = [
  kind: "=",
  target: BundleIdentifier,
  value: BundleExpression,
];

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

export type BundleBreak = [kind: "break"];

export type BundleContinue = [kind: "continue"];

export type BundleReturn = [kind: "return", expression: BundleExpression];

export type BundleThrow = [kind: "throw", expression: BundleExpression];

export type BundleTry = [
  kind: "try",
  tryBlock: BundleBlock,
  catchClause: BundleCatchClause,
];

export type BundleCatchClause = [
  kind: "catch",
  variableDeclaration: string | null,
  block: BundleBlock,
];

export type BundleParameter = [kind: "param", name: string];
