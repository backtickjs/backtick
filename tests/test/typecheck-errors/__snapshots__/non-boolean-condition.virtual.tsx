import { cs } from "@backtickjs/core";

// A condition must be a boolean: the language has no truthiness, so a
// string tested directly is a type error.
export default cs.lift(cs.const((__cs_name: string) => {
    // @ts-expect-error: Argument of type 'string' is not assignable to parameter of type 'boolean'.
    if ((cs.condition(__cs_name) && __cs_name)) {
        return cs.const(__cs_name);
    }
    return cs.const("anonymous");
}));
