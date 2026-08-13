import { isType } from "../helpers/isType.js";
import type { SchemaNode, TSchema, TSchemaOptions } from "../Schema.js";

export interface TFunction<
  Parameters extends readonly SchemaNode[] = SchemaNode[],
  ReturnType extends SchemaNode = SchemaNode,
> extends TSchema {
  readonly type: "function";
  readonly parameters: Parameters;
  readonly returnType: ReturnType;
}

export function Function<
  Parameters extends readonly SchemaNode[],
  ReturnType extends SchemaNode,
>(
  parameters: [...Parameters],
  returnType: ReturnType,
  options: TSchemaOptions = {},
): TFunction<Parameters, ReturnType> {
  return { ...options, type: "function", parameters, returnType };
}

export function IsFunction(value: unknown): value is TFunction {
  return isType(value, "function");
}
