import { isType } from "../helpers/isType.js";
import type { TSchema, TSchemaOptions } from "../Schema.js";

export interface TRef<Name extends string = string> extends TSchema {
  readonly type: "ref";
  readonly $ref: Name;
}

export function Ref<Name extends string>(
  name: Name,
  options: TSchemaOptions = {},
): TRef<Name> {
  return { ...options, type: "ref", $ref: name };
}

export function IsRef(value: unknown): value is TRef {
  return isType(value, "ref");
}
