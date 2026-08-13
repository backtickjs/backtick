import { isType } from "../helpers/isType.js";
import type { TSchemaOptions } from "../SchemaOptions.js";

export interface TNumber extends TSchemaOptions {
  readonly type: "number";
  readonly const?: number;
}

export function Number(options: TSchemaOptions = {}): TNumber {
  return { ...options, type: "number" };
}

export function IsNumber(value: unknown): value is TNumber {
  return isType(value, "number");
}
