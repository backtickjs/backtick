import { isType } from "../helpers/isType.js";
import type { TSchema, TSchemaOptions } from "../Schema.js";

export interface TArray<
  Items extends TSchema = TSchema,
> extends TSchemaOptions {
  readonly type: "array";
  readonly items: Items;
}

export function Array<Items extends TSchema>(
  items: Items,
  options: TSchemaOptions = {},
): TArray<Items> {
  return { ...options, type: "array", items };
}

export function IsArray(value: unknown): value is TArray {
  return isType(value, "array");
}
