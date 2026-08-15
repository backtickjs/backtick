import { Unknown } from "./Unknown.js";
import { isType } from "../helpers/isType.js";
import type { TUnknown } from "./Unknown.js";
import type { TOptions } from "../TOptions.js";
import type { TNode } from "../TNode.js";

export interface TGenericParameter<
  Name extends string = string,
  Extends extends TNode = TNode,
  Equals extends TNode = TNode,
> extends TOptions {
  readonly type: "genericParameter";
  readonly name: Name;
  readonly extends: Extends;
  readonly equals: Equals;
}

export function GenericParameter<
  Name extends string,
  Extends extends TNode = TUnknown,
  Equals extends TNode = Extends,
>(
  name: Name,
  constraint?: Extends,
  fallback?: Equals,
  options: TOptions = {},
): TGenericParameter<Name, Extends, Equals> {
  const bound = (constraint ?? Unknown()) as Extends;
  return {
    ...options,
    type: "genericParameter",
    name,
    extends: bound,
    equals: (fallback ?? bound) as Equals,
  };
}

export function IsGenericParameter(value: unknown): value is TGenericParameter {
  return isType(value, "genericParameter");
}
