import type { ClientFunction } from "./ClientFunction.js";
import type { BacktickElement, ReadonlyState } from "./schema.generated.js";

export type ClientValue =
  | BacktickElement
  | ReadonlyState<ClientValue>
  | null
  | number
  | boolean
  | string
  | ClientFunction
  | ClientValue[]
  | { [key: string]: ClientValue };
