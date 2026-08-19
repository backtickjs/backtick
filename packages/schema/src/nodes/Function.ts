import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";
import type { TNode } from "../TNode.js";

/**
 * What a function may be given beyond what every node carries.
 *
 * A member of a value is computed from the value it is reached off, and some
 * of them are read rather than called: `s.length` is the number a string has,
 * where `s.trim()` is a call a script writes. Both take the receiver, so both
 * are functions here; `getter` says which one the language runs where the name
 * is read. A name with no receiver to compute from — `Math.PI` — is a value
 * and says nothing.
 *
 * Only the surfaces a person reads are told. The wire carries the name either
 * way, and how a client holds the answer is its own business.
 */
export interface TFunctionOptions extends TOptions {
  readonly getter?: boolean;
}

export interface TFunction<
  Parameters extends readonly TNode[] = TNode[],
  ReturnType extends TNode = TNode,
> extends TFunctionOptions {
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
  options: TFunctionOptions = {},
): TFunction<Parameters, ReturnType> {
  return { ...options, type: "function", parameters, returnType };
}

export function IsFunction(value: unknown): value is TFunction {
  return isType(value, "function");
}
