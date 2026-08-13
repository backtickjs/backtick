import { isType } from "../helpers/isType.js";
import type { TNodeOptions } from "../NodeOptions.js";

export interface TString extends TNodeOptions {
  readonly type: "string";
  readonly const?: string;
}

export function String(options: TNodeOptions = {}): TString {
  return { ...options, type: "string" };
}

export function IsString(value: unknown): value is TString {
  return isType(value, "string");
}
