import { isType } from "../helpers/isType.js";
import { requiredOf } from "./Optional.js";
import type { TProperties } from "./Properties.js";
import type { TNodeOptions } from "../NodeOptions.js";

export interface TObject<
  Properties extends TProperties = TProperties,
> extends TNodeOptions {
  readonly type: "object";
  readonly properties: Properties;
  readonly required: readonly string[];
}

export function Object<Properties extends TProperties>(
  properties: Properties,
  options: TNodeOptions = {},
): TObject<Properties> {
  return {
    ...options,
    type: "object",
    properties,
    required: requiredOf(properties),
  };
}

export function IsObject(value: unknown): value is TObject {
  return isType(value, "object");
}
