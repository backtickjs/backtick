import { isType } from "../helpers/isType.js";
import type { TSchema, TSchemaOptions } from "../Schema.js";

export interface TBoolean extends TSchema {
  readonly type: "boolean";
}

export function Boolean(options: TSchemaOptions = {}): TBoolean {
  return { ...options, type: "boolean" };
}

export function IsBoolean(value: unknown): value is TBoolean {
  return isType(value, "boolean") && !("const" in value);
}
