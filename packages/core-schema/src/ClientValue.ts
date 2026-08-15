import type { ClientFunction } from "./ClientFunction.js";
import type { Element, ReadonlyState } from "./schema.generated.js";

export type ClientValue =
  | Element
  | ReadonlyState<ClientValue>
  | null
  | number
  | boolean
  | string
  | ClientFunction
  | ClientValue[]
  | { [key: string]: ClientValue | undefined };
