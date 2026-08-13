import { isType } from "../helpers/isType.js";
import type { TSchemaOptions } from "../SchemaOptions.js";
import type { TSchema } from "../TSchema.js";

export interface TUnion<
  Anyof extends readonly TSchema[] = TSchema[],
> extends TSchemaOptions {
  readonly type: "union";
  readonly anyOf: Anyof;
}

export function Union<Anyof extends readonly TSchema[]>(
  anyOf: [...Anyof],
  options: TSchemaOptions = {},
): TUnion<Anyof> {
  return { ...options, type: "union", anyOf };
}

export function IsUnion(value: unknown): value is TUnion {
  return isType(value, "union");
}
