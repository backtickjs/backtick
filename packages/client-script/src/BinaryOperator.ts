// The operators a script may write. `=` is one of them, because an assignment
// is a binary expression here exactly as it is in TypeScript, and so is each
// compound assignment: `x += y` assigns `x + y`.
export type BinaryOperator =
  | "="
  | "+="
  | "-="
  | "*="
  | "/="
  | "%="
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
