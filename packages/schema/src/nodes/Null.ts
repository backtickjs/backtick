import { isType } from "../helpers/isType.js";
import type { TNodeOptions } from "../NodeOptions.js";

export interface TNull extends TNodeOptions {
  readonly type: "null";
}

export function Null(options: TNodeOptions = {}): TNull {
  return { ...options, type: "null" };
}

export function IsNull(value: unknown): value is TNull {
  return isType(value, "null");
}
