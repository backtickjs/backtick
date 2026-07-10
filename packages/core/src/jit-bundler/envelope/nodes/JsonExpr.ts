// A JSON expression: what a tree entry and the envelope root are made of.
// Plain JSON carries itself; composition uses the tagged forms listed on
// `buildEnvelope`.
export type JsonExpr =
  | null
  | boolean
  | number
  | string
  | JsonExpr[]
  | { [key: string]: JsonExpr };
