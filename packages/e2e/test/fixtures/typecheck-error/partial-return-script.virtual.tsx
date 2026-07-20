import { cs } from "@backtickjs/core";

// A value script that misses a `return` on some path fails the `cs.value`
// root: the `undefined` in its inferred type is the missing path.
export const partial = cs.value((() => {
    let __cs_n = 1;
    if (__cs_n === 2) {
        return "some";
    }
})());
