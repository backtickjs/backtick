// The operators a script may write. `=` is one of them, because an assignment
// is a binary expression here exactly as it is in TypeScript.
export type BinaryOperator =
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
