import type { ClientConstructor } from "./ClientConstructor.js";
import type { ClientFunction } from "./ClientFunction.js";
import type { JsxElement } from "./JsxElement.js";
import type { ClientObject } from "./ClientObject.js";
import type { ReadonlyState } from "./globals.js";

export type ClientValue =
  | JsxElement
  | ClientObject
  | ClientConstructor
  | ReadonlyState<ClientValue>
  | null
  | number
  | boolean
  | string
  | ClientFunction
  | ClientValue[]
  | { [key: string]: ClientValue | undefined };
