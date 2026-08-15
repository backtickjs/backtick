import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";
import type { TNode } from "../TNode.js";

export interface TArray<Items extends TNode = TNode> extends TOptions {
  readonly type: "array";
  readonly items: Items;
}

export function Array<Items extends TNode>(
  items: Items,
  options: TOptions = {},
): TArray<Items> {
  return { ...options, type: "array", items };
}

export function IsArray(value: unknown): value is TArray {
  return isType(value, "array");
}
