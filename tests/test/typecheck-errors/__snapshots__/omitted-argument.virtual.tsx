import { cs } from "@backtickjs/core";

// A nullable parameter is not an optional argument: omitting it would put
// `undefined` in the function's type, so the caller passes `null`.
const greet = cs.lift(cs.const((__cs_name: string | undefined) => {
    return cs.const(cs.receiver(__cs_name)?.concat("!"));
}));

export default cs.lift((() => {
    // @ts-expect-error: Expected 1 arguments, but got 0.
    return cs.const((cs.splice((greet)) satisfies typeof cs.ClientUnknown)());
})());
