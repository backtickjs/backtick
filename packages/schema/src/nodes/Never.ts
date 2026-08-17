import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";

export interface TNever extends TOptions {
  readonly type: "never";
}

/**
 * No value at all.
 *
 * What a parameter admits where nothing may be passed — a function type that
 * accepts every function stands over these, since a parameter nothing inhabits
 * is one every parameter is wider than. Distinct from `Type.Void()`, which is
 * what a call answers with when it answers nothing.
 */
export function Never(options: TOptions = {}): TNever {
  return { ...options, type: "never" };
}

export function IsNever(value: unknown): value is TNever {
  return isType(value, "never");
}
