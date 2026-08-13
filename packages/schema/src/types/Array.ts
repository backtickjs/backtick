import { isType } from "../helpers/isType.js";
import type { SchemaNode, TSchema, TSchemaOptions } from "../Schema.js";

export interface TArray<Items extends SchemaNode = SchemaNode> extends TSchema {
  readonly type: "array";
  readonly items: Items;
}

export function Array<Items extends SchemaNode>(
  items: Items,
  options: TSchemaOptions = {},
): TArray<Items> {
  return { ...options, type: "array", items };
}

export function IsArray(value: unknown): value is TArray {
  return isType(value, "array");
}
