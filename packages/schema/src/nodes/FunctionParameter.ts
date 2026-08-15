import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";
import type { TNode } from "../TNode.js";

export interface TFunctionParameter<
  Name extends string = string,
  Holds extends TNode = TNode,
> extends TOptions {
  readonly type: "functionParameter";
  readonly name: Name;
  readonly holds: Holds;
}

export function FunctionParameter<Name extends string, Holds extends TNode>(
  name: Name,
  holds: Holds,
  options: TOptions = {},
): TFunctionParameter<Name, Holds> {
  return { ...options, type: "functionParameter", name, holds };
}

export function IsFunctionParameter(
  value: unknown,
): value is TFunctionParameter {
  return isType(value, "functionParameter");
}
