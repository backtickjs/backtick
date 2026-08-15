import type { ClientFunction } from "./ClientFunction.js";
import type { JsxElement } from "./JsxElement.js";
import type { ReadonlyState } from "@backtickjs/core-schema";

export type ClientValue =
  | JsxElement
  | ReadonlyState<ClientValue>
  | null
  | number
  | boolean
  | string
  | ClientFunction
  | ClientValue[]
  | { [key: string]: ClientValue | undefined };
