import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";

export interface TUnknown extends TOptions {
  readonly type: "unknown";
}

export function Unknown(options: TOptions = {}): TUnknown {
  return { ...options, type: "unknown" };
}

export function IsUnknown(value: unknown): value is TUnknown {
  return isType(value, "unknown");
}
