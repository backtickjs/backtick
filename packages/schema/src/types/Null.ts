import { isType } from "../helpers/isType.js";
import type { TSchema, TSchemaOptions } from "../Schema.js";

export interface TNull extends TSchema {
  readonly type: "null";
}

export function Null(options: TSchemaOptions = {}): TNull {
  return { ...options, type: "null" };
}

export function IsNull(value: unknown): value is TNull {
  return isType(value, "null");
}
