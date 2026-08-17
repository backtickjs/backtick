import type { ClientFunction } from "./ClientFunction.js";
import type { ClientHandle } from "./schema.generated.js";

export type ClientValue =
  | null
  | number
  | boolean
  | string
  | { [key: string]: ClientValue }
  | ClientValue[]
  | ClientFunction
  | ClientHandle;
