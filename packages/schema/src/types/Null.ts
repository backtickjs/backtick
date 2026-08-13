import { isType } from "../helpers/isType.js";
import type { TSchemaOptions } from "../SchemaOptions.js";

export interface TNull extends TSchemaOptions {
  readonly type: "null";
}

export function Null(options: TSchemaOptions = {}): TNull {
  return { ...options, type: "null" };
}

export function IsNull(value: unknown): value is TNull {
  return isType(value, "null");
}
