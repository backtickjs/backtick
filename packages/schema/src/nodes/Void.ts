import { isType } from "../helpers/isType.js";
import type { TNodeOptions } from "../NodeOptions.js";

export interface TVoid extends TNodeOptions {
  readonly type: "void";
}

export function Void(options: TNodeOptions = {}): TVoid {
  return { ...options, type: "void" };
}

export function IsVoid(value: unknown): value is TVoid {
  return isType(value, "void");
}
