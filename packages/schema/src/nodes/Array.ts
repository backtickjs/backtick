import { isType } from "../helpers/isType.js";
import type { TNodeOptions } from "../NodeOptions.js";
import type { TNode } from "../TNode.js";

export interface TArray<Items extends TNode = TNode> extends TNodeOptions {
  readonly type: "array";
  readonly items: Items;
}

export function Array<Items extends TNode>(
  items: Items,
  options: TNodeOptions = {},
): TArray<Items> {
  return { ...options, type: "array", items };
}

export function IsArray(value: unknown): value is TArray {
  return isType(value, "array");
}
