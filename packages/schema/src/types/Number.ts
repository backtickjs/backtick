import { isType } from "../helpers/isType.js";
import type { TSchema, TSchemaOptions } from "../Schema.js";

export interface TNumber extends TSchema {
  readonly type: "number";
  readonly const?: number;
}

export function Number(options: TSchemaOptions = {}): TNumber {
  return { ...options, type: "number" };
}

export function IsNumber(value: unknown): value is TNumber {
  return isType(value, "number");
}
