// A JSON expression: what a tree entry and the bundle root are made of.
// Plain JSON carries itself; composition uses the tagged forms listed on
// `buildBundle`.
export type JsonExpr =
  | null
  | boolean
  | number
  | string
  | JsonExpr[]
  | { [key: string]: JsonExpr };
