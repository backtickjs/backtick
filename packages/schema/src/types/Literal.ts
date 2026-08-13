import type { TSchema, TSchemaOptions } from "../Schema.js";

export type LiteralValue = string | number | boolean;

export interface TLiteral<
  Value extends LiteralValue = LiteralValue,
> extends TSchema {
  readonly type: "string" | "number" | "boolean";
  readonly const: Value;
}

export function Literal<Value extends LiteralValue>(
  value: Value,
  options: TSchemaOptions = {},
): TLiteral<Value> {
  return {
    ...options,
    type: typeof value as TLiteral["type"],
    const: value,
  };
}

export function IsLiteral(value: unknown): value is TLiteral {
  return typeof value === "object" && value !== null && "const" in value;
}
