import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";
import type { TNode } from "../TNode.js";
import type { TRef } from "./Ref.js";

export interface TApply<
  Target extends TRef = TRef,
  Arguments extends readonly TNode[] = TNode[],
> extends TOptions {
  readonly type: "apply";
  readonly target: Target;
  readonly arguments: Arguments;
}

export function Apply<Target extends TRef, Arguments extends readonly TNode[]>(
  target: Target,
  args: [...Arguments],
  options: TOptions = {},
): TApply<Target, Arguments> {
  return { ...options, type: "apply", target, arguments: args };
}

export function IsApply(value: unknown): value is TApply {
  return isType(value, "apply");
}
