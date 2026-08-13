import { isType } from "../helpers/isType.js";
import type { TSchema, TSchemaOptions } from "../Schema.js";

export interface TVoid extends TSchema {
  readonly type: "void";
}

export function Void(options: TSchemaOptions = {}): TVoid {
  return { ...options, type: "void" };
}

export function IsVoid(value: unknown): value is TVoid {
  return isType(value, "void");
}
