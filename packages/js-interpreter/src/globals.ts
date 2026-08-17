import type { ClientValue } from "@backtickjs/core";
import type { Builtins, State } from "@backtickjs/cs-runtime";
import { createSignal } from "solid-js";

// The two namespaces, written once and answered twice below. Typed by indexing
// the contract rather than by a type of their own: what a client owes is the
// schema's to say at either shape.
const array: Builtins["Array"] = {
  from(source, map) {
    return Array.from(source, map);
  },
  of(...items) {
    // An array literal is this. What it adds is reaching one from a spliced
    // list of client values rather than from a written-out sequence.
    return items;
  },
};

const math: Builtins["Math"] = {
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
};

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
// A namespace is answered twice while the schema declares it twice: as the whole
// name it now carries, and as the object a member used to be read off. One
// implementation behind both, so they cannot disagree — and the nested half goes
// when nothing reads it.
export const globals: Builtins = {
  Math: math,
  Array: array,
  "Math.E": math.E,
  "Math.LN10": math.LN10,
  "Math.LN2": math.LN2,
  "Math.LOG2E": math.LOG2E,
  "Math.LOG10E": math.LOG10E,
  "Math.PI": math.PI,
  "Math.SQRT1_2": math.SQRT1_2,
  "Math.SQRT2": math.SQRT2,
  "Math.abs": math.abs,
  "Math.acos": math.acos,
  "Math.asin": math.asin,
  "Math.atan": math.atan,
  "Math.atan2": math.atan2,
  "Math.ceil": math.ceil,
  "Math.cos": math.cos,
  "Math.exp": math.exp,
  "Math.floor": math.floor,
  "Math.log": math.log,
  "Math.max": math.max,
  "Math.min": math.min,
  "Math.pow": math.pow,
  "Math.random": math.random,
  "Math.round": math.round,
  "Math.sin": math.sin,
  "Math.sqrt": math.sqrt,
  "Math.tan": math.tan,
  "Math.clz32": math.clz32,
  "Math.imul": math.imul,
  "Math.sign": math.sign,
  "Math.log10": math.log10,
  "Math.log2": math.log2,
  "Math.log1p": math.log1p,
  "Math.expm1": math.expm1,
  "Math.cosh": math.cosh,
  "Math.sinh": math.sinh,
  "Math.tanh": math.tanh,
  "Math.acosh": math.acosh,
  "Math.asinh": math.asinh,
  "Math.atanh": math.atanh,
  "Math.hypot": math.hypot,
  "Math.trunc": math.trunc,
  "Math.fround": math.fround,
  "Math.cbrt": math.cbrt,
  "Array.from": array.from,
  "Array.of": array.of,

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
