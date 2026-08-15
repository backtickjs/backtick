import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";

export interface TNull extends TOptions {
  readonly type: "null";
}

export function Null(options: TOptions = {}): TNull {
  return { ...options, type: "null" };
}

export function IsNull(value: unknown): value is TNull {
  return isType(value, "null");
}
