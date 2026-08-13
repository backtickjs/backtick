import { isType } from "../helpers/isType.js";
import type { SchemaNode, TSchema, TSchemaOptions } from "../Schema.js";

export interface TUnion<
  Anyof extends readonly SchemaNode[] = SchemaNode[],
> extends TSchema {
  readonly type: "union";
  readonly anyOf: Anyof;
}

export function Union<Anyof extends readonly SchemaNode[]>(
  anyOf: [...Anyof],
  options: TSchemaOptions = {},
): TUnion<Anyof> {
  return { ...options, type: "union", anyOf };
}

export function IsUnion(value: unknown): value is TUnion {
  return isType(value, "union");
}
