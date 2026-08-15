import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";

export interface TString extends TOptions {
  readonly type: "string";
  readonly const?: string;
}

export function String(options: TOptions = {}): TString {
  return { ...options, type: "string" };
}

export function IsString(value: unknown): value is TString {
  return isType(value, "string");
}
