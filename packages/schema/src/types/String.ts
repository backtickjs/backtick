import { isType } from "../helpers/isType.js";
import type { TSchemaOptions } from "../Schema.js";

export interface TString extends TSchemaOptions {
  readonly type: "string";
  readonly const?: string;
}

export function String(options: TSchemaOptions = {}): TString {
  return { ...options, type: "string" };
}

export function IsString(value: unknown): value is TString {
  return isType(value, "string");
}
