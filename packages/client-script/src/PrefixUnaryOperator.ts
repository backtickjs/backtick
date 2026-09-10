// The prefix operators a script may write. `-` negates a number, which is how
// a negative one is written: TypeScript reads `-1` as an operator on `1` too,
// so this AST does the same. The update operators are absent — `++` would
// assign in the middle of an expression.
export type PrefixUnaryOperator = "!" | "-";
