import type { ClientValue } from "@backtickjs/core";
import type { Builtins, State } from "@backtickjs/cs-runtime";
import { createSignal } from "solid-js";

// What this client answers for every name the framework provides — the host
// language's own and `state` alike, because the format has one node for a name
// it carries and a client answers them the same way.
//
// Written out rather than handed the host's objects, so what a bundle can reach
// is a list somebody chose and a member left out stays left out.
//
// What an app provides is not here: those are its own to implement and to hand
// over, and they join this at the lookup.
//
// One table and one lookup: a name is whole here as it is on the wire and in the
// schema, so nothing walks into an object to find a member. `Math` is the front
// of a name rather than something this holds.
export const globals: Builtins = {
  "Math.E": Math.E,
  "Math.LN10": Math.LN10,
  "Math.LN2": Math.LN2,
  "Math.LOG2E": Math.LOG2E,
  "Math.LOG10E": Math.LOG10E,
  "Math.PI": Math.PI,
  "Math.SQRT1_2": Math.SQRT1_2,
  "Math.SQRT2": Math.SQRT2,
  "Math.abs"(x) {
    return finite("abs", Math.abs(x));
  },
  "Math.acos"(x) {
    return finite("acos", Math.acos(x));
  },
  "Math.asin"(x) {
    return finite("asin", Math.asin(x));
  },
  "Math.atan"(x) {
    return finite("atan", Math.atan(x));
  },
  "Math.atan2"(y, x) {
    return finite("atan2", Math.atan2(y, x));
  },
  "Math.ceil"(x) {
    return finite("ceil", Math.ceil(x));
  },
  "Math.cos"(x) {
    return finite("cos", Math.cos(x));
  },
  "Math.exp"(x) {
    return finite("exp", Math.exp(x));
  },
  "Math.floor"(x) {
    return finite("floor", Math.floor(x));
  },
  "Math.log"(x) {
    return finite("log", Math.log(x));
  },
  "Math.max"(...values) {
    // The standard library answers `-Infinity` for no arguments, which is not
    // a value this language has.
    if (values.length === 0) {
      throw new Error("`Math.max` takes at least one number");
    }
    return finite("max", Math.max(...values));
  },
  "Math.min"(...values) {
    // The standard library answers `Infinity` for no arguments, which is not
    // a value this language has.
    if (values.length === 0) {
      throw new Error("`Math.min` takes at least one number");
    }
    return finite("min", Math.min(...values));
  },
  "Math.pow"(x, y) {
    return finite("pow", Math.pow(x, y));
  },
  "Math.random"() {
    return finite("random", Math.random());
  },
  "Math.round"(x) {
    return finite("round", Math.round(x));
  },
  "Math.sin"(x) {
    return finite("sin", Math.sin(x));
  },
  "Math.sqrt"(x) {
    return finite("sqrt", Math.sqrt(x));
  },
  "Math.tan"(x) {
    return finite("tan", Math.tan(x));
  },
  "Math.clz32"(x) {
    return finite("clz32", Math.clz32(x));
  },
  "Math.imul"(x, y) {
    return finite("imul", Math.imul(x, y));
  },
  "Math.sign"(x) {
    return finite("sign", Math.sign(x));
  },
  "Math.log10"(x) {
    return finite("log10", Math.log10(x));
  },
  "Math.log2"(x) {
    return finite("log2", Math.log2(x));
  },
  "Math.log1p"(x) {
    return finite("log1p", Math.log1p(x));
  },
  "Math.expm1"(x) {
    return finite("expm1", Math.expm1(x));
  },
  "Math.cosh"(x) {
    return finite("cosh", Math.cosh(x));
  },
  "Math.sinh"(x) {
    return finite("sinh", Math.sinh(x));
  },
  "Math.tanh"(x) {
    return finite("tanh", Math.tanh(x));
  },
  "Math.acosh"(x) {
    return finite("acosh", Math.acosh(x));
  },
  "Math.asinh"(x) {
    return finite("asinh", Math.asinh(x));
  },
  "Math.atanh"(x) {
    return finite("atanh", Math.atanh(x));
  },
  "Math.hypot"(...values) {
    return finite("hypot", Math.hypot(...values));
  },
  "Math.trunc"(x) {
    return finite("trunc", Math.trunc(x));
  },
  "Math.fround"(x) {
    return finite("fround", Math.fround(x));
  },
  "Math.cbrt"(x) {
    return finite("cbrt", Math.cbrt(x));
  },
  "Array.from"(source, map) {
    return Array.from(source, map);
  },
  "Array.of"(...items) {
    // An array literal is this. What it adds is reaching one from a spliced
    // list of client values rather than from a written-out sequence.
    return items;
  },

  state(initial) {
    const [read, store] = createSignal(initial);
    const write = (value: typeof initial): ClientValue => {
      store(() => value);
      return null;
    };
    const update = (updater: (current: typeof initial) => typeof initial) => {
      store((previous) => updater(previous));
      return null;
    };
    // The brand cannot be built by writing the members — that is what stops
    // a script passing a record off as storage — so the client asserts it
    // here, at the one place entitled to.
    return { read, write, update } as unknown as State<typeof initial>;
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
