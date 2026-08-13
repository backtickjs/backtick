import { isType } from "../helpers/isType.js";
import type { TSchemaOptions } from "../SchemaOptions.js";
import type { TSchema } from "../TSchema.js";

export interface TFunction<
  Parameters extends readonly TSchema[] = TSchema[],
  ReturnType extends TSchema = TSchema,
> extends TSchemaOptions {
  readonly type: "function";
  readonly parameters: Parameters;
  readonly returnType: ReturnType;
}

export function Function<
  Parameters extends readonly TSchema[],
  ReturnType extends TSchema,
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
