import { isType } from "../helpers/isType.js";
import { requiredOf } from "./Optional.js";
import type { TProperties } from "./Properties.js";
import type { TSchema, TSchemaOptions } from "../Schema.js";

export interface TInterface<
  Heritage extends readonly TSchema[] = readonly TSchema[],
  Properties extends TProperties = TProperties,
> extends TSchemaOptions {
  readonly type: "interface";
  readonly extends: Heritage;
  readonly properties: Properties;
  readonly required: readonly string[];
}

export function Interface<
  Heritage extends readonly TSchema[],
  Properties extends TProperties,
>(
  heritage: [...Heritage],
  properties: Properties,
  options: TSchemaOptions = {},
): TInterface<Heritage, Properties> {
  return {
    ...options,
    type: "interface",
    extends: heritage,
    properties,
    required: requiredOf(properties),
  };
}

export function IsInterface(value: unknown): value is TInterface {
  return isType(value, "interface");
}
