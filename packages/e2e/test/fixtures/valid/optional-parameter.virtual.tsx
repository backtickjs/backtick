import { cs } from "@backtickjs/core";

// `?` marks a nullable parameter — sugar for `T | null`, not an optional
// argument: callers pass `null` explicitly, and `undefined` never arises.
const greet = cs.lift(cs.const((__cs_name: string | null) => {
    return cs.const((cs.receiver(__cs_name)?.concat("!") ?? null));
}));

// A function-typed annotation unions parenthesized: `(() => number) | null`.
const double = cs.lift(cs.const(() => 2));

const call = cs.lift(cs.const((__cs_cb: (() => number) | null) => {
    return cs.const(__cs_cb?.() ?? 0);
}));

export default cs.lift(cs.const({ named: (cs.splice((greet)) satisfies import("@backtickjs/core").ClientUnknown)("hi"), explicit: (cs.splice((greet)) satisfies import("@backtickjs/core").ClientUnknown)(null), supplied: (cs.splice((call)) satisfies import("@backtickjs/core").ClientUnknown)(cs.splice((double)) satisfies import("@backtickjs/core").ClientUnknown), fallback: (cs.splice((call)) satisfies import("@backtickjs/core").ClientUnknown)(null) }));
