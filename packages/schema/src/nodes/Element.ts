import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";
import type { TNode } from "../TNode.js";

export interface TElement<Props extends TNode = TNode> extends TOptions {
  readonly type: "element";
  readonly props: Props;
}

export function Element<Props extends TNode>(
  props: Props,
  options: TOptions = {},
): TElement<Props> {
  return { ...options, type: "element", props };
}

export function IsElement(value: unknown): value is TElement {
  return isType(value, "element");
}
