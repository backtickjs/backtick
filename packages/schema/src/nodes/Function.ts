import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";
import type { TNode } from "../TNode.js";

export interface TFunction<
  Parameters extends readonly TNode[] = TNode[],
  ReturnType extends TNode = TNode,
> extends TOptions {
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
  options: TOptions = {},
): TFunction<Parameters, ReturnType> {
  return { ...options, type: "function", parameters, returnType };
}

export function IsFunction(value: unknown): value is TFunction {
  return isType(value, "function");
}
