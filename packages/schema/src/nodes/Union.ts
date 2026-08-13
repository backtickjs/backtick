import { isType } from "../helpers/isType.js";
import type { TNodeOptions } from "../NodeOptions.js";
import type { TNode } from "../TNode.js";

export interface TUnion<
  Anyof extends readonly TNode[] = TNode[],
> extends TNodeOptions {
  readonly type: "union";
  readonly anyOf: Anyof;
}

export function Union<Anyof extends readonly TNode[]>(
  anyOf: [...Anyof],
  options: TNodeOptions = {},
): TUnion<Anyof> {
  return { ...options, type: "union", anyOf };
}

export function IsUnion(value: unknown): value is TUnion {
  return isType(value, "union");
}
