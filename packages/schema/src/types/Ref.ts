import type { TSchema, TSchemaOptions } from "../Schema.js";

export interface TRef<Name extends string = string> extends TSchema {
  readonly $ref: Name;
}

export function Ref<Name extends string>(
  name: Name,
  options: TSchemaOptions = {},
): TRef<Name> {
  return { ...options, $ref: name };
}

export function IsRef(value: unknown): value is TRef {
  return (
    typeof value === "object" &&
    value !== null &&
    "$ref" in value &&
    typeof value["$ref"] === "string"
  );
}
