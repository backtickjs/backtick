import { isType } from "../helpers/isType.js";
import type { TNodeOptions } from "../NodeOptions.js";
import type { TNode } from "../TNode.js";

export interface TIndex<
  Key extends TNode = TNode,
  Value extends TNode = TNode,
> extends TNodeOptions {
  readonly type: "index";
  readonly name: string;
  readonly key: Key;
  readonly value: Value;
}

export function Index<Key extends TNode, Value extends TNode>(
  name: string,
  key: Key,
  value: Value,
  options: TNodeOptions = {},
): TIndex<Key, Value> {
  return { ...options, type: "index", name, key, value };
}

export function IsIndex(value: unknown): value is TIndex {
  return isType(value, "index");
}
