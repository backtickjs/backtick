import { isType } from "../helpers/isType.js";
import type { TNodeOptions } from "../NodeOptions.js";

export interface TNumber extends TNodeOptions {
  readonly type: "number";
  readonly const?: number;
}

export function Number(options: TNodeOptions = {}): TNumber {
  return { ...options, type: "number" };
}

export function IsNumber(value: unknown): value is TNumber {
  return isType(value, "number");
}
