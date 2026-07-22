import { cs } from "@backtickjs/core";

// `?` marks a nullable parameter: an omitted argument binds as null — the
// language's absent value; `undefined` never arises.
const greet = cs.liftValue((__cs_name: string | null = null) => {
    return (cs.receiver(__cs_name)?.concat("!") ?? null);
});

// A function-typed annotation unions parenthesized: `(() => number) | null`.
const double = cs.liftValue(() => 2);

const call = cs.liftValue((__cs_cb: (() => number) | null = null) => {
    return __cs_cb?.() ?? 0;
});

export default cs.liftValue({ named: cs.splice((greet))("hi"), omitted: cs.splice((greet))(), explicit: cs.splice((greet))(null), supplied: cs.splice((call))(cs.splice((double))), fallback: cs.splice((call))() });
