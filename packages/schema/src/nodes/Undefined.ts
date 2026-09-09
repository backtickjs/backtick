import { isType } from "../helpers/isType.js";
import type { TOptions } from "../TOptions.js";

/**
 * What a total read answers with where there is nothing.
 *
 * Not a value a script may write — splicing one is refused, and `null` is what
 * is written for nothing. This is what is *read*: an index past the end, a
 * member a value does not hold, an argument an optional parameter was not
 * given. A client answers with it whether or not anything can produce one, so
 * the format has to be able to say it.
 *
 * Beside `Null`, which is the one a script writes, and `Void`, which is what an
 * action answers with. Three nothings, in three positions.
 */
export interface TUndefined extends TOptions {
  readonly type: "undefined";
}

export function Undefined(options: TOptions = {}): TUndefined {
  return { ...options, type: "undefined" };
}

export function IsUndefined(value: unknown): value is TUndefined {
  return isType(value, "undefined");
}
