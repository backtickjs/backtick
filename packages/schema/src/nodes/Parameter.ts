import { Unknown } from "./Unknown.js";
import { isType } from "../helpers/isType.js";
import type { TUnknown } from "./Unknown.js";
import type { TNodeOptions } from "../NodeOptions.js";
import type { TNode } from "../TNode.js";

export interface TParameter<
  Name extends string = string,
  Extends extends TNode = TNode,
  Equals extends TNode = TNode,
> extends TNodeOptions {
  readonly type: "parameter";
  readonly name: Name;
  readonly extends: Extends;
  readonly equals: Equals;
}

export function Parameter<
  Name extends string,
  Extends extends TNode = TUnknown,
  Equals extends TNode = Extends,
>(
  name: Name,
  constraint?: Extends,
  fallback?: Equals,
  options: TNodeOptions = {},
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
