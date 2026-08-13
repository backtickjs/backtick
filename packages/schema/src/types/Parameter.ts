import { Unknown } from "./Unknown.js";
import { isType } from "../helpers/isType.js";
import type { TUnknown } from "./Unknown.js";
import type { TSchema, TSchemaOptions } from "../Schema.js";

export interface TParameter<
  Name extends string = string,
  Extends extends TSchema = TSchema,
  Equals extends TSchema = TSchema,
> extends TSchemaOptions {
  readonly type: "parameter";
  readonly name: Name;
  readonly extends: Extends;
  readonly equals: Equals;
}

export function Parameter<
  Name extends string,
  Extends extends TSchema = TUnknown,
  Equals extends TSchema = Extends,
>(
  name: Name,
  constraint?: Extends,
  fallback?: Equals,
  options: TSchemaOptions = {},
): TParameter<Name, Extends, Equals> {
  const bound = (constraint ?? Unknown()) as Extends;
  return {
    ...options,
    type: "parameter",
    name,
    extends: bound,
    equals: (fallback ?? bound) as Equals,
  };
}

export function IsParameter(value: unknown): value is TParameter {
  return isType(value, "parameter");
}
