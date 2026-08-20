import type { ClientFunction } from "@backtickjs/language-schema";
import type { ClientHandle } from "@backtickjs/language-schema";
import type { ClientValue } from "@backtickjs/language-schema";

// Widens a literal type: `0` becomes `number`. Inference through a
// `ClientValue` constraint keeps the literal, so without this `let n = 0`
// would reject `n = 1`.
export type Widen<T extends ClientValue> = T extends number
  ? number
  : T extends string
    ? string
    : T extends boolean
      ? boolean
      : T extends ClientFunction | ClientHandle
        ? T
        : T extends readonly (infer Element extends ClientValue)[]
          ? Widen<Element>[]
          : T extends { readonly [key: string]: ClientValue }
            ? { [Key in keyof T]: Widen<T[Key]> }
            : T;
