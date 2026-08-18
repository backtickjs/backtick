import type { ClientFunction } from "@backtickjs/language-schema";
import type { ClientValue } from "@backtickjs/language-schema";
import type { ClientElement } from "@backtickjs/ui-schema";
import type { State } from "@backtickjs/language-schema";

// Widens a literal type: `0` becomes `number`. Inference through a
// `ClientValue` constraint keeps the literal, so without this `let n = 0`
// would reject `n = 1`.
export type Widen<T> = T extends number
  ? number
  : T extends string
    ? string
    : T extends boolean
      ? boolean
      : T extends ClientElement | ClientFunction | State<ClientValue>
        ? T
        : T extends (infer Element)[]
          ? Widen<Element>[]
          : T extends object
            ? { [Key in keyof T]: Widen<T[Key]> }
            : T;
