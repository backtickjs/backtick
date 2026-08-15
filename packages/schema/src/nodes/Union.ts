import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";
import type { TNode } from "../TNode.js";

export interface TUnion<
  Anyof extends readonly TNode[] = TNode[],
> extends TOptions {
  readonly type: "union";
  readonly anyOf: Anyof;
}

export function Union<Anyof extends readonly TNode[]>(
  anyOf: [...Anyof],
  options: TOptions = {},
): TUnion<Anyof> {
  return { ...options, type: "union", anyOf };
}

export function IsUnion(value: unknown): value is TUnion {
  return isType(value, "union");
}
