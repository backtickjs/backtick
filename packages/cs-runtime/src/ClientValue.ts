import type { ClientConstructor } from "./ClientConstructor.js";
import type { ClientFunction } from "./ClientFunction.js";
import type { JsxElement } from "./JsxElement.js";
import type { ClientObject } from "./ClientObject.js";

export type ClientValue =
  | JsxElement
  | ClientObject
  | ClientConstructor
  | null
  | number
  | boolean
  | string
  | ClientFunction
  | readonly ClientValue[]
  | { readonly [key: string]: ClientValue | undefined };
