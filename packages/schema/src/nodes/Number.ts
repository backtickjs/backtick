import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";

export interface TNumber extends TOptions {
  readonly type: "number";
  readonly const?: number;
}

export function Number(options: TOptions = {}): TNumber {
  return { ...options, type: "number" };
}

export function IsNumber(value: unknown): value is TNumber {
  return isType(value, "number");
}
