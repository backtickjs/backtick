import type { ClientObject } from "./ClientObject.js";
import type { ClientElement } from "./ClientElement.js";

export type ClientUnknown =
  | ClientElement
  // A spliced class `T` stays typed `T`, and its members unwrap at access time
  | ClientObject
  // biome-ignore lint/suspicious/noConfusingVoidType: script whose block completes without a `return`
  | void
  | null
  | number
  | boolean
  | string
  | ((...args: never[]) => ClientUnknown)
  | ClientUnknown[]
  | { [key: string]: ClientUnknown };
