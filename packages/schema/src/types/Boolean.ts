import { isType } from "../helpers/isType.js";
import type { TSchemaOptions } from "../SchemaOptions.js";

export interface TBoolean extends TSchemaOptions {
  readonly type: "boolean";
  readonly const?: boolean;
}

export function Boolean(options: TSchemaOptions = {}): TBoolean {
  return { ...options, type: "boolean" };
}

export function IsBoolean(value: unknown): value is TBoolean {
  return isType(value, "boolean");
}
