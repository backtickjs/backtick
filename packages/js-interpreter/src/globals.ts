import type { Globals } from "@backtickjs/cs-runtime";

// What the host language's own names answer with, for this host.
export const globals: Globals = {
  Array: {
    from(source, map) {
      return Array.from(source, map);
    },
    of(...items) {
      // An array literal is this. What it adds is reaching one from a spliced
      // list of client values rather than from a written-out sequence.
      return items;
    },
  },
  Math: {
    E: Math.E,
    LN10: Math.LN10,
    LN2: Math.LN2,
    LOG2E: Math.LOG2E,
    LOG10E: Math.LOG10E,
    PI: Math.PI,
    SQRT1_2: Math.SQRT1_2,
    SQRT2: Math.SQRT2,
    abs(x) {
      return finite("abs", Math.abs(x));
    },
    acos(x) {
      return finite("acos", Math.acos(x));
    },
    asin(x) {
      return finite("asin", Math.asin(x));
    },
    atan(x) {
      return finite("atan", Math.atan(x));
    },
    atan2(y, x) {
      return finite("atan2", Math.atan2(y, x));
    },
    ceil(x) {
      return finite("ceil", Math.ceil(x));
    },
    cos(x) {
      return finite("cos", Math.cos(x));
    },
    exp(x) {
      return finite("exp", Math.exp(x));
    },
    floor(x) {
      return finite("floor", Math.floor(x));
    },
    log(x) {
      return finite("log", Math.log(x));
    },
    max(...values) {
      // The standard library answers `-Infinity` for no arguments, which is not
      // a value this language has.
      if (values.length === 0) {
        throw new Error("`Math.max` takes at least one number");
      }
      return finite("max", Math.max(...values));
    },
    min(...values) {
      // The standard library answers `Infinity` for no arguments, which is not
      // a value this language has.
      if (values.length === 0) {
        throw new Error("`Math.min` takes at least one number");
      }
      return finite("min", Math.min(...values));
    },
    pow(x, y) {
      return finite("pow", Math.pow(x, y));
    },
    random() {
      return finite("random", Math.random());
    },
    round(x) {
      return finite("round", Math.round(x));
    },
    sin(x) {
      return finite("sin", Math.sin(x));
    },
    sqrt(x) {
      return finite("sqrt", Math.sqrt(x));
    },
    tan(x) {
      return finite("tan", Math.tan(x));
    },
    clz32(x) {
      return finite("clz32", Math.clz32(x));
    },
    imul(x, y) {
      return finite("imul", Math.imul(x, y));
    },
    sign(x) {
      return finite("sign", Math.sign(x));
    },
    log10(x) {
      return finite("log10", Math.log10(x));
    },
    log2(x) {
      return finite("log2", Math.log2(x));
    },
    log1p(x) {
      return finite("log1p", Math.log1p(x));
    },
    expm1(x) {
      return finite("expm1", Math.expm1(x));
    },
    cosh(x) {
      return finite("cosh", Math.cosh(x));
    },
    sinh(x) {
      return finite("sinh", Math.sinh(x));
    },
    tanh(x) {
      return finite("tanh", Math.tanh(x));
    },
    acosh(x) {
      return finite("acosh", Math.acosh(x));
    },
    asinh(x) {
      return finite("asinh", Math.asinh(x));
    },
    atanh(x) {
      return finite("atanh", Math.atanh(x));
    },
    hypot(...values) {
      return finite("hypot", Math.hypot(...values));
    },
    trunc(x) {
      return finite("trunc", Math.trunc(x));
    },
    fround(x) {
      return finite("fround", Math.fround(x));
    },
    cbrt(x) {
      return finite("cbrt", Math.cbrt(x));
    },
  },
};

// Every number in this language is finite. `NaN` and `Infinity` are not values
// a script can write — neither name is in scope — so they are not values a
// client may answer with either: `sqrt(-1)`, `log(0)` and `exp(710)` refuse
// rather than handing one back, the way an empty `min` does.
//
// Checked on the answer rather than on the arguments, because one rule covers a
// domain error and an overflow alike where a rule per member would be
// thirty-five domains to get right and would still miss every overflow.
function finite(member: string, answer: number): number {
  if (!Number.isFinite(answer)) {
    throw new Error(
      `\`Math.${member}\` has no answer this language can hold: its numbers ` +
        `are finite, and this one is ${answer}.`,
    );
  }
  return answer;
}
