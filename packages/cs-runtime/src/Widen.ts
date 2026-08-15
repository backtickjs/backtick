import type { ClientFunction } from "./ClientFunction.js";
import type { ClientValue } from "./ClientValue.js";
import type { JsxElement } from "./JsxElement.js";
import type { State } from "./globals.js";

// Widens a literal type: `0` becomes `number`. Inference through a
// `ClientValue` constraint keeps the literal, so without this `let n = 0`
// would reject `n = 1`.
export type Widen<T> = T extends number
  ? number
  : T extends string
    ? string
    : T extends boolean
      ? boolean
      : T extends JsxElement | ClientFunction | State<ClientValue>
        ? T
        : T extends (infer Element)[]
          ? Widen<Element>[]
          : T extends object
            ? { [Key in keyof T]: Widen<T[Key]> }
            : T;
