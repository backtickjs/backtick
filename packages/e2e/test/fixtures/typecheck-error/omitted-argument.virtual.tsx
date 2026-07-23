import { cs } from "@backtickjs/core";

// A nullable parameter is not an optional argument: omitting it would put
// `undefined` in the function's type, so the caller passes `null`.
const greet = cs.lift(cs.const((__cs_name: string | null) => {
    return cs.const((cs.receiver(__cs_name)?.concat("!") ?? null));
}));

export default cs.lift((() => {
    return cs.const(cs.splice((greet))());
})());
