import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";
import type { TNode } from "../TNode.js";

export interface TTag<Props extends TNode = TNode> extends TOptions {
  readonly type: "tag";
  readonly props: Props;
}

export function Tag<Props extends TNode>(
  props: Props,
  options: TOptions = {},
): TTag<Props> {
  return { ...options, type: "tag", props };
}

export function IsTag(value: unknown): value is TTag {
  return isType(value, "tag");
}
