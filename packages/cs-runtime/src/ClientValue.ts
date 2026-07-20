import type { ClientConstructor } from "./ClientConstructor.js";
import type { ClientElement } from "./ClientElement.js";
import type { ClientObject } from "./ClientObject.js";
import type { ClientUnknown } from "./ClientUnknown.js";

export type ClientValue =
  | ClientElement
  | ClientObject
  | ClientConstructor
  | null
  | number
  | boolean
  | string
  | ((...args: never[]) => ClientUnknown)
  | ClientValue[]
  | { [key: string]: ClientValue };
