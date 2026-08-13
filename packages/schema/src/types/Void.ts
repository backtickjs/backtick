import { isType } from "../helpers/isType.js";
import type { TSchemaOptions } from "../SchemaOptions.js";

export interface TVoid extends TSchemaOptions {
  readonly type: "void";
}

export function Void(options: TSchemaOptions = {}): TVoid {
  return { ...options, type: "void" };
}

export function IsVoid(value: unknown): value is TVoid {
  return isType(value, "void");
}
