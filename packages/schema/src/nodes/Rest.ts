import { isType } from "../helpers/isType.js";
import type { TNodeOptions } from "../NodeOptions.js";
import type { TNode } from "../TNode.js";

export interface TRest<Items extends TNode = TNode> extends TNodeOptions {
  readonly type: "rest";
  readonly items: Items;
}

export function Rest<Items extends TNode>(
  items: Items,
  options: TNodeOptions = {},
): TRest<Items> {
  return { ...options, type: "rest", items };
}

export function IsRest(value: unknown): value is TRest {
  return isType(value, "rest");
}
