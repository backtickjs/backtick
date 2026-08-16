import { isType } from "../helpers/isType.js";
import { requiredOf } from "./Optional.js";
import type { TProperties } from "./Properties.js";
import type { TOptions } from "../TOptions.js";
import type { TNode } from "../TNode.js";

export interface TInterface<
  Heritage extends readonly TNode[] = readonly TNode[],
  Properties extends TProperties = TProperties,
> extends TOptions {
  readonly type: "interface";
  readonly extends: Heritage;
  readonly properties: Properties;
  readonly required: readonly string[];
}

export function Interface<
  Heritage extends readonly TNode[],
  Properties extends TProperties,
>(
  heritage: [...Heritage],
  properties: Properties,
  options: TOptions = {},
): TInterface<Heritage, Properties> {
  return {
    ...options,
    type: "interface",
    extends: heritage,
    properties,
    required: requiredOf(properties),
  };
}

export function IsInterface(value: unknown): value is TInterface {
  return isType(value, "interface");
}
