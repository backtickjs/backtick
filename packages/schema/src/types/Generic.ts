import { isType } from "../helpers/isType.js";
import type { TParameter } from "./Parameter.js";
import type { SchemaNode, TSchema, TSchemaOptions } from "../Schema.js";

export interface TGeneric<
  Parameters extends readonly TParameter[] = TParameter[],
  Expression extends SchemaNode = SchemaNode,
> extends TSchema {
  readonly type: "generic";
  readonly parameters: Parameters;
  readonly expression: Expression;
}

export function Generic<
  Parameters extends readonly TParameter[],
  Expression extends SchemaNode,
>(
  parameters: [...Parameters],
  expression: Expression,
  options: TSchemaOptions = {},
): TGeneric<Parameters, Expression> {
  return { ...options, type: "generic", parameters, expression };
}

export function IsGeneric(value: unknown): value is TGeneric {
  return isType(value, "generic");
}
