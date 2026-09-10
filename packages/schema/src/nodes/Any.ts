import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";

export interface TAny extends TOptions {
  readonly type: "any";
}

/** Any value, unchecked: what it is depends on something the type cannot say. */
export function Any(options: TOptions = {}): TAny {
  return { ...options, type: "any" };
}

export function IsAny(value: unknown): value is TAny {
  return isType(value, "any");
}
