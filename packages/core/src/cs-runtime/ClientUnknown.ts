import type { UIElement } from "./ClientElement.ts";

export type ClientUnknown =
  | UIElement
  // biome-ignore lint/suspicious/noConfusingVoidType: script whose block completes without a `return`
  | void
  | null
  | number
  | boolean
  | string
  | ((...args: never[]) => ClientUnknown)
  | ClientUnknown[]
  | { [key: string]: ClientUnknown };
