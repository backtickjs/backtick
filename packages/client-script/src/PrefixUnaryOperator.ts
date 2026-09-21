// The prefix operators a script may write. `-` negates a number, which is how
// a negative one is written: TypeScript reads `-1` as an operator on `1` too,
// so this AST does the same. `++` and `--` step a variable by one, and answer
// the value after the step.
export type PrefixUnaryOperator = "!" | "-" | "++" | "--";
