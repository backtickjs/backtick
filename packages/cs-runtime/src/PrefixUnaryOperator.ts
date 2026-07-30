// The prefix operators a script may write, which is one: `!`, on a boolean.
// `-` isn't here — a negative number is written as one, not negated — and the
// update operators aren't either, since `++` would assign in an expression.
export type PrefixUnaryOperator = "!";
