import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";

export interface TBoolean extends TOptions {
  readonly type: "boolean";
  readonly const?: boolean;
}

export function Boolean(options: TOptions = {}): TBoolean {
  return { ...options, type: "boolean" };
}

export function IsBoolean(value: unknown): value is TBoolean {
  return isType(value, "boolean");
}
