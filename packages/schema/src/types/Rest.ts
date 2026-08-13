import { isType } from "../helpers/isType.js";
import type { SchemaNode, TSchema, TSchemaOptions } from "../Schema.js";

export interface TRest<Items extends SchemaNode = SchemaNode> extends TSchema {
  readonly type: "rest";
  readonly items: Items;
}

export function Rest<Items extends SchemaNode>(
  items: Items,
  options: TSchemaOptions = {},
): TRest<Items> {
  return { ...options, type: "rest", items };
}

export function IsRest(value: unknown): value is TRest {
  return isType(value, "rest");
}
