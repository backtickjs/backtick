import { isType } from "../helpers/isType.js";
import type { TNodeOptions } from "../NodeOptions.js";

export interface TUnknown extends TNodeOptions {
  readonly type: "unknown";
}

export function Unknown(options: TNodeOptions = {}): TUnknown {
  return { ...options, type: "unknown" };
}

export function IsUnknown(value: unknown): value is TUnknown {
  return isType(value, "unknown");
}
