import type { TSchema, TSchemaOptions } from "typebox";
import type { SchemaNode } from "../Schema.js";

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
  return { ...options, type: "element", props } as TElement<Props>;
}

export function IsElement(value: unknown): value is TElement {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    value["type"] === "element"
  );
}
