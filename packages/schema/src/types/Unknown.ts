import { isType } from "../helpers/isType.js";
import type { TSchemaOptions } from "../SchemaOptions.js";

export interface TUnknown extends TSchemaOptions {
  readonly type: "unknown";
}

export function Unknown(options: TSchemaOptions = {}): TUnknown {
  return { ...options, type: "unknown" };
}

export function IsUnknown(value: unknown): value is TUnknown {
  return isType(value, "unknown");
}
