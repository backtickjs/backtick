import { isType } from "../helpers/isType.js";
import type { TNodeOptions } from "../NodeOptions.js";
import type { TNode } from "../TNode.js";

export interface TRecord<Values extends TNode = TNode> extends TNodeOptions {
  readonly type: "record";
  readonly values: Values;
}

export function Record<Values extends TNode>(
  values: Values,
  options: TNodeOptions = {},
): TRecord<Values> {
  return { ...options, type: "record", values };
}

export function IsRecord(value: unknown): value is TRecord {
  return isType(value, "record");
}
