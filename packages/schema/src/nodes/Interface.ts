import { isType } from "../helpers/isType.js";
import { requiredOf } from "./Optional.js";
import type { TProperties } from "./Properties.js";
import type { TOptions } from "../TOptions.js";
import type { TNode } from "../TNode.js";

export interface TInterfaceOptions extends TOptions {
  /**
   * That two of these are the same only where one came from the other.
   *
   * What a client makes and hands back is one of these — a drawing, a cell —
   * and nothing an app writes down is. Said as intent rather than mechanism:
   * a host whose types are nominal already writes nothing for it, and one
   * whose types are structural brands them the way it brands anything.
   */
  readonly nominal?: boolean;
}

export interface TInterface<
  Heritage extends readonly TNode[] = readonly TNode[],
  Properties extends TProperties = TProperties,
> extends TOptions {
  readonly type: "interface";
  readonly extends: Heritage;
  readonly properties: Properties;
  readonly required: readonly string[];
  readonly nominal?: boolean;
}

export function Interface<
  Heritage extends readonly TNode[],
  Properties extends TProperties,
>(
  heritage: [...Heritage],
  properties: Properties,
  options: TInterfaceOptions = {},
): TInterface<Heritage, Properties> {
  return {
    ...options,
    type: "interface",
    extends: heritage,
    properties,
    required: requiredOf(properties),
  };
}

export function IsInterface(value: unknown): value is TInterface {
  return isType(value, "interface");
}
