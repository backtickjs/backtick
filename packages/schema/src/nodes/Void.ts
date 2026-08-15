import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";

export interface TVoid extends TOptions {
  readonly type: "void";
}

export function Void(options: TOptions = {}): TVoid {
  return { ...options, type: "void" };
}

export function IsVoid(value: unknown): value is TVoid {
  return isType(value, "void");
}
