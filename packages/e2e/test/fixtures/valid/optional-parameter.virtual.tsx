import { cs } from "@backtickjs/core";

// `?` marks a nullable parameter: an omitted argument binds as null — the
// language's absent value; `undefined` never arises.
const greet = cs.liftValue((__cs_name: (string) | null = null) => {
    return (cs.virtualize(__cs_name)?.concat("!") ?? null);
});

export default cs.liftValue({ named: cs.spliceValue((greet))("hi"), omitted: cs.spliceValue((greet))(), explicit: cs.spliceValue((greet))(null) });
