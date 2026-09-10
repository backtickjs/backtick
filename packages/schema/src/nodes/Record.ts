import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";
import type { TNode } from "../TNode.js";

/**
 * Keys of one type, values of another, and nothing said about which keys.
 *
 * The key is written even where it is `string`, because a schema that names one
 * — `BundleFunctionLabel` rather than `string` — is telling a reader what the keys
 * of this particular map mean, which is the only thing a record has to say
 * about them.
 */
export interface TRecord<
  Keys extends TNode = TNode,
  Values extends TNode = TNode,
> extends TOptions {
  readonly type: "record";
  readonly keys: Keys;
  readonly values: Values;
}

export function Record<Keys extends TNode, Values extends TNode>(
  keys: Keys,
  values: Values,
  options: TOptions = {},
): TRecord<Keys, Values> {
  return { ...options, type: "record", keys, values };
}

export function IsRecord(value: unknown): value is TRecord {
  return isType(value, "record");
}
