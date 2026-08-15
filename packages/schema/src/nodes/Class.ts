import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";
import type { TProperties } from "./Properties.js";

/** A value a member access autoboxes from, which is what reaches a class. */
export type Boxed = "string" | "number" | "boolean" | "array";

export interface TClass<
  Members extends TProperties = TProperties,
> extends TOptions {
  readonly type: "class";
  readonly members: Members;
  readonly boxes?: Boxed;
}

export interface TClassOptions extends TOptions {
  readonly boxes?: Boxed;
}

export function Class<Members extends TProperties>(
  members: Members,
  options: TClassOptions = {},
): TClass<Members> {
  return { ...options, type: "class", members };
}

export function IsClass(value: unknown): value is TClass {
  return isType(value, "class");
}
