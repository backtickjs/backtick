import { cs } from "@backtickjs/core";

// `?` marks an optional parameter — sugar for `T | undefined`. A caller may
// pass `undefined` where the argument is not supplied; `null` is a value of
// its own and not accepted here.
const greet = cs.lift(cs.const((__cs_name: string | undefined) => {
    return cs.const(cs.receiver(__cs_name)?.concat("!"));
}));

// A function-typed annotation unions parenthesized: `(() => number) | undefined`.
const double = cs.lift(cs.const(() => 2));

const call = cs.lift(cs.const((__cs_cb: (() => number) | undefined) => {
    return cs.const(__cs_cb?.() ?? 0);
}));

export default cs.lift(cs.const({ named: (cs.splice((greet)) satisfies import("@backtickjs/core").ClientUnknown)("hi"), explicit: (cs.splice((greet)) satisfies import("@backtickjs/core").ClientUnknown)(undefined), supplied: (cs.splice((call)) satisfies import("@backtickjs/core").ClientUnknown)(cs.splice((double)) satisfies import("@backtickjs/core").ClientUnknown), fallback: (cs.splice((call)) satisfies import("@backtickjs/core").ClientUnknown)(undefined) }));
