import type { ClientValue } from "@backtickjs/core";
import type { Array, Boolean, Number, String } from "@backtickjs/cs-runtime";

/**
 * What this client answers with for a member access on a primitive.
 *
 * Written by hand and not generated: which interface a value autoboxes to is
 * this client's to decide. What each interface holds is the schema's, so a
 * member left out of one stays out of reach whatever the host's own prototypes
 * happen to hold.
 *
 * A name here is the key a member access looks a value up by, so it is what the
 * primitive is called rather than what its interface is.
 */
export interface Boxes {
  array: Array<ClientValue>;
  boolean: Boolean;
  number: Number;
  string: String;
}

// What a member access on a primitive answers with.
export const boxes: Boxes = {
  string: {
    toString(this: string) {
      return this;
    },
    charAt(this, pos) {
      return this.charAt(pos);
    },
    charCodeAt(this, index) {
      return this.charCodeAt(index);
    },
    concat(this, ...strings) {
      return this.concat(...strings);
    },
    indexOf(this, searchString, position) {
      return this.indexOf(searchString, position);
    },
    lastIndexOf(this, searchString, position) {
      return this.lastIndexOf(searchString, position);
    },
    localeCompare(this, that) {
      return this.localeCompare(that);
    },
    replace(this, searchValue, replaceValue) {
      return this.replace(searchValue, replaceValue);
    },
    slice(this, start, end) {
      return this.slice(start, end);
    },
    split(this, separator, limit) {
      return this.split(separator, limit);
    },
    substring(this, start, end) {
      return this.substring(start, end);
    },
    toLowerCase(this) {
      return this.toLowerCase();
    },
    toLocaleLowerCase(this) {
      return this.toLocaleLowerCase();
    },
    toUpperCase(this) {
      return this.toUpperCase();
    },
    toLocaleUpperCase(this) {
      return this.toLocaleUpperCase();
    },
    trim(this) {
      return this.trim();
    },
    get length() {
      return this.length;
    },
    valueOf(this: string) {
      return this;
    },
  },
  number: {
    toString(this, radix) {
      return this.toString(radix);
    },
    toFixed(this, fractionDigits) {
      return this.toFixed(fractionDigits);
    },
    toExponential(this, fractionDigits) {
      return this.toExponential(fractionDigits);
    },
    toPrecision(this, precision) {
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
    get length() {
      return this.length;
    },
    concat(this, ...items) {
      return this.concat(...items);
    },
    join(this, separator) {
      return this.join(separator);
    },
    slice(this, start, end) {
      return this.slice(start, end);
    },
    indexOf(this, searchElement, fromIndex) {
      return this.indexOf(searchElement, fromIndex);
    },
    includes(this, searchElement, fromIndex) {
      return this.includes(searchElement, fromIndex);
    },
    map(this, callbackfn) {
      return this.map((value, index) => callbackfn(value, index));
    },
    filter(this, predicate) {
      return this.filter((value, index) => predicate(value, index));
    },
    with(this, index, value) {
      return this.with(index, value);
    },
    toSorted(this, compareFn) {
      return this.toSorted(compareFn);
    },
    toReversed(this) {
      return this.toReversed();
    },
    toSpliced(this, start, deleteCount, ...items) {
      return this.toSpliced(start, deleteCount, ...items);
    },
  },
};
