import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";

export interface TElement extends TOptions {
  readonly type: "element";
}

/**
 * What a client draws, where a value goes.
 *
 * One of the values a client holds, beside a string and a number, rather than
 * a name with members to answer for: what stands behind it is the host's own —
 * a tag and its props here, whatever a native client draws with there — and
 * nothing a script may reach into.
 */
export function Element(options: TOptions = {}): TElement {
  return { ...options, type: "element" };
}

export function IsElement(value: unknown): value is TElement {
  return isType(value, "element");
}
