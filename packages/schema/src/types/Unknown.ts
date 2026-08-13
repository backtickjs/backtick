import { isType } from "../helpers/isType.js";
import type { TSchema } from "../Schema.js";

export interface TUnknown extends TSchema {
  readonly type: "unknown";
}

export function Unknown(): TUnknown {
  return { type: "unknown" };
}

export function IsUnknown(value: unknown): value is TUnknown {
  return isType(value, "unknown");
}
