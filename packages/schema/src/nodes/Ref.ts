import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";

export interface TRef<Name extends string = string> extends TOptions {
  readonly type: "ref";
  readonly $ref: Name;
}

export function Ref<Name extends string>(
  name: Name,
  options: TOptions = {},
): TRef<Name> {
  return { ...options, type: "ref", $ref: name };
}

export function IsRef(value: unknown): value is TRef {
  return isType(value, "ref");
}
