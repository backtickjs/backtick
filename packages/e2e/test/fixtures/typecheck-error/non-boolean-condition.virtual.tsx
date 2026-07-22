import { cs } from "@backtickjs/core";

// A condition must be a boolean: the language has no truthiness, so a
// string tested directly is a type error.
export default cs.lift(cs.const((__cs_name: string) => {
    if ((cs.condition(__cs_name) && __cs_name)) {
        return __cs_name;
    }
    return "anonymous";
}));
