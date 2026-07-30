import type { ClientValue } from "./ClientValue.js";

/**
 * The client array API: what a script may reach on an array. Curated from
 * the standard library: every member is pure and none produces `undefined` —
 * mutators (`push`, `pop`, …) and `undefined`-returning lookups (`at`,
 * `find`, …) are absent.
 */
export interface ClientArray<T> {
  /** The element at an index, which is what `cs.index` resolves a read to.
   * Reading is total at runtime — an index the array doesn't have reads as
   * `null` — but the type follows TypeScript's own rule and names the element,
   * so an in-range read needs no null check. */
  readonly [index: number]: T;

  /** Gets the length of the array. This is a number one higher than the highest index in the array. */
  readonly length: number;

  /**
   * Combines two or more arrays. This method returns a new array without modifying any existing arrays.
   * @param items Additional arrays and/or items to add to the end of the array.
   */
  concat(...items: (T | readonly T[])[]): T[];

  /**
   * Adds all the elements of an array into a string, separated by the specified separator string.
   * @param separator A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.
   */
  join(separator?: string): string;

  /**
   * Returns a copy of a section of an array.
   * @param start The beginning index of the specified portion of the array. If start is undefined, then the slice begins at index 0.
   * @param end The end index of the specified portion of the array. This is exclusive of the element at the index 'end'. If end is undefined, then the slice extends to the end of the array.
   */
  slice(start?: number, end?: number): T[];

  /**
   * Returns the index of the first occurrence of a value in an array, or -1 if it is not present.
   * @param searchElement The value to locate in the array.
   * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
   */
  indexOf(searchElement: T, fromIndex?: number): number;

  /**
   * Determines whether an array includes a certain element, returning true or false as appropriate.
   * @param searchElement The element to search for.
   * @param fromIndex The position in this array at which to begin searching for searchElement.
   */
  includes(searchElement: T, fromIndex?: number): boolean;

  /**
   * Calls a defined callback function on each element of an array, and returns an array that contains the results.
   * @param callbackfn A function that accepts up to two arguments. The map method calls the callbackfn function one time for each element in the array.
   */
  map<U extends ClientValue>(callbackfn: (value: T, index: number) => U): U[];

  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param predicate A function that accepts up to two arguments. The filter method calls the predicate function one time for each element in the array.
   */
  filter(predicate: (value: T, index: number) => boolean): T[];
}
