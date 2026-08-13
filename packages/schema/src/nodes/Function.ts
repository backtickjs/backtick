import { isType } from "../helpers/isType.js";
import type { TNodeOptions } from "../NodeOptions.js";
import type { TNode } from "../TNode.js";

export interface TFunction<
  Parameters extends readonly TNode[] = TNode[],
  ReturnType extends TNode = TNode,
> extends TNodeOptions {
  readonly type: "function";
  readonly parameters: Parameters;
  readonly returnType: ReturnType;
}

export function Function<
  Parameters extends readonly TNode[],
  ReturnType extends TNode,
>(
  parameters: [...Parameters],
  returnType: ReturnType,
  options: TNodeOptions = {},
): TFunction<Parameters, ReturnType> {
  return { ...options, type: "function", parameters, returnType };
}

export function IsFunction(value: unknown): value is TFunction {
  return isType(value, "function");
}
