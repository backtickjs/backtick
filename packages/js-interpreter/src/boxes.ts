import type { Boxes, Value } from "@backtickjs/cs-runtime";

// What a member access on a primitive answers with.
//
// Written out rather than handed the host's prototypes, for the reason the
// globals are: what a bundle can reach is a list somebody chose, so a member
// left out stays left out. `"x".padStart` is not part of this language, and a
// client answering it would accept bundles the format does not define.
//
// Each member takes its value as `this`, which is what the schema's classes
// say and what a method call already binds.
export const boxes: Boxes = {
  string: {
    toString(this: string) {
      return this;
    },
    charAt(this: string, pos) {
      return this.charAt(pos);
    },
    charCodeAt(this: string, index) {
      return this.charCodeAt(index);
    },
    concat(this: string, ...strings) {
      return this.concat(...strings);
    },
    indexOf(this: string, searchString, position) {
      return this.indexOf(searchString, position ?? undefined);
    },
    lastIndexOf(this: string, searchString, position) {
      return this.lastIndexOf(searchString, position ?? undefined);
    },
    localeCompare(this: string, that) {
      return this.localeCompare(that);
    },
    replace(this: string, searchValue, replaceValue) {
      return typeof replaceValue === "string"
        ? this.replace(searchValue, replaceValue)
        : this.replace(searchValue, (substring, offset, whole) =>
            replaceValue(substring, offset, whole),
          );
    },
    slice(this: string, start, end) {
      return this.slice(start ?? undefined, end ?? undefined);
    },
    split(this: string, separator, limit) {
      return this.split(separator, limit ?? undefined);
    },
    substring(this: string, start, end) {
      return this.substring(start, end ?? undefined);
    },
    toLowerCase(this: string) {
      return this.toLowerCase();
    },
    toLocaleLowerCase(this: string) {
      return this.toLocaleLowerCase();
    },
    toUpperCase(this: string) {
      return this.toUpperCase();
    },
    toLocaleUpperCase(this: string) {
      return this.toLocaleUpperCase();
    },
    trim(this: string) {
      return this.trim();
    },
    get length(): number {
      return (this as unknown as string).length;
    },
    substr(this: string, from, length) {
      return this.substr(from, length ?? undefined);
    },
    valueOf(this: string) {
      return this;
    },
  },
  number: {
    toString(this: number, radix) {
      return this.toString(radix ?? undefined);
    },
    toFixed(this: number, fractionDigits) {
      return this.toFixed(fractionDigits ?? undefined);
    },
    toExponential(this: number, fractionDigits) {
      return this.toExponential(fractionDigits ?? undefined);
    },
    toPrecision(this: number, precision) {
      return this.toPrecision(precision ?? undefined);
    },
    valueOf(this: number) {
      return this;
    },
  },
  boolean: {
    valueOf(this: boolean) {
      return this;
    },
  },
  array: {
    get length(): number {
      return (this as unknown as Value[]).length;
    },
    concat(this: Value[], ...items) {
      return this.concat(...items);
    },
    join(this: Value[], separator) {
      return this.join(separator ?? undefined);
    },
    slice(this: Value[], start, end) {
      return this.slice(start ?? undefined, end ?? undefined);
    },
    indexOf(this: Value[], searchElement, fromIndex) {
      return this.indexOf(searchElement, fromIndex ?? undefined);
    },
    includes(this: Value[], searchElement, fromIndex) {
      return this.includes(searchElement, fromIndex ?? undefined);
    },
    map(this: Value[], callbackfn) {
      return this.map((value, index) => callbackfn(value, index));
    },
    filter(this: Value[], predicate) {
      return this.filter((value, index) => predicate(value, index));
    },
    with(this: Value[], index, value) {
      return this.with(index, value);
    },
    toSorted(this: Value[], compareFn) {
      return this.toSorted(compareFn);
    },
    toReversed(this: Value[]) {
      return this.toReversed();
    },
    toSpliced(this: Value[], start, deleteCount, ...items) {
      return this.toSpliced(start, deleteCount, ...items);
    },
  },
};
