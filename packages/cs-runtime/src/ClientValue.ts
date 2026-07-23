import type { ClientConstructor } from "./ClientConstructor.js";
import type { ClientFunction } from "./ClientFunction.js";
import type { ClientElement } from "./ClientElement.js";
import type { ClientObject } from "./ClientObject.js";

export type ClientValue =
  | ClientElement
  | ClientObject
  | ClientConstructor
  | null
  | number
  | boolean
  | string
  | ClientFunction
  | ClientValue[]
  | { [key: string]: ClientValue | undefined };
