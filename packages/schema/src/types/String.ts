import { isType } from "../helpers/isType.js";
import type { TSchema, TSchemaOptions } from "../Schema.js";

export interface TString extends TSchema {
  readonly type: "string";
}

export function String(options: TSchemaOptions = {}): TString {
  return { ...options, type: "string" };
}

export function IsString(value: unknown): value is TString {
  return isType(value, "string") && !("const" in value);
}
