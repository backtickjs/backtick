import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";
import type { TNode } from "../TNode.js";

export interface TRecord<Values extends TNode = TNode> extends TOptions {
  readonly type: "record";
  readonly values: Values;
}

export function Record<Values extends TNode>(
  values: Values,
  options: TOptions = {},
): TRecord<Values> {
  return { ...options, type: "record", values };
}

export function IsRecord(value: unknown): value is TRecord {
  return isType(value, "record");
}
