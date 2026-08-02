import type { ClientValue } from "./ClientValue.js";

/**
 * The client `Array` API: the static side of the global, as against
 * `ClientArray`, which is what a script reaches on an array it already has.
 *
 * One member, because there is one thing the language cannot do for itself:
 * produce a sequence of a given length. It can transform one — `map`, `filter`,
 * `slice` — but the only way to get to a thousand elements without this is to
 * double a throwaway array until it is long enough.
 *
 * `of`, `isArray` and the rest are absent: an array literal is `of`, and a
 * script's types already say what is an array.
 */
export interface ClientArrayStatics {
  /**
   * Builds an array of `length` elements, each the result of calling `map` for
   * its index.
   *
   * The mapper is required, where the standard library makes it optional.
   * Without one this answers with an array of holes, and a hole reads as
   * `undefined` — which is the one thing this language has no value for.
   *
   * The mapper's first argument is always `null`. The standard library passes
   * the element it found, and against a `{ length }` source there is none.
   * @param source How many elements to build, as an object naming its length.
   * @param map Called once per index, with `null` and that index.
   */
  from<T extends ClientValue>(
    source: { readonly length: number },
    map: (value: null, index: number) => T,
  ): T[];
}
