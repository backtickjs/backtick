import type { TBoolean } from "./Boolean.js";
import type { TNumber } from "./Number.js";
import type { TString } from "./String.js";
import type { TNodeOptions } from "../NodeOptions.js";

export type LiteralValue = string | number | boolean;

export type TLiteral<Value extends LiteralValue = LiteralValue> = (
  | TString
  | TNumber
  | TBoolean
) & { readonly const: Value };

export function Literal<const Value extends LiteralValue>(
  value: Value,
  options: TNodeOptions = {},
): TLiteral<Value> {
  return {
    ...options,
    type: typeof value,
    const: value,
  } as TLiteral<Value>;
}
