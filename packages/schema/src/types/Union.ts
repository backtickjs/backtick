import type { SchemaNode, TSchema, TSchemaOptions } from "../Schema.js";

export interface TUnion<
  Anyof extends readonly SchemaNode[] = SchemaNode[],
> extends TSchema {
  readonly anyOf: Anyof;
}

export function Union<Anyof extends readonly SchemaNode[]>(
  anyOf: [...Anyof],
  options: TSchemaOptions = {},
): TUnion<Anyof> {
  return { ...options, anyOf };
}

export function IsUnion(value: unknown): value is TUnion {
  return (
    typeof value === "object" &&
    value !== null &&
    "anyOf" in value &&
    Array.isArray(value["anyOf"])
  );
}
