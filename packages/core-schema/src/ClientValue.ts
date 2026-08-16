import type { ClientFunction } from "./ClientFunction.js";
import type { ClientElement } from "./ClientElement.js";
import type { ReadonlyState } from "./schema.generated.js";

export type ClientValue =
  | ReadonlyState<ClientValue>
  | null
  | number
  | boolean
  | string
  | { [key: string]: ClientValue }
  | ClientElement
  | ClientFunction
  | ClientValue[];
