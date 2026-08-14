import type { Globals } from "@backtickjs/cs-runtime";

// What the host language's own names answer with, for this host.
export const globals: Globals = {
  Array: {
    from(source, map) {
      return Array.from(source, map);
    },
  },
  Math: {
    PI: Math.PI,
    E: Math.E,
    abs(x) {
      return Math.abs(x);
    },
    ceil(x) {
      return Math.ceil(x);
    },
    floor(x) {
      return Math.floor(x);
    },
    fround(x) {
      return Math.fround(x);
    },
    max(first, ...rest) {
      return Math.max(first, ...rest);
    },
    min(first, ...rest) {
      return Math.min(first, ...rest);
    },
    random() {
      return Math.random();
    },
    round(x) {
      return Math.round(x);
    },
    sign(x) {
      return Math.sign(x);
    },
    sqrt(x) {
      return Math.sqrt(x);
    },
    trunc(x) {
      return Math.trunc(x);
    },
  },
};
