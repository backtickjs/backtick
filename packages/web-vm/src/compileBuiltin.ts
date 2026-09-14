import type { ClientUnknown, ClientValue } from "@backtickjs/core";
import type {
  Builtins,
  Bundle,
  Http,
  HttpConfig,
  HttpResponse,
  State,
  Vm,
} from "@backtickjs/language";
import { createSignal, untrack } from "solid-js";
import type { Instance } from "./interpreter/Instance.js";
import type { Applied } from "./interpreter/interpret.js";
import { evaluated } from "./interpreter/view.js";

// What this client answers for every name the framework provides — the host
// language's own and `state` alike, because the format has one node for a name
// it carries and a client answers them the same way.
//
// Written out rather than handed the host's objects, so what a bundle can reach
// is a list somebody chose and a member left out stays left out. A switch
// rather than a table, because a table is an object and answers for names
// nobody wrote — `constructor` is `Object`'s — where only a `case` answers here.
//
// Most names are the host's own member of the same name, so they share an
// answer: a receiver's member is called on the receiver, and a namespace's on
// the namespace. What is written out is where that would hand the host more
// than the contract says — a callback's `this`, an argument it has no parameter
// for — or where the language refuses what the host would answer.
//
// Every answer is checked against the contract for the names it stands under,
// at no cost once compiled: `Forwarded` and `Delegated` are the names the
// host's own member satisfies, and a written-out answer `satisfies` its one
// name. A name the schema declares and no `case` answers does not build.
//
// What an app provides is not here: those are its own to implement and to hand
// over, and they are read after these, at the lookup.
//
// A member of a value takes the value first, because that is what the schema
// says it takes: a client with no `this` reads the same document and answers the
// same way. A member access reads these and binds the value it was reached off.
export function compileBuiltin(
  instance: Instance,
  name: string,
): ClientValue | undefined {
  // A wire name may be anything; `default` is where the rest land.
  const known = name as keyof Builtins;
  switch (known) {
    case "boolean.valueOf":
    case "number.toString":
    case "number.toFixed":
    case "number.toExponential":
    case "number.toPrecision":
    case "number.valueOf":
    case "string.toString":
    case "string.charAt":
    case "string.charCodeAt":
    case "string.codePointAt":
    case "string.concat":
    case "string.indexOf":
    case "string.lastIndexOf":
    case "string.includes":
    case "string.startsWith":
    case "string.endsWith":
    case "string.localeCompare":
    case "string.repeat":
    case "string.slice":
    case "string.split":
    case "string.substring":
    case "string.toLowerCase":
    case "string.toLocaleLowerCase":
    case "string.toUpperCase":
    case "string.toLocaleUpperCase":
    case "string.trim":
    case "string.valueOf":
    case "array.concat":
    case "array.join":
    case "array.slice":
    case "array.indexOf":
    case "array.includes":
    case "array.with":
    case "array.toSorted":
    case "array.toReversed":
    case "array.toSpliced": {
      known satisfies Forwarded;
      const member = known.split(".")[1];
      return (self: Receiver, ...args: ClientValue[]) => self[member](...args);
    }
    case "Math.E":
    case "Math.LN10":
    case "Math.LN2":
    case "Math.LOG2E":
    case "Math.LOG10E":
    case "Math.PI":
    case "Math.SQRT1_2":
    case "Math.SQRT2":
    case "Math.abs":
    case "Math.acos":
    case "Math.asin":
    case "Math.atan":
    case "Math.atan2":
    case "Math.ceil":
    case "Math.cos":
    case "Math.exp":
    case "Math.floor":
    case "Math.log":
    case "Math.pow":
    case "Math.random":
    case "Math.round":
    case "Math.sin":
    case "Math.sqrt":
    case "Math.tan":
    case "Math.clz32":
    case "Math.imul":
    case "Math.sign":
    case "Math.log10":
    case "Math.log2":
    case "Math.log1p":
    case "Math.expm1":
    case "Math.cosh":
    case "Math.sinh":
    case "Math.tanh":
    case "Math.acosh":
    case "Math.asinh":
    case "Math.atanh":
    case "Math.hypot":
    case "Math.trunc":
    case "Math.fround":
    case "Math.cbrt":
    case "Array.of":
    case "Number.EPSILON":
    case "Number.isFinite":
    case "Number.isInteger":
    case "Object.entries":
    case "Object.fromEntries":
    case "Object.keys":
    case "String.fromCodePoint": {
      known satisfies Delegated;
      const [prefix, member] = known.split(".");
      const namespace = (globalThis as unknown as Namespaces)[prefix];
      const held = namespace[member];
      return typeof held === "function"
        ? (...args: ClientValue[]) =>
            finite(known, (held as Applied).apply(namespace, args))
        : held;
    }
    // Read where they are named rather than called: see `getters`.
    case "string.length":
    case "array.length":
      return ((self: string | readonly ClientValue[]) =>
        self.length) satisfies Builtins[typeof known];
    // Not forwarded: the host's types take a string or a function in two
    // overloads, and not the one of either that the contract does.
    case "string.replace":
      return ((self, searchValue, replaceValue) =>
        self.replace(
          searchValue,
          replaceValue as string,
        )) satisfies Builtins[typeof known];
    // The callback is handed what the contract says and no more: not the array
    // as a third argument, which a host function passed along would read.
    case "array.find":
      return ((self, predicate) =>
        self.find((value, index) =>
          predicate(value, index),
        )) satisfies Builtins[typeof known];
    case "array.findIndex":
      return ((self, predicate) =>
        self.findIndex((value, index) =>
          predicate(value, index),
        )) satisfies Builtins[typeof known];
    case "array.map":
      return ((self, callbackfn) =>
        self.map((value, index) =>
          callbackfn(value, index),
        )) satisfies Builtins[typeof known];
    case "array.reduce":
      return ((self, callbackfn, initialValue) =>
        self.reduce(
          (previousValue, currentValue, currentIndex) =>
            callbackfn(previousValue, currentValue, currentIndex),
          initialValue,
        )) satisfies Builtins[typeof known];
    // Not forwarded, which would hand the host a second argument as the
    // predicate's `this`.
    case "array.filter":
      return ((self, predicate) =>
        self.filter(predicate)) satisfies Builtins[typeof known];
    case "Array.from":
      return ((source, map) =>
        Array.from(source, map)) satisfies Builtins[typeof known];
    // Not forwarded, which would hand the host a reviver, or a replacer and an
    // indent.
    case "JSON.parse":
      return ((text) =>
        JSON.parse(text) as ClientValue) satisfies Builtins[typeof known];
    case "JSON.stringify":
      return ((value) =>
        JSON.stringify(value)) satisfies Builtins[typeof known];
    case "Math.max":
      return ((...values) => {
        // The standard library answers `-Infinity` for no arguments, which is not
        // a value this language has.
        if (values.length === 0) {
          throw new Error("`Math.max` takes at least one number");
        }
        return finite(known, Math.max(...values));
      }) satisfies Builtins[typeof known];
    case "Math.min":
      return ((...values) => {
        // The standard library answers `Infinity` for no arguments, which is not
        // a value this language has.
        if (values.length === 0) {
          throw new Error("`Math.min` takes at least one number");
        }
        return finite(known, Math.min(...values));
      }) satisfies Builtins[typeof known];
    case "Number.parseFloat":
      return ((string) => {
        const answer = Number.parseFloat(string);
        if (Number.isNaN(answer)) {
          throw new Error(
            "`Number.parseFloat` can't read this string as a number",
          );
        }
        return answer;
      }) satisfies Builtins[typeof known];
    case "Number.parseInt":
      return ((string, radix) => {
        const answer = Number.parseInt(string, radix);
        if (Number.isNaN(answer)) {
          throw new Error(
            "`Number.parseInt` can't read this string as a number",
          );
        }
        return answer;
      }) satisfies Builtins[typeof known];
    case "state":
      return ((initial) => {
        const [read, store] = createSignal(initial);
        const write = (value: typeof initial): ClientValue => {
          store(() => value);
          return null;
        };
        const update = (
          updater: (current: typeof initial) => typeof initial,
        ) => {
          store((previous) => updater(previous));
          return null;
        };
        // The brand cannot be built by writing the members — that is what stops
        // a script passing a record off as storage — so the client asserts it
        // here, at the one place entitled to.
        return { read, write, update } as unknown as State<typeof initial>;
      }) satisfies Builtins[typeof known];
    case "http":
      return {
        get: ((url, onResponse, onFailure, config) => {
          void send("GET", url, undefined, onResponse, onFailure, config);
        }) satisfies Http["get"],
        post: ((url, data, onResponse, onFailure, config) => {
          void send("POST", url, data, onResponse, onFailure, config);
        }) satisfies Http["post"],
      } as unknown as Http;
    // A bundle drawn with this instance's renderer, and reaching the names this
    // one does. Untracked, as Solid runs a component: what the bundle reads while
    // its root is evaluated is its own setup, and a write to it runs nothing of
    // the caller's again.
    case "vm":
      return {
        eval: (bundle: Bundle<ClientUnknown>) =>
          untrack(() =>
            evaluated(bundle, instance.renderer, instance.builtins),
          ),
      } as unknown as Vm;
    default:
      known satisfies never;
      return undefined;
  }
}

// A receiver as a forwarded member reads it: by the member's name, on the
// host's own value.
type Receiver = { readonly [member: string]: Applied };

// The host's value of each kind, whose members a receiver's are forwarded to.
// An array's elements are `unknown` on both sides: a generic contract is read
// with its `T` unknown, and the host's `Array<T>` is compared at the same `T`.
interface Receivers {
  boolean: boolean;
  number: number;
  string: string;
  array: unknown[];
}

// The namespaces a name may start with, whose members are delegated to.
interface Namespaces {
  readonly [prefix: string]: { readonly [member: string]: ClientValue };
}
interface Hosts {
  Math: Math;
  Number: NumberConstructor;
  String: StringConstructor;
  Object: ObjectConstructor;
  Array: ArrayConstructor;
}

// A member's contract without the receiver it takes first.
type Unbound<Member> = Member extends (
  self: never,
  ...rest: infer Rest
) => infer Answer
  ? (...rest: Rest) => Answer
  : never;

// The names whose contract the receiver's own member of that name satisfies.
type Forwarded = {
  [Name in keyof Builtins]: Name extends `${infer Kind}.${infer Member}`
    ? Kind extends keyof Receivers
      ? Member extends keyof Receivers[Kind]
        ? Receivers[Kind][Member] extends Unbound<Builtins[Name]>
          ? Name
          : never
        : never
      : never
    : never;
}[keyof Builtins];

// The names whose contract the namespace's own member of that name satisfies.
type Delegated = {
  [Name in keyof Builtins]: Name extends `${infer Prefix}.${infer Member}`
    ? Prefix extends keyof Hosts
      ? Member extends keyof Hosts[Prefix]
        ? Hosts[Prefix][Member] extends Builtins[Name]
          ? Name
          : never
        : never
      : never
    : never;
}[keyof Builtins];

/**
 * The names this client reads rather than calls.
 *
 * Every answer above takes its receiver and answers with a value, so nothing in
 * the switch tells `length` from `trim`. What tells them apart is the schema,
 * which says a getter is applied where its name is read — and how a client acts
 * on that is its own to write down. `globals.test.ts` holds this to the
 * schema, so a name that starts or stops being one is caught there.
 */
export const getters: { readonly [Name in keyof Builtins]?: true } = {
  "string.length": true,
  "array.length": true,
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
function finite<Answer extends ClientValue>(
  name: string,
  answer: Answer,
): Answer {
  if (typeof answer === "number" && !Number.isFinite(answer)) {
    throw new Error(
      `\`${name}\` has no answer this language can hold: its numbers ` +
        `are finite, and this one is ${answer}.`,
    );
  }
  return answer;
}
