import type { ClientValue } from "@backtickjs/core";
import type {
  Builtins,
  Http,
  HttpConfig,
  HttpResponse,
  State,
} from "@backtickjs/language";
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
//
// A member of a value takes the value first, because that is what the schema
// says it takes: a client with no `this` reads the same document and answers the
// same way. A member access reads this table and binds the value it was reached
// off, so these are the bodies it reaches and there is no second table beside
// them.
export const globals: Builtins = {
  "boolean.valueOf": (self) => self,
  "number.toString": (self, radix) => self.toString(radix),
  "number.toFixed": (self, fractionDigits) => self.toFixed(fractionDigits),
  "number.toExponential": (self, fractionDigits) =>
    self.toExponential(fractionDigits),
  "number.toPrecision": (self, precision) => self.toPrecision(precision),
  "number.valueOf": (self) => self,
  "string.toString": (self) => self,
  "string.charAt": (self, pos) => self.charAt(pos),
  "string.charCodeAt": (self, index) => self.charCodeAt(index),
  "string.concat": (self, ...strings) => self.concat(...strings),
  "string.indexOf": (self, searchString, position) =>
    self.indexOf(searchString, position),
  "string.lastIndexOf": (self, searchString, position) =>
    self.lastIndexOf(searchString, position),
  "string.localeCompare": (self, that) => self.localeCompare(that),
  "string.replace": (self, searchValue, replaceValue) =>
    self.replace(searchValue, replaceValue as string),
  "string.slice": (self, start, end) => self.slice(start, end),
  "string.split": (self, separator, limit) => self.split(separator, limit),
  "string.substring": (self, start, end) => self.substring(start, end),
  "string.toLowerCase": (self) => self.toLowerCase(),
  "string.toLocaleLowerCase": (self) => self.toLocaleLowerCase(),
  "string.toUpperCase": (self) => self.toUpperCase(),
  "string.toLocaleUpperCase": (self) => self.toLocaleUpperCase(),
  "string.trim": (self) => self.trim(),
  "string.length": (self) => self.length,
  "string.valueOf": (self) => self,
  "array.length": (self) => self.length,
  "array.concat": (self, ...items) => self.concat(...items),
  "array.join": (self, separator) => self.join(separator),
  "array.slice": (self, start, end) => self.slice(start, end),
  "array.indexOf": (self, searchElement, fromIndex) =>
    self.indexOf(searchElement, fromIndex),
  "array.includes": (self, searchElement, fromIndex) =>
    self.includes(searchElement, fromIndex),
  "array.map": (self, callbackfn) =>
    self.map((value, index) => callbackfn(value, index)),
  "array.reduce": (self, callbackfn, initialValue) =>
    self.reduce(
      (previousValue, currentValue, currentIndex) =>
        callbackfn(previousValue, currentValue, currentIndex),
      initialValue,
    ),
  "array.filter": (self, predicate) => self.filter(predicate),
  "array.with": (self, index, value) => self.with(index, value),
  "array.toSorted": (self, compareFn) => self.toSorted(compareFn),
  "array.toReversed": (self) => self.toReversed(),
  "array.toSpliced": (self, start, deleteCount, ...items) =>
    self.toSpliced(start, deleteCount, ...items),
  "JSON.parse": (text) => JSON.parse(text) as ClientValue,
  "JSON.stringify": (value) => JSON.stringify(value),
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
  "Number.EPSILON": Number.EPSILON,
  "Number.isFinite"(number) {
    return Number.isFinite(number);
  },
  "Number.isInteger"(number) {
    return Number.isInteger(number);
  },
  "Number.parseFloat"(string) {
    const answer = Number.parseFloat(string);
    if (Number.isNaN(answer)) {
      throw new Error("`Number.parseFloat` can't read this string as a number");
    }
    return answer;
  },
  "Number.parseInt"(string, radix) {
    const answer = Number.parseInt(string, radix);
    if (Number.isNaN(answer)) {
      throw new Error("`Number.parseInt` can't read this string as a number");
    }
    return answer;
  },
  "String.fromCodePoint"(...codePoints) {
    return String.fromCodePoint(...codePoints);
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
  http: {
    get: ((url, onResponse, onFailure, config) => {
      void send("GET", url, undefined, onResponse, onFailure, config);
    }) satisfies Http["get"],
    post: ((url, data, onResponse, onFailure, config) => {
      void send("POST", url, data, onResponse, onFailure, config);
    }) satisfies Http["post"],
  } as unknown as Http,
};

// Inside the `try`, so a throw from `onResponse` reaches `onFailure`.
async function send(
  method: string,
  url: string,
  body: string | undefined,
  onResponse: (response: HttpResponse) => void,
  onFailure: (message: string) => void,
  { headers, params, timeout }: HttpConfig = {},
): Promise<void> {
  try {
    const signal = timeout === undefined ? null : AbortSignal.timeout(timeout);
    const response = await fetch(url + query(url, params), {
      method,
      headers,
      body,
      signal,
    });
    onResponse({ status: response.status, data: await response.text() });
  } catch (error) {
    onFailure(error instanceof Error ? error.message : String(error));
  }
}

// `encodeURIComponent` and not `URLSearchParams`, which writes a space as `+`.
function query(url: string, params: HttpConfig["params"]): string {
  const pairs = Object.entries(params ?? {}).map(
    ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
  );
  if (pairs.length === 0) {
    return "";
  }
  return (url.includes("?") ? "&" : "?") + pairs.join("&");
}

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

/**
 * The names this client reads rather than calls.
 *
 * Every entry above takes its receiver and answers with a value, so nothing in
 * the table tells `length` from `trim`. What tells them apart is the schema,
 * which says a getter is applied where its name is read — and how a client acts
 * on that is its own to write down. `builtins.test.ts` holds this to the
 * schema, so a name that starts or stops being one is caught there.
 */
export const getters: ReadonlySet<string> = new Set([
  "string.length",
  "array.length",
]);
