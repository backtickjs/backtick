// Widens a literal type: `0` becomes `number`. Inference through a
// `ClientValue` constraint keeps the literal, so without this `let n = 0`
// would reject `n = 1`.
export type Widen<T> = T extends number
  ? number
  : T extends string
    ? string
    : T extends boolean
      ? boolean
      : T;
