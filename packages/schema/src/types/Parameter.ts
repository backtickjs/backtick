import { Unknown } from "./Unknown.js";
import type { TUnknown } from "./Unknown.js";
import type { SchemaNode } from "../Schema.js";

export interface TParameter<
  Name extends string = string,
  Extends extends SchemaNode | TUnknown = SchemaNode | TUnknown,
  Equals extends SchemaNode | TUnknown = SchemaNode | TUnknown,
> {
  readonly name: Name;
  readonly extends: Extends;
  readonly equals: Equals;
}

export function Parameter<
  Name extends string,
  Extends extends SchemaNode | TUnknown = TUnknown,
  Equals extends SchemaNode | TUnknown = Extends,
>(
  name: Name,
  constraint?: Extends,
  fallback?: Equals,
): TParameter<Name, Extends, Equals> {
  const bound = (constraint ?? Unknown()) as Extends;
  return {
    name,
    extends: bound,
    equals: (fallback ?? bound) as Equals,
  };
}

export function IsParameter(value: unknown): value is TParameter {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "extends" in value &&
    "equals" in value
  );
}
