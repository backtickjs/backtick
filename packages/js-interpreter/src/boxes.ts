import type { Boxes } from "@backtickjs/cs-runtime";
import type { Value } from "./Value.js";

// What a member access on a primitive answers with.
export const boxes: Boxes<Value> = {
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
      return this.indexOf(searchString, position);
    },
    lastIndexOf(this: string, searchString, position) {
      return this.lastIndexOf(searchString, position);
    },
    localeCompare(this: string, that) {
      return this.localeCompare(that);
    },
    replace(this: string, searchValue, replaceValue) {
      return this.replace(searchValue, replaceValue as string);
    },
    slice(this: string, start, end) {
      return this.slice(start, end);
    },
    split(this: string, separator, limit) {
      return this.split(separator, limit);
    },
    substring(this: string, start, end) {
      return this.substring(start, end);
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
    valueOf(this: string) {
      return this;
    },
  },
  number: {
    toString(this: number, radix) {
      return this.toString(radix);
    },
    toFixed(this: number, fractionDigits) {
      return this.toFixed(fractionDigits);
    },
    toExponential(this: number, fractionDigits) {
      return this.toExponential(fractionDigits);
    },
    toPrecision(this: number, precision) {
      return this.toPrecision(precision);
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
      return this.join(separator);
    },
    slice(this: Value[], start, end) {
      return this.slice(start, end);
    },
    indexOf(this: Value[], searchElement, fromIndex) {
      return this.indexOf(searchElement, fromIndex);
    },
    includes(this: Value[], searchElement, fromIndex) {
      return this.includes(searchElement, fromIndex);
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
