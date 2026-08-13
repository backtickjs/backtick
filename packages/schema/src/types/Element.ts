import { isType } from "../helpers/isType.js";
import type { TSchemaOptions } from "../SchemaOptions.js";
import type { TSchema } from "../TSchema.js";

export interface TElement<
  Props extends TSchema = TSchema,
> extends TSchemaOptions {
  readonly type: "element";
  readonly props: Props;
}

export function Element<Props extends TSchema>(
  props: Props,
  options: TSchemaOptions = {},
): TElement<Props> {
  return { ...options, type: "element", props };
}

export function IsElement(value: unknown): value is TElement {
  return isType(value, "element");
}
