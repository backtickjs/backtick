import { isType } from "../helpers/isType.js";
import type { SchemaNode, TSchema, TSchemaOptions } from "../Schema.js";

export interface TElement<
  Props extends SchemaNode = SchemaNode,
> extends TSchema {
  readonly type: "element";
  readonly props: Props;
}

export function Element<Props extends SchemaNode>(
  props: Props,
  options: TSchemaOptions = {},
): TElement<Props> {
  return { ...options, type: "element", props };
}

export function IsElement(value: unknown): value is TElement {
  return isType(value, "element");
}
