import { isType } from "../helpers/isType.js";
import type { TNodeOptions } from "../NodeOptions.js";

export interface TBoolean extends TNodeOptions {
  readonly type: "boolean";
  readonly const?: boolean;
}

export function Boolean(options: TNodeOptions = {}): TBoolean {
  return { ...options, type: "boolean" };
}

export function IsBoolean(value: unknown): value is TBoolean {
  return isType(value, "boolean");
}
