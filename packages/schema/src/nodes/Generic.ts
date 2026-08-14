import { isType } from "../helpers/isType.js";
import type { TGenericParameter } from "./GenericParameter.js";
import type { TNodeOptions } from "../NodeOptions.js";
import type { TNode } from "../TNode.js";

export interface TGeneric<
  Parameters extends readonly TGenericParameter[] = TGenericParameter[],
  Expression extends TNode = TNode,
> extends TNodeOptions {
  readonly type: "generic";
  readonly parameters: Parameters;
  readonly expression: Expression;
}

export function Generic<
  Parameters extends readonly TGenericParameter[],
  Expression extends TNode,
>(
  parameters: [...Parameters],
  expression: Expression,
  options: TNodeOptions = {},
): TGeneric<Parameters, Expression> {
  return { ...options, type: "generic", parameters, expression };
}

export function IsGeneric(value: unknown): value is TGeneric {
  return isType(value, "generic");
}
